import { route, readJson, sendJson, HttpError } from '../server/lib/http.js'
import { requireUser } from '../server/lib/auth.js'
import { enforceLimit } from '../server/lib/rateLimit.js'
import { getStore } from '../server/lib/store.js'
import { conditionIds } from '../server/lib/library.js'
import { ensureProfile } from '../server/lib/profile.js'

// GET /api/favorites                 { favorites: [conditionId] }
// PUT /api/favorites {favorites: []}  replaces the saved list; unknown ids are dropped
export default route({
  async GET(req, res) {
    const user = await requireUser(req)
    const profile = await ensureProfile(user)
    sendJson(res, 200, { favorites: (profile.favorites || []).filter(id => conditionIds.has(id)) })
  },

  async PUT(req, res) {
    const user = await requireUser(req)
    await enforceLimit(user.uid, 'write')
    const body = await readJson(req)
    if (!Array.isArray(body.favorites)) throw new HttpError(400, 'favorites must be a list of condition ids.')
    const favorites = [...new Set(body.favorites.filter(id => typeof id === 'string' && conditionIds.has(id)))]
    await ensureProfile(user)
    await getStore().upsertProfile(user.uid, { favorites })
    sendJson(res, 200, { favorites })
  },
})
