import React from 'react'
import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-icon">🌿</span>
          <span>Ancient Wisdom, Modern Wellness</span>
        </div>
        
        <h1 className="hero-title">
          Natural Healing with
          <span className="hero-title-gradient"> Ayurveda</span>
        </h1>
        
        <p className="hero-description">
          Discover time-tested remedies for common ailments. Browse conditions, 
          explore natural treatments, and get personalized guidance from our AI assistant.
        </p>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">12+</div>
            <div className="hero-stat-label">Conditions</div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">Remedies</div>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <div className="hero-stat-number">24/7</div>
            <div className="hero-stat-label">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
