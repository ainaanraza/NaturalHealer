import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Icon'
import Vaidya from './Vaidya'
import BotanicalPlate from './Botanicals'
import { Mandala } from './Garden'
import '../styles/Auth.css'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      {/* Vanya at her table, framed in an arch */}
      <aside className="auth-aside" aria-hidden="true">
        <Mandala size={620} color="#B08D57" className="auth-mandala" />
        <div className="auth-botanical"><BotanicalPlate herb="tulsi" size={180} /></div>

        <Link to="/" className="auth-brand" tabIndex={-1}>
          <Logo size={34} />
          <span className="auth-wordmark">Natural Healer</span>
        </Link>

        <div className="auth-arch">
          <Vaidya size={300} />
        </div>

        <p className="auth-quote">
          “When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.”
          <span className="auth-quote-source">Ayurvedic proverb</span>
        </p>
      </aside>

      <main className="auth-main">
        <Link to="/" className="auth-brand auth-brand-mobile">
          <Logo size={30} />
          <span className="auth-wordmark">Natural Healer</span>
        </Link>

        <div className="auth-panel">
          <header className="auth-head">
            <h1 className="auth-title">{title}</h1>
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          </header>
          {children}
          {footer && <div className="auth-footer">{footer}</div>}
        </div>
      </main>
    </div>
  )
}
