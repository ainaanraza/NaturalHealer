import React from 'react'
import { theme } from '../theme'
import '../styles/DiseaseCard.css'

export default function DiseaseCard({ disease, onSelect, isFavorite, onToggleFavorite }) {
  const categoryColor = theme.colors[disease.category] || theme.colors.wellness
  
  const severityConfig = {
    mild: { label: 'Mild', color: '#10b981' },
    moderate: { label: 'Moderate', color: '#f59e0b' },
    serious: { label: 'Serious', color: '#ef4444' }
  }
  
  const severity = severityConfig[disease.severity] || severityConfig.mild
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onToggleFavorite(disease.id)
  }
  
  return (
    <article 
      className="disease-card"
      onClick={() => onSelect(disease)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(disease)
        }
      }}
      style={{
        '--card-gradient': categoryColor.gradient,
        '--card-primary': categoryColor.primary
      }}
    >
      <div className="disease-card-header">
        <div className="disease-card-icon">{disease.icon}</div>
        <button
          className={`disease-card-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="disease-card-content">
        <h3 className="disease-card-title">{disease.title}</h3>
        <p className="disease-card-desc">{disease.desc}</p>
        
        <div className="disease-card-meta">
          <span 
            className="disease-card-badge severity"
            style={{ backgroundColor: `${severity.color}22`, color: severity.color }}
          >
            {severity.label}
          </span>
          <span className="disease-card-badge">
            {disease.remedies.length} remedies
          </span>
        </div>
      </div>
      
      <div className="disease-card-gradient" style={{ background: categoryColor.gradient }}></div>
    </article>
  )
}