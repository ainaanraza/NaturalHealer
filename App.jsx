import React, { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import SearchBar from './components/SearchBar'
import DiseaseCard from './components/DiseaseCard'
import DiseaseModal from './components/DiseaseModal'
import { diseases } from './data/diseases'
import { useFavorites } from './hooks/useFavorites'
import './styles/App.css'

export default function App() {
  const [selectedDisease, setSelectedDisease] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  
  // Filter diseases based on search, category, and favorites
  const filteredDiseases = useMemo(() => {
    let filtered = diseases
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(d => d.category === activeCategory)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(query) ||
        d.desc.toLowerCase().includes(query) ||
        d.remedies.some(r => r.toLowerCase().includes(query)) ||
        d.prevention.some(p => p.toLowerCase().includes(query))
      )
    }
    
    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter(d => isFavorite(d.id))
    }
    
    return filtered
  }, [searchQuery, activeCategory, showFavoritesOnly, favorites])
  
  const handleShowFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly)
    setActiveCategory('all')
    setSearchQuery('')
  }
  
  return (
    <div className="app">
      <Navbar onShowFavorites={handleShowFavorites} />
      
      <main className="main-content">
        <Hero />
        
        <div className="content-container">
          {showFavoritesOnly && (
            <div className="favorites-banner">
              <div className="favorites-banner-content">
                <span className="favorites-banner-icon">❤️</span>
                <span className="favorites-banner-text">
                  Showing your favorite remedies
                </span>
              </div>
              <button 
                className="favorites-banner-close"
                onClick={() => setShowFavoritesOnly(false)}
              >
                ✕
              </button>
            </div>
          )}
          
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredDiseases.length}
          />
          
          <div className="results-header">
            <h2 className="results-title">
              {showFavoritesOnly 
                ? 'Your Favorites' 
                : activeCategory === 'all' 
                  ? 'All Natural Remedies' 
                  : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Remedies`}
            </h2>
            <span className="results-count">
              {filteredDiseases.length} {filteredDiseases.length === 1 ? 'remedy' : 'remedies'}
            </span>
          </div>
          
          {filteredDiseases.length > 0 ? (
            <div className="diseases-grid">
              {filteredDiseases.map(disease => (
                <DiseaseCard
                  key={disease.id}
                  disease={disease}
                  onSelect={setSelectedDisease}
                  isFavorite={isFavorite(disease.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                {showFavoritesOnly ? '❤️' : '🔍'}
              </div>
              <h3 className="empty-state-title">
                {showFavoritesOnly 
                  ? 'No favorites yet' 
                  : 'No results found'}
              </h3>
              <p className="empty-state-text">
                {showFavoritesOnly
                  ? 'Start adding remedies to your favorites by clicking the heart icon on any card.'
                  : 'Try adjusting your search or filters to find what you\'re looking for.'}
              </p>
              {(searchQuery || showFavoritesOnly) && (
                <button 
                  className="empty-state-btn"
                  onClick={() => {
                    setSearchQuery('')
                    setShowFavoritesOnly(false)
                    setActiveCategory('all')
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      {selectedDisease && (
        <DiseaseModal
          disease={selectedDisease}
          onClose={() => setSelectedDisease(null)}
          isFavorite={isFavorite(selectedDisease.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}