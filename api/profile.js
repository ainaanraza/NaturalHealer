import { route, readJson, sendJson, HttpError } from '../server/lib/http.js'
import { requireUser } from '../server/lib/auth.js'
import { enforceLimit } from '../server/lib/rateLimit.js'
import { getStore } from '../server/lib/store.js'
import { ensureProfile, publicProfile, clampName } from '../server/lib/profile.js'

// GET  /api/profile            the signed-in user's profile (created on first call)
// PUT  /api/profile {displayName}
export default route({
  async GET(req, res) {
    const user = await requireUser(req)
    const profile = await ensureProfile(user)
    sendJson(res, 200, { profile: publicProfile(profile) })
  },

  async PUT(req, res) {
    const user = await requireUser(req)
    await enforceLimit(user.uid, 'write')
    const body = await readJson(req)
    const displayName = clampName(body.displayName)
    if (displayName.length < 2) throw new HttpError(400, 'Enter a name of at least 2 characters.')
    await ensureProfile(user)
    const profile = await getStore().upsertProfile(user.uid, { displayName })
    sendJson(res, 200, { profile: publicProfile(profile) })
  },
})
