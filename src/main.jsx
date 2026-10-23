import React from 'react'
import { createRoot } from 'react-dom/client'
// Design system first, so component styles can build on it
import './styles/App.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)