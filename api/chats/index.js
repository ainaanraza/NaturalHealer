import { route, sendJson } from '../../server/lib/http.js'
import { requireUser } from '../../server/lib/auth.js'
import { getStore } from '../../server/lib/store.js'

// GET /api/chats   the signed-in user's conversations, newest first
export default route({
  async GET(req, res) {
    const user = await requireUser(req)
    const chats = await getStore().listChats(user.uid)
    sendJson(res, 200, { chats })
  },
})
