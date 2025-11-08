import React, { useEffect } from 'react'
import { theme } from '../theme'
import AIAssistant from './AIAssistant'
import '../styles/DiseaseModal.css'

export default function DiseaseModal({ disease, onClose, isFavorite, onToggleFavorite }) {
  const categoryColor = theme.colors[disease.category] || theme.colors.wellness
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="modal-container">
        {/* Header */}
        <div 
          className="modal-header"
          style={{
            background: `linear-gradient(135deg, ${categoryColor.primary}22 0%, transparent 100%)`
          }}
        >
          <div className="modal-header-content">
            <div className="modal-icon-wrapper" style={{ background: categoryColor.gradient }}>
              <span className="modal-icon">{disease.icon}</span>
            </div>
            <div className="modal-title-section">
              <h2 className="modal-title">{disease.title}</h2>
              <p className="modal-subtitle">{disease.desc}</p>
            </div>
          </div>
          
          <div className="modal-header-actions">
            <button
              className={`modal-favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(disease.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="modal-body">
          <div className="modal-content">
            {/* Info Cards */}
            <div className="modal-info-grid">
              <div className="modal-info-card">
                <div className="modal-info-icon">⏱️</div>
                <div className="modal-info-content">
                  <div className="modal-info-label">Duration</div>
                  <div className="modal-info-value">{disease.duration}</div>
                </div>
              </div>
              
              <div className="modal-info-card">
                <div className="modal-info-icon">🔬</div>
                <div className="modal-info-content">
                  <div className="modal-info-label">Dosha</div>
                  <div className="modal-info-value">{disease.doshas.join(', ')}</div>
                </div>
              </div>
              
              <div className="modal-info-card">
                <div className="modal-info-icon">📊</div>
                <div className="modal-info-content">
                  <div className="modal-info-label">Severity</div>
                  <div className="modal-info-value">{disease.severity}</div>
                </div>
              </div>
            </div>
            
            {/* Remedies */}
            <section className="modal-section">
              <div className="modal-section-header">
                <h3 className="modal-section-title">
                  <span className="modal-section-icon">🌿</span>
                  Natural Remedies
                </h3>
              </div>
              <ul className="modal-remedy-list">
                {disease.remedies.map((remedy, index) => (
                  <li key={index} className="modal-remedy-item">
                    <span className="modal-remedy-bullet" style={{ background: categoryColor.gradient }}>
                      {index + 1}
                    </span>
                    <span className="modal-remedy-text">{remedy}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* Prevention */}
            <section className="modal-section">
              <div className="modal-section-header">
                <h3 className="modal-section-title">
                  <span className="modal-section-icon">🛡️</span>
                  Prevention Tips
                </h3>
              </div>
              <div className="modal-prevention-grid">
                {disease.prevention.map((tip, index) => (
                  <div key={index} className="modal-prevention-card">
                    <div className="modal-prevention-icon">✓</div>
                    <p className="modal-prevention-text">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Disclaimer */}
            <div className="modal-disclaimer">
              <span className="modal-disclaimer-icon">ℹ️</span>
              <p>
                This information is for educational purposes only and does not replace professional medical advice. 
                Always consult with a qualified healthcare practitioner before starting any new treatment.
              </p>
            </div>
          </div>
          
          {/* AI Assistant */}
          <div className="modal-sidebar">
            <AIAssistant disease={disease} />
          </div>
        </div>
      </div>
    </div>
  )
}
