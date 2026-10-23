import { route, readJson, sendJson, getQuery, HttpError } from '../../server/lib/http.js'
import { requireUser } from '../../server/lib/auth.js'
import { enforceLimit } from '../../server/lib/rateLimit.js'
import { getStore } from '../../server/lib/store.js'

async function ownChat(req) {
  const user = await requireUser(req)
  const id = String(getQuery(req).id || '')
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) throw new HttpError(400, 'Invalid conversation id.')
  const chat = await getStore().getChat(user.uid, id)
  if (!chat) throw new HttpError(404, 'That conversation no longer exists.')
  return { user, chat }
}

// GET    /api/chats/:id            the conversation and its messages
// PATCH  /api/chats/:id {title}    rename
// DELETE /api/chats/:id            delete with all messages
export default route({
  async GET(req, res) {
    const { user, chat } = await ownChat(req)
    const messages = await getStore().listMessages(user.uid, chat.id)
    sendJson(res, 200, { chat, messages })
  },

  async PATCH(req, res) {
    const { user, chat } = await ownChat(req)
    await enforceLimit(user.uid, 'write')
    const body = await readJson(req)
    const title = String(body.title || '').replace(/\s+/g, ' ').trim().slice(0, 80)
    if (!title) throw new HttpError(400, 'Enter a title.')
    await getStore().updateChat(user.uid, chat.id, { title })
    sendJson(res, 200, { chat: { ...chat, title } })
  },

  async DELETE(req, res) {
    const { user, chat } = await ownChat(req)
    await enforceLimit(user.uid, 'write')
    await getStore().deleteChat(user.uid, chat.id)
    sendJson(res, 200, { deleted: chat.id })
  },
})
