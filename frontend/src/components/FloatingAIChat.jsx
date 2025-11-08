import React, { useState, useRef, useEffect } from 'react'
import { generateAIResponse, validateUserInput, getSuggestedQuestions } from '../services/geminiService'
import '../styles/FloatingAIChat.css'

export default function FloatingAIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! 🌿 I'm your Ayurvedic wellness assistant powered by AI. I can help answer questions about natural remedies, health conditions, diet, lifestyle, and holistic wellness. How can I assist you today?`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])
  
  const handleSend = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isTyping) return
    
    // Validate input
    if (!validateUserInput(trimmedInput)) {
      setError('Please enter a valid question (2-1000 characters)');
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
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
    
    try {
      // Generate AI response using Gemini API
      const aiResponseText = await generateAIResponse(
        trimmedInput,
        messages,
        {
          title: 'General Wellness',
          description: 'Natural healing and Ayurvedic guidance'
        }
      );
      
      const assistantMessage = {
        role: 'assistant',
        text: aiResponseText,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.error('AI Response Error:', err);
      
      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        text: `⚠️ ${err.message}\n\nPlease try rephrasing your question or try again in a moment.`,
        timestamp: new Date(),
        isError: true
      }
      
      setMessages(prev => [...prev, errorMessage])
      setError(err.message);
    } finally {
      setIsTyping(false)
      inputRef.current?.focus()
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  // Default suggested questions
  const quickQuestions = [
    '💊 What are natural remedies for headaches?',
    '🍽️ What foods boost immunity naturally?',
    '🧘 How can I reduce stress with Ayurveda?',
    '⏱️ What are the best times for meals in Ayurveda?'
  ];
  
  const handleQuickQuestion = (question) => {
    // Remove emoji and extra spaces
    const cleanQuestion = question.replace(/^[\p{Emoji}\s]+/u, '').trim();
    setInput(cleanQuestion);
    inputRef.current?.focus();
  }
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div className="floating-chat-backdrop" onClick={onClose}></div>
      
      {/* Chat Window */}
      <div className="floating-chat-window">
        <div className="floating-chat-header">
          <div className="floating-chat-header-content">
            <div className="floating-chat-avatar">
              <div className="floating-chat-avatar-icon">🤖</div>
              <div className="floating-chat-status"></div>
            </div>
            <div className="floating-chat-info">
              <h3 className="floating-chat-title">AI Wellness Assistant</h3>
              <p className="floating-chat-subtitle">Powered by Ayurvedic Knowledge</p>
            </div>
          </div>
          <button 
            className="floating-chat-close"
            onClick={onClose}
            aria-label="Close chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="floating-chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`floating-message ${msg.role === 'user' ? 'user' : 'assistant'} ${msg.isError ? 'error' : ''}`}
            >
              <div className="floating-message-content">
                <div className="floating-message-text">
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="floating-message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="floating-message assistant">
              <div className="floating-message-content">
                <div className="floating-typing-indicator">
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
          <div className="floating-quick-questions">
            <div className="floating-quick-label">Quick questions:</div>
            <div className="floating-quick-grid">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  className="floating-quick-btn"
                  onClick={() => handleQuickQuestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="floating-chat-input">
          {error && <div className="floating-input-error">⚠️ {error}</div>}
          <div className="floating-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="floating-input-field"
              placeholder="Ask about remedies, diet, prevention..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              maxLength={1000}
            />
            <button
              className="floating-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              title={isTyping ? 'AI is typing...' : 'Send message'}
            >
              {isTyping ? (
                <div className="floating-send-spinner"></div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
