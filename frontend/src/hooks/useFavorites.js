import { useState, useEffect } from 'react'

// Custom hook for managing favorites with localStorage persistence
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('naturalhealer_favorites')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load favorites:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('naturalhealer_favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Failed to save favorites:', error)
    }
  }, [favorites])

  const toggleFavorite = (diseaseId) => {
    setFavorites(prev => {
      if (prev.includes(diseaseId)) {
        return prev.filter(id => id !== diseaseId)
      } else {
        return [...prev, diseaseId]
      }
    })
  }

  const isFavorite = (diseaseId) => {
    return favorites.includes(diseaseId)
  }

  return { favorites, toggleFavorite, isFavorite }
}
