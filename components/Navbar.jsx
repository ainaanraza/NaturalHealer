import React, { useState } from 'react'
import '../styles/Navbar.css'

export default function Navbar({ onShowFavorites }) {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <span className="navbar-logo-icon">🌿</span>
            <span className="navbar-logo-text">Natural Healer</span>
          </div>
        </div>
        
        <div className={`navbar-menu ${showMenu ? 'active' : ''}`}>
          <a href="#home" className="navbar-link">
            <span className="navbar-link-icon">🏠</span>
            Home
          </a>
          <button onClick={onShowFavorites} className="navbar-link">
            <span className="navbar-link-icon">❤️</span>
            Favorites
          </button>
          <a href="#about" className="navbar-link">
            <span className="navbar-link-icon">ℹ️</span>
            About
          </a>
          <button className="navbar-cta">
            <span className="navbar-cta-icon">👤</span>
            Get Started
          </button>
        </div>
        
        <button 
          className="navbar-toggle"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
          <span className="navbar-toggle-line"></span>
        </button>
      </div>
    </nav>
  )
}
