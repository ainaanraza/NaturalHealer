import { route, sendJson } from '../server/lib/http.js'
import { isFirebaseConfigured } from '../server/lib/firebaseAdmin.js'
import { isGeminiConfigured } from '../server/lib/gemini.js'

// GET /api/health   which parts of the server are configured (never the values)
export default route({
  async GET(req, res) {
    const memory = process.env.DEV_MEMORY_STORE === '1' && !process.env.VERCEL
    sendJson(res, 200, {
      ok: true,
      ai: isGeminiConfigured(),
      database: memory ? 'memory' : isFirebaseConfigured() ? 'firestore' : 'not-configured',
    })
  },
})
