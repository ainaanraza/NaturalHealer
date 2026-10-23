import { useState, useEffect, useRef, useCallback } from 'react'
import { api } from '../services/api'

const KEY = 'naturalhealer_favorites'

function readLocal() {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function writeLocal(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // Private mode or full storage: the account copy still holds them
  }
}

/**
 * Saved conditions. Signed-in users keep them on their account (synced through the API);
 * the browser copy makes the list appear instantly and covers being offline.
 * Favorites saved before accounts synced are merged in on first load.
 */
export function useFavorites(user) {
  const [favorites, setFavorites] = useState(readLocal)
  const [syncError, setSyncError] = useState(null)
  const loaded = useRef(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    api('/favorites')
      .then(async ({ favorites: remote }) => {
        if (cancelled) return
        const local = readLocal()
        const merged = [...new Set([...remote, ...local])]
        loaded.current = true
        setFavorites(merged)
        writeLocal(merged)
        if (merged.length !== remote.length) {
          await api('/favorites', { method: 'PUT', body: { favorites: merged } })
        }
      })
      .catch(err => !cancelled && setSyncError(err.message))
    return () => { cancelled = true }
  }, [user?.uid])

  const push = useCallback((list) => {
    writeLocal(list)
    if (!user || !loaded.current) return
    clearTimeout(timer.current)
    // Coalesce quick taps into one request
    timer.current = setTimeout(() => {
      api('/favorites', { method: 'PUT', body: { favorites: list } })
        .then(() => setSyncError(null))
        .catch(err => setSyncError(err.message))
    }, 400)
  }, [user?.uid])

  useEffect(() => () => clearTimeout(timer.current), [])

  const toggleFavorite = (diseaseId) => {
    setFavorites(prev => {
      const next = prev.includes(diseaseId) ? prev.filter(id => id !== diseaseId) : [...prev, diseaseId]
      push(next)
      return next
    })
  }

  const isFavorite = (diseaseId) => favorites.includes(diseaseId)

  return { favorites, toggleFavorite, isFavorite, syncError }
}
