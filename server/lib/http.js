// Small helpers so handlers run unchanged on Vercel's Node runtime and the local dev server.

export class HttpError extends Error {
  constructor(status, message, extra = {}) {
    super(message)
    this.status = status
    this.extra = extra
  }
}

export function sendJson(res, status, body, headers = {}) {
  if (res.headersSent) return
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v)
  res.end(JSON.stringify(body))
}

// Vercel pre-parses JSON into req.body; the dev server leaves the stream for us
export async function readJson(req, { limit = 32 * 1024 } = {}) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') return parse(req.body)
    if (Buffer.isBuffer(req.body)) return parse(req.body.toString('utf8'))
    return req.body
  }
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > limit) throw new HttpError(413, 'Request body is too large.')
    chunks.push(chunk)
  }
  return parse(Buffer.concat(chunks).toString('utf8'))
}

function parse(text) {
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    throw new HttpError(400, 'Request body must be valid JSON.')
  }
}

export function getQuery(req) {
  if (req.query) return req.query
  const url = new URL(req.url, 'http://localhost')
  return Object.fromEntries(url.searchParams)
}

/**
 * Wrap a map of method handlers with method checks and uniform error responses.
 * handlers: { GET: async (req, res) => {...}, POST: ... }
 */
export function route(handlers) {
  return async function handler(req, res) {
    const fn = handlers[req.method]
    if (!fn) {
      res.setHeader('Allow', Object.keys(handlers).join(', '))
      return sendJson(res, 405, { error: 'Method not allowed.' })
    }
    try {
      await fn(req, res)
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.extra.headers) {
          for (const [k, v] of Object.entries(err.extra.headers)) res.setHeader(k, v)
        }
        return sendJson(res, err.status, { error: err.message, ...(err.extra.body || {}) })
      }
      console.error('[api] Unhandled error:', err)
      sendJson(res, 500, { error: 'Something went wrong on our side. Please try again.' })
    }
  }
}
