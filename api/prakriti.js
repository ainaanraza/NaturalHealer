import { route, readJson, sendJson, HttpError } from '../server/lib/http.js'
import { requireUser } from '../server/lib/auth.js'
import { enforceLimit } from '../server/lib/rateLimit.js'
import { getStore } from '../server/lib/store.js'
import { ensureProfile } from '../server/lib/profile.js'
import { questionnaire, scorePrakriti, GUIDANCE } from '../server/lib/prakriti.js'

// GET  /api/prakriti              the questionnaire and the user's saved result, if any
// POST /api/prakriti {answers}    score, save to the profile, return the result
export default route({
  async GET(req, res) {
    const user = await requireUser(req)
    const profile = await ensureProfile(user)
    sendJson(res, 200, { questions: questionnaire(), result: profile.prakriti || null, guidance: GUIDANCE })
  },

  async POST(req, res) {
    const user = await requireUser(req)
    await enforceLimit(user.uid, 'prakriti')
    const body = await readJson(req)
    let result
    try {
      result = scorePrakriti(body.answers)
    } catch (err) {
      throw new HttpError(400, err.message)
    }
    const prakriti = { ...result, assessedAt: new Date() }
    await ensureProfile(user)
    await getStore().upsertProfile(user.uid, { prakriti })
    sendJson(res, 200, { result: prakriti, guidance: GUIDANCE })
  },
})
