import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ user, onLogout, favoritesCount, onOpenAIChat }) {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  const isAuthenticated = !!user
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <span className="navbar-logo-icon">🌿</span>
            <span className="navbar-logo-text">Natural Healer</span>
          </div>
        </Link>
        
        <div className={`navbar-menu ${showMenu ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setShowMenu(false)}>
            <span className="navbar-link-icon">🏠</span>
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/home" className="navbar-link" onClick={() => setShowMenu(false)}>
                <span className="navbar-link-icon">💊</span>
                Remedies
              </Link>
              {favoritesCount !== undefined && (
                <div className="navbar-favorites-badge">
                  <span className="navbar-link-icon">❤️</span>
                  <span>{favoritesCount}</span>
                </div>
              )}
            </>
          )}
          <a href="#features" className="navbar-link" onClick={() => setShowMenu(false)}>
            <span className="navbar-link-icon">✨</span>
            Features
          </a>
        </div>
        
        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button 
                onClick={onOpenAIChat} 
                className="navbar-ai-btn"
                title="Open AI Assistant"
                aria-label="Open AI Assistant"
              >
                <span className="navbar-ai-icon">🤖</span>
                <span className="navbar-ai-text">AI Assistant</span>
              </button>
              <div className="navbar-user">
                <span className="navbar-user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="navbar-user-name">{user?.name || 'User'}</span>
              </div>
              <button onClick={() => { onLogout(); setShowMenu(false); }} className="navbar-btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn-outline" onClick={() => setShowMenu(false)}>
                Login
              </Link>
              <Link to="/signup" className="navbar-cta" onClick={() => setShowMenu(false)}>
                Get Started
              </Link>
            </>
          )}
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
