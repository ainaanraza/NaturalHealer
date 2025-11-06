import React, { useState, useRef, useEffect } from 'react'
import { generateAIResponse } from '../data/diseases'
import '../styles/AIAssistant.css'

export default function AIAssistant({ disease }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! I'm your Ayurvedic wellness assistant. I can help answer questions about ${disease.title}. Feel free to ask about remedies, prevention, diet, lifestyle, or anything else!`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSend = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isTyping) return
    
    // Add user message
    const userMessage = {
      role: 'user',
      text: trimmedInput,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    
    // Show typing indicator
    setIsTyping(true)
    
    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Generate AI response
    const aiResponse = generateAIResponse({
      diseaseId: disease.id,
      userQuestion: trimmedInput
    })
    
    const assistantMessage = {
      role: 'assistant',
      text: aiResponse,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)
    inputRef.current?.focus()
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  const quickQuestions = [
    '💊 What herbs help?',
    '🍽️ Diet recommendations?',
    '🧘 Any yoga poses?',
    '⏱️ How long to recover?'
  ]
  
  const handleQuickQuestion = (question) => {
    setInput(question.substring(2)) // Remove emoji
    inputRef.current?.focus()
  }
  
  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <div className="ai-assistant-avatar">
          <div className="ai-assistant-avatar-icon">🤖</div>
          <div className="ai-assistant-status"></div>
        </div>
        <div className="ai-assistant-info">
          <h3 className="ai-assistant-title">AI Wellness Assistant</h3>
          <p className="ai-assistant-subtitle">Powered by Ayurvedic Knowledge</p>
        </div>
      </div>
      
      <div className="ai-assistant-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`ai-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="ai-message-content">
              <div className="ai-message-text">{msg.text}</div>
              <div className="ai-message-time">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="ai-message assistant">
            <div className="ai-message-content">
              <div className="ai-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {messages.length === 1 && (
        <div className="ai-quick-questions">
          <div className="ai-quick-label">Quick questions:</div>
          <div className="ai-quick-grid">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="ai-quick-btn"
                onClick={() => handleQuickQuestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="ai-assistant-input">
        <input
          ref={inputRef}
          type="text"
          className="ai-input-field"
          placeholder="Ask about remedies, diet, prevention..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <button
          className="ai-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
