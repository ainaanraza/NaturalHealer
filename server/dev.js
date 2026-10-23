// Local API server: serves the files in /api the way Vercel does, so `npm run dev`
// works without the Vercel CLI. Vite proxies /api here (see vite.config.js).
//
//   npm run dev:api          uses Firestore and Firebase Auth (needs credentials in .env)
//   npm run dev:api:memory   in-memory data and a fake signed-in user, for UI work offline

import http from 'node:http'
import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Older local .env files only have the VITE_ name. Accept it here (never on Vercel) so
// local work keeps running, but say so: VITE_ variables end up in the public bundle.
if (!process.env.GEMINI_API_KEY && process.env.VITE_GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY
  console.warn('Using VITE_GEMINI_API_KEY for local dev. Rename it to GEMINI_API_KEY in .env and rotate the key.')
}

const root = fileURLToPath(new URL('../api/', import.meta.url))
const PORT = Number(process.env.API_PORT || 3001)

// Build routes from the file tree: api/chats/[id].js -> /api/chats/:id
function collect(dir) {
  return readdirSync(dir).flatMap(name => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return collect(full)
    if (!name.endsWith('.js')) return []
    const parts = relative(root, full).slice(0, -3).split(sep)
    if (parts[parts.length - 1] === 'index') parts.pop()
    const params = []
    const pattern = parts.map(p => {
      const m = /^\[(.+)\]$/.exec(p)
      if (m) { params.push(m[1]); return '([^/]+)' }
      return p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }).join('/')
    return [{ file: full, params, re: new RegExp(`^/api${pattern ? `/${pattern}` : ''}/?$`), dynamic: params.length > 0 }]
  })
}

// Static routes win over dynamic ones, as on Vercel
const routes = collect(root).sort((a, b) => a.dynamic - b.dynamic)

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  const match = routes.map(r => ({ r, m: r.re.exec(url.pathname) })).find(x => x.m)
  if (!match) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Not found.' }))
  }
  req.query = Object.fromEntries(url.searchParams)
  match.r.params.forEach((p, i) => { req.query[p] = decodeURIComponent(match.m[i + 1]) })

  const started = Date.now()
  res.on('finish', () => console.log(`${req.method} ${url.pathname} ${res.statusCode} ${Date.now() - started}ms`))
  try {
    const mod = await import(`${pathToFileURL(match.r.file).href}?t=${statSync(match.r.file).mtimeMs}`)
    await mod.default(req, res)
  } catch (err) {
    console.error(err)
    if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Dev server error.' }))
  }
})

server.listen(PORT, () => {
  const mode = process.env.DEV_MEMORY_STORE === '1' ? 'in-memory data' : 'Firestore'
  const user = process.env.DEV_FAKE_UID ? `, signed in as "${process.env.DEV_FAKE_UID}"` : ''
  console.log(`API ready on http://localhost:${PORT}/api (${mode}${user})`)
  console.log(`Routes: ${routes.map(r => r.re.source.replace(/\\\//g, '/').replace(/^\^|\/\?\$$/g, '')).join('  ')}`)
})
