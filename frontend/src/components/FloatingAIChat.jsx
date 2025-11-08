import React, { useState, useRef, useEffect } from 'react'
import { generateAIResponse, validateUserInput, getSuggestedQuestions } from '../services/geminiService'
import { 
  createChatSession, 
  saveMessagePair, 
  getUserChatSessions, 
  getChatSessionMessages 
} from '../services/chatHistoryService'
import '../styles/FloatingAIChat.css'

// Function to format AI response text with markdown-style formatting
function formatMessageText(text) {
  const lines = text.split('\n');
  const formatted = [];
  let listItems = [];
  let listType = null; // 'bullet' or 'number'
  
  const flushList = () => {
    if (listItems.length > 0) {
      formatted.push(
        <ul key={`list-${formatted.length}`} className="formatted-list">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      listItems = [];
      listType = null;
    }
  };
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (!trimmed) {
      flushList();
      formatted.push(<br key={`br-${index}`} />);
      return;
    }
    
    // Handle bullet points (*, -, •)
    const bulletMatch = trimmed.match(/^[*\-•]\s+(.+)$/);
    if (bulletMatch) {
      if (listType !== 'bullet') flushList();
      listType = 'bullet';
      listItems.push(formatInlineStyles(bulletMatch[1]));
      return;
    }
    
    // Handle numbered lists (1., 2., etc.)
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberMatch) {
      if (listType !== 'number') flushList();
      listType = 'number';
      listItems.push(formatInlineStyles(numberMatch[2]));
      return;
    }
    
    flushList();
    
    // Handle headings (##, ###, etc.)
    if (trimmed.startsWith('###')) {
      formatted.push(
        <h4 key={`h4-${index}`} className="formatted-heading-3">
          {formatInlineStyles(trimmed.replace(/^###\s*/, ''))}
        </h4>
      );
    } else if (trimmed.startsWith('##')) {
      formatted.push(
        <h3 key={`h3-${index}`} className="formatted-heading-2">
          {formatInlineStyles(trimmed.replace(/^##\s*/, ''))}
        </h3>
      );
    } else if (trimmed.startsWith('#')) {
      formatted.push(
        <h2 key={`h2-${index}`} className="formatted-heading-1">
          {formatInlineStyles(trimmed.replace(/^#\s*/, ''))}
        </h2>
      );
    } else {
      // Regular paragraph
      formatted.push(
        <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: formatInlineStyles(trimmed) }} />
      );
    }
  });
  
  flushList();
  return formatted;
}

// Format inline styles: **bold**, *italic*, `code`
function formatInlineStyles(text) {
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Italic: *text* or _text_
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Code: `text`
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');
  
  return text;
}

export default function FloatingAIChat({ isOpen, onClose, user }) {
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
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [chatSessions, setChatSessions] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Load chat sessions when component mounts
  useEffect(() => {
    if (user && isOpen) {
      loadChatSessions()
    }
  }, [user, isOpen])
  
  // Create new session when opening chat without a session
  useEffect(() => {
    if (isOpen && user && !currentSessionId) {
      console.log('Creating new session for user:', user.uid)
      createNewSession()
    }
  }, [isOpen, user])
  
  const loadChatSessions = async () => {
    if (!user) {
      console.warn('No user found, cannot load chat sessions')
      return
    }
    
    console.log('Loading chat sessions for user:', user.uid)
    const result = await getUserChatSessions(user.uid)
    if (result.success) {
      console.log('Loaded sessions:', result.sessions)
      setChatSessions(result.sessions)
    } else {
      console.error('Failed to load sessions:', result.error)
    }
  }
  
  const createNewSession = async () => {
    if (!user) {
      console.error('Cannot create session: No user')
      return
    }
    
    console.log('Creating new chat session for user:', user.uid)
    const result = await createChatSession(user.uid, 'New Chat')
    if (result.success) {
      console.log('Session created successfully:', result.sessionId)
      setCurrentSessionId(result.sessionId)
      setMessages([{
        role: 'assistant',
        text: `Hello! 🌿 I'm your Ayurvedic wellness assistant powered by AI. I can help answer questions about natural remedies, health conditions, diet, lifestyle, and holistic wellness. How can I assist you today?`,
        timestamp: new Date()
      }])
      loadChatSessions()
    }
  }
  
  const loadChatSession = async (sessionId) => {
    const result = await getChatSessionMessages(user.uid, sessionId)
    if (result.success) {
      // Convert message pairs to chat format
      const loadedMessages = [{
        role: 'assistant',
        text: `Hello! 🌿 I'm your Ayurvedic wellness assistant powered by AI. I can help answer questions about natural remedies, health conditions, diet, lifestyle, and holistic wellness. How can I assist you today?`,
        timestamp: new Date()
      }]
      
      result.messages.forEach(msgPair => {
        loadedMessages.push({
          role: 'user',
          text: msgPair.userMessage,
          timestamp: msgPair.timestamp
        })
        loadedMessages.push({
          role: 'assistant',
          text: msgPair.aiResponse,
          timestamp: msgPair.timestamp
        })
      })
      
      setMessages(loadedMessages)
      setCurrentSessionId(sessionId)
      setShowHistory(false)
    }
  }
  
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
      
      // Save message pair to Firestore
      if (currentSessionId) {
        console.log('Saving message to session:', currentSessionId)
        const saveResult = await saveMessagePair(user.uid, currentSessionId, trimmedInput, aiResponseText)
        if (saveResult.success) {
          console.log('Message saved successfully')
          // Reload sessions to update the list
          await loadChatSessions()
        } else {
          console.error('Failed to save message:', saveResult.error)
        }
      } else {
        console.error('Cannot save message: No active session ID')
      }
      
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
          <button 
            className="floating-chat-history-btn"
            onClick={() => setShowHistory(!showHistory)}
            aria-label="Chat history"
            title="Chat history"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
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
          <div className="floating-chat-header-actions">
            <button 
              className="floating-chat-new-btn"
              onClick={createNewSession}
              aria-label="New chat"
              title="Start new chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
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
        </div>
        
        {/* Chat History Sidebar */}
        {showHistory && (
          <div className="floating-chat-history">
            <div className="floating-history-header">
              <h4>Chat History</h4>
              <button onClick={() => setShowHistory(false)}>×</button>
            </div>
            <div className="floating-history-list">
              {chatSessions.length === 0 ? (
                <div className="floating-history-empty">
                  <p>No chat history yet</p>
                  <span>Start a conversation!</span>
                </div>
              ) : (
                chatSessions.map(session => (
                  <div
                    key={session.id}
                    className={`floating-history-item ${currentSessionId === session.id ? 'active' : ''}`}
                    onClick={() => loadChatSession(session.id)}
                  >
                    <div className="floating-history-item-title">{session.title}</div>
                    <div className="floating-history-item-meta">
                      <span>{session.messageCount} messages</span>
                      <span>•</span>
                      <span>{session.updatedAt?.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        <div className="floating-chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`floating-message ${msg.role === 'user' ? 'user' : 'assistant'} ${msg.isError ? 'error' : ''}`}
            >
              <div className="floating-message-content">
                <div className="floating-message-text">
                  {msg.role === 'assistant' ? (
                    formatMessageText(msg.text)
                  ) : (
                    msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))
                  )}
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
