import React from 'react'
import '../styles/SearchBar.css'

export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search conditions, symptoms, or remedies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search diseases"
        />
        {value && (
          <button 
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      
      {value && (
        <div className="search-results-count">
          Found <strong>{resultCount}</strong> {resultCount === 1 ? 'result' : 'results'}
        </div>
      )}
    </div>
  )
}
