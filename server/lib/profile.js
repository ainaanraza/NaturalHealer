import { getStore } from './store.js'

const clampName = (name) => String(name || '').replace(/\s+/g, ' ').trim().slice(0, 60)

// Return the user's profile, creating it on first contact from their sign-in details
export async function ensureProfile(user) {
  const store = getStore()
  const existing = await store.getProfile(user.uid)
  if (existing) return existing
  return store.upsertProfile(user.uid, {
    uid: user.uid,
    email: user.email,
    displayName: clampName(user.name) || 'Friend',
    favorites: [],
    prakriti: null,
  }, { create: true })
}

export function publicProfile(p) {
  return {
    uid: p.uid,
    email: p.email || null,
    displayName: p.displayName || 'Friend',
    favorites: p.favorites || [],
    prakriti: p.prakriti || null,
    createdAt: p.createdAt || null,
  }
}

export { clampName }
