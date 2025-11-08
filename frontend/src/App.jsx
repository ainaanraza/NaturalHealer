import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import Homepage from './components/Homepage'
import FloatingAIChat from './components/FloatingAIChat'
import './styles/App.css'

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('naturalHealer_user')
    const authStatus = localStorage.getItem('naturalHealer_isAuthenticated')
    if (userData && authStatus === 'true') {
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
    }
  }, [])
  
  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('naturalHealer_user')
    localStorage.removeItem('naturalHealer_isAuthenticated')
    setUser(null)
    setIsAuthenticated(false)
    setIsAIChatOpen(false)
    navigate('/')
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login 
                onLogin={handleLogin}
                onSwitchToSignup={() => navigate('/signup')}
                onSwitchToForgotPassword={() => navigate('/forgot-password')}
              />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Signup 
                onSignup={handleLogin}
                onSwitchToLogin={() => navigate('/login')}
              />
            )
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <ForgotPassword 
              onBackToLogin={() => navigate('/login')}
            />
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? (
              <Homepage user={user} onLogout={handleLogout} onOpenAIChat={() => setIsAIChatOpen(true)} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Floating AI Chat - only show when authenticated */}
      {isAuthenticated && (
        <FloatingAIChat 
          isOpen={isAIChatOpen} 
          onClose={() => setIsAIChatOpen(false)} 
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  )
}
