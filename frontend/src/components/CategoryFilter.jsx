import React from 'react'
import { categories } from '../data/diseases'
import '../styles/CategoryFilter.css'

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <div className="category-scroll">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
