import { auth } from './firebase'

// Client for the Natural Healer API (/api). Every request carries the user's
// Firebase ID token; the server verifies it and never trusts the client's uid.

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function authHeader() {
  const user = auth.currentUser
  if (!user) return {}
  return { Authorization: `Bearer ${await user.getIdToken()}` }
}

export async function api(path, { method = 'GET', body, signal } = {}) {
  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      signal,
      headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(await authHeader()) },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('Network error. Check your connection and try again.', 0)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.error || 'Something went wrong. Please try again.', res.status)
  return data
}

/**
 * Ask the guide and receive the answer as it is written.
 * onEvent is called with { type: 'meta' | 'delta' | 'done' | 'error', ...data }.
 * Resolves with { chatId, triage, text } or throws ApiError.
 */
export async function streamChat({ message, chatId, conditionId, ephemeral, history, signal }, onEvent = () => {}) {
  let res
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      signal,
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream', ...(await authHeader()) },
      body: JSON.stringify({ message, chatId, conditionId, ephemeral, history }),
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('Network error. Check your connection and try again.', 0)
  }

  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}))
    throw new ApiError(data.error || 'The guide couldn’t answer just now. Please try again.', res.status)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  const result = { chatId: chatId || null, triage: 'none', text: '' }

  const handle = (block) => {
    let event = 'message'
    let data = ''
    for (const line of block.split('\n')) {
      if (line.startsWith('event: ')) event = line.slice(7)
      else if (line.startsWith('data: ')) data += line.slice(6)
    }
    if (!data) return
    const payload = JSON.parse(data)
    if (event === 'meta' || event === 'done') {
      result.chatId = payload.chatId ?? result.chatId
      result.triage = payload.triage ?? result.triage
    }
    if (event === 'delta') result.text += payload.text
    onEvent({ type: event, ...payload })
    if (event === 'error') throw new ApiError(payload.message, 502)
  }

  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let split
    while ((split = buffer.indexOf('\n\n')) !== -1) {
      handle(buffer.slice(0, split))
      buffer = buffer.slice(split + 2)
    }
  }
  if (buffer.trim()) handle(buffer)
  return result
}
