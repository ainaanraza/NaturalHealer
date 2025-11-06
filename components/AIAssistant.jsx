import React, { useState, useRef, useEffect } from 'react'
import { generateAIResponse, validateUserInput, getSuggestedQuestions } from '../services/geminiService'
import '../styles/AIAssistant.css'

export default function AIAssistant({ disease }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! 🌿 I'm your Ayurvedic wellness assistant powered by AI. I can help answer questions about ${disease.title} and provide natural healing guidance. Feel free to ask about remedies, prevention, diet, lifestyle, or anything else!`,
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
          title: disease.title,
          description: disease.description,
          symptoms: disease.symptoms
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
  
  // Get suggested questions based on disease context
  const quickQuestions = getSuggestedQuestions({
    title: disease.title,
    symptoms: disease.symptoms
  }).map((q, i) => {
    const emojis = ['💊', '🍽️', '🧘', '⏱️', '🌿'];
    return `${emojis[i % emojis.length]} ${q}`;
  }).slice(0, 4);
  
  const handleQuickQuestion = (question) => {
    // Remove emoji and extra spaces
    const cleanQuestion = question.replace(/^[\p{Emoji}\s]+/u, '').trim();
    setInput(cleanQuestion);
    inputRef.current?.focus();
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
            className={`ai-message ${msg.role === 'user' ? 'user' : 'assistant'} ${msg.isError ? 'error' : ''}`}
          >
            <div className="ai-message-content">
              <div className="ai-message-text">
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
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
        {error && <div className="ai-input-error">⚠️ {error}</div>}
        <div className="ai-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="ai-input-field"
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
            className="ai-send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            title={isTyping ? 'AI is typing...' : 'Send message'}
          >
            {isTyping ? (
              <div className="ai-send-spinner"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
