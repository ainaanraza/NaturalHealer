import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './services/firebase'
import { signOutUser } from './services/authService'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import Homepage from './components/Homepage'
import Prakriti from './components/Prakriti'
import FloatingAIChat from './components/FloatingAIChat'
import { VaidyaAvatar } from './components/Vaidya'

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'User'
        })
        setIsAuthenticated(true)
      } else {
        // User is signed out
        setUser(null)
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])
  
  const handleLogin = (userData) => {
    // Firebase auth state listener will handle setting user state
    navigate('/home')
  }

  const handleLogout = async () => {
    await signOutUser()
    setIsAIChatOpen(false)
    navigate('/')
  }

  // Public pages render immediately; only the private dashboard waits for the session
  const sessionPending = (
    <div className="auth-loading" role="status">
      <VaidyaAvatar size={72} />
      <p>Preparing your remedies…</p>
    </div>
  )

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <LandingPage
              user={user}
              onLogout={handleLogout}
              onOpenAIChat={() => setIsAIChatOpen(true)}
            />
          }
        />
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
            isLoading ? sessionPending : isAuthenticated ? (
              <Homepage user={user} onLogout={handleLogout} onOpenAIChat={() => setIsAIChatOpen(true)} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        <Route
          path="/prakriti"
          element={
            isLoading ? sessionPending : isAuthenticated ? (
              <Prakriti user={user} onLogout={handleLogout} onOpenAIChat={() => setIsAIChatOpen(true)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Floating AI Chat - only show when authenticated */}
      {isAuthenticated && user && (
        <FloatingAIChat 
          isOpen={isAIChatOpen} 
          onClose={() => setIsAIChatOpen(false)}
          user={user}
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
