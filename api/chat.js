import { route, readJson, HttpError } from '../server/lib/http.js'
import { requireUser } from '../server/lib/auth.js'
import { enforceLimit } from '../server/lib/rateLimit.js'
import { getStore } from '../server/lib/store.js'
import { conditionIds } from '../server/lib/library.js'
import { triage, emergencyReply, cautionNotice } from '../server/lib/safety.js'
import { buildPrompt } from '../server/lib/prompt.js'
import { retrieve } from '../server/lib/knowledge/search.js'
import { citedSources } from '../server/lib/knowledge/cite.js'
import { streamAnswer, friendlyAIError } from '../server/lib/gemini.js'

const MAX_MESSAGE = 1000

// Client-sent history is only accepted for unsaved (condition-scoped) chats
function cleanHistory(history) {
  if (!Array.isArray(history)) return []
  return history.slice(-10)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
    .map(m => ({ role: m.role, text: m.text.slice(0, 4000) }))
}

function titleFrom(message) {
  const t = message.replace(/\s+/g, ' ').trim()
  return t.length > 60 ? `${t.slice(0, 57)}…` : t
}

/**
 * POST /api/chat
 * body: { message, chatId?, conditionId?, ephemeral?, history? }
 * Responds with a server-sent event stream:
 *   meta  { chatId, triage }    once, first
 *   delta { text }              many
 *   done  { chatId, triage }    once, on success
 *   error { message }           once, on failure
 */
export default route({
  async POST(req, res) {
    const user = await requireUser(req)
    const body = await readJson(req)

    const message = typeof body.message === 'string' ? body.message.trim() : ''
    if (message.length < 2 || message.length > MAX_MESSAGE) {
      throw new HttpError(400, `Write a question between 2 and ${MAX_MESSAGE} characters.`)
    }
    const conditionId = body.conditionId && conditionIds.has(body.conditionId) ? body.conditionId : null
    const ephemeral = body.ephemeral === true

    await enforceLimit(user.uid, 'chat')
    await enforceLimit(user.uid, 'chatDaily')

    const store = getStore()
    const profile = await store.getProfile(user.uid)

    let chat = null
    let history = []
    if (ephemeral) {
      history = cleanHistory(body.history)
    } else if (body.chatId) {
      chat = await store.getChat(user.uid, String(body.chatId))
      if (!chat) throw new HttpError(404, 'That conversation no longer exists.')
      history = (await store.listMessages(user.uid, chat.id, { limit: 20 })).map(m => ({ role: m.role, text: m.text }))
    }

    const safety = triage(message)

    // From here on we stream
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders?.()

    let closed = false
    res.on('close', () => { closed = true })
    const send = (event, data) => {
      if (closed) return
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    }

    const createdNow = !ephemeral && !chat
    if (createdNow) chat = await store.createChat(user.uid, { title: titleFrom(message), conditionId })
    const chatId = chat?.id || null
    send('meta', { chatId, triage: safety.level })

    let answer = ''
    let sources = []
    try {
      if (safety.level === 'emergency') {
        answer = emergencyReply(safety)
        send('delta', { text: answer })
      } else {
        if (safety.level === 'caution') {
          answer = cautionNotice(safety)
          send('delta', { text: answer })
        }
        // Follow-ups like "is it safe for me?" lean on the previous question for search terms
        const lastQuestion = [...history].reverse().find(m => m.role === 'user')?.text || ''
        const passages = retrieve(`${message} ${lastQuestion}`, { conditionId })
        const prompt = buildPrompt({ message, history, conditionId, prakriti: profile?.prakriti, triage: safety, passages })
        for await (const text of streamAnswer(prompt)) {
          if (closed) break
          answer += text
          send('delta', { text })
        }
        sources = citedSources(answer, passages)
      }

      if (safety.level !== 'none') {
        // Record that triage fired, without storing what the person wrote
        store.logSafetyEvent({ uid: user.uid, chatId, level: safety.level, categories: safety.categories })
          .catch(err => console.error('[chat] safety log failed:', err))
      }

      if (chatId && answer.trim()) {
        await store.addTurn(user.uid, chatId, [
          { role: 'user', text: message },
          { role: 'assistant', text: answer, triage: safety.level === 'none' ? null : safety.level, sources },
        ])
      }
      send('done', { chatId, triage: safety.level, sources })
    } catch (err) {
      console.error('[chat] generation failed:', err)
      if (createdNow && chatId) await store.deleteChat(user.uid, chatId).catch(() => {})
      send('error', { message: friendlyAIError(err) })
    } finally {
      res.end()
    }
  },
})
