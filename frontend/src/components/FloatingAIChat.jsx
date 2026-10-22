import React, { useState, useRef, useEffect } from 'react'
import { generateAIResponse, validateUserInput } from '../services/geminiService'
import {
  createChatSession,
  saveMessagePair,
  getUserChatSessions,
  getChatSessionMessages
} from '../services/chatHistoryService'
import ChatThread from './ChatThread'
import Icon from './Icon'
import { VaidyaAvatar } from './Vaidya'
import '../styles/FloatingAIChat.css'

const GREETING = 'Describe how you feel, or ask about any herb, food or daily habit. I answer from an Ayurvedic point of view and will tell you when something needs a doctor.'

const greetingMessage = () => ({ role: 'assistant', text: GREETING, timestamp: new Date() })

const quickQuestions = [
  'What helps a tension headache naturally?',
  'Which foods support immunity in winter?',
  'How can I calm my mind before sleep?',
]

const EXIT_MS = 200

function relativeDay(date) {
  if (!date) return ''
  const days = Math.floor((Date.now() - date.getTime()) / 86400000)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export default function FloatingAIChat({ isOpen, onClose, user }) {
  const [messages, setMessages] = useState([greetingMessage()])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [chatSessions, setChatSessions] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [rendered, setRendered] = useState(isOpen)
  const [closing, setClosing] = useState(false)
  const inputRef = useRef(null)

  // Stay mounted long enough to play the exit, which leaves the way it came in
  useEffect(() => {
    if (isOpen) {
      setRendered(true)
      setClosing(false)
      return
    }
    if (!rendered) return
    setClosing(true)
    const timer = setTimeout(() => {
      setRendered(false)
      setClosing(false)
      setShowHistory(false)
    }, EXIT_MS)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Load chat sessions when the panel opens
  useEffect(() => {
    if (user && isOpen) {
      loadChatSessions()
    }
  }, [user, isOpen])

  // Create a new session when opening without one
  useEffect(() => {
    if (isOpen && user && !currentSessionId) {
      createNewSession()
    }
  }, [isOpen, user])

  useEffect(() => {
    if (isOpen && !showHistory) inputRef.current?.focus()
  }, [isOpen, showHistory])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (showHistory) setShowHistory(false)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, showHistory, onClose])

  const loadChatSessions = async () => {
    if (!user) return
    const result = await getUserChatSessions(user.uid)
    if (result.success) {
      setChatSessions(result.sessions)
    } else {
      console.error('Failed to load sessions:', result.error)
    }
  }

  const createNewSession = async () => {
    if (!user) return
    const result = await createChatSession(user.uid, 'New Chat')
    if (result.success) {
      setCurrentSessionId(result.sessionId)
      setMessages([greetingMessage()])
      setShowHistory(false)
      setError(null)
      loadChatSessions()
    }
  }

  const loadChatSession = async (sessionId) => {
    const result = await getChatSessionMessages(user.uid, sessionId)
    if (result.success) {
      const loadedMessages = [greetingMessage()]
      result.messages.forEach(msgPair => {
        loadedMessages.push({ role: 'user', text: msgPair.userMessage, timestamp: msgPair.timestamp })
        loadedMessages.push({ role: 'assistant', text: msgPair.aiResponse, timestamp: msgPair.timestamp })
      })
      setMessages(loadedMessages)
      setCurrentSessionId(sessionId)
      setShowHistory(false)
    }
  }

  const handleSend = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isTyping) return

    if (!validateUserInput(trimmedInput)) {
      setError('Please enter a question between 2 and 1000 characters.')
      return
    }

    setError(null)
    setMessages(prev => [...prev, { role: 'user', text: trimmedInput, timestamp: new Date() }])
    setInput('')
    setIsTyping(true)

    try {
      const aiResponseText = await generateAIResponse(
        trimmedInput,
        messages,
        {
          title: 'General Wellness',
          description: 'Natural healing and Ayurvedic guidance'
        }
      )

      setMessages(prev => [...prev, { role: 'assistant', text: aiResponseText, timestamp: new Date() }])

      // Save message pair to Firestore
      if (currentSessionId) {
        const saveResult = await saveMessagePair(user.uid, currentSessionId, trimmedInput, aiResponseText)
        if (saveResult.success) {
          await loadChatSessions()
        } else {
          console.error('Failed to save message:', saveResult.error)
        }
      }
    } catch (err) {
      console.error('AI Response Error:', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `${err.message} Please try again in a moment.`,
        timestamp: new Date(),
        isError: true
      }])
    } finally {
      setIsTyping(false)
      inputRef.current?.focus()
    }
  }

  if (!rendered) return null

  return (
    <div className="fchat-root" data-state={closing ? 'closing' : 'open'}>
      <div className="fchat-scrim" onClick={onClose} aria-hidden="true" />

      <section className="fchat" role="dialog" aria-modal="true" aria-label="AI wellness guide">
        <header className="fchat-head">
          {showHistory ? (
            <button className="icon-btn" onClick={() => setShowHistory(false)} aria-label="Back to conversation">
              <Icon name="arrowLeft" />
            </button>
          ) : (
            <span className="fchat-mark" aria-hidden="true"><VaidyaAvatar size={44} /></span>
          )}

          <div className="fchat-titles">
            <h2 className="fchat-title">{showHistory ? 'Past conversations' : 'Vanya'}</h2>
            {!showHistory && <p className="fchat-sub">AI Ayurveda guide</p>}
          </div>

          <div className="fchat-actions">
            {!showHistory && (
              <>
                <button className="icon-btn" onClick={() => setShowHistory(true)} aria-label="Past conversations" title="Past conversations">
                  <Icon name="history" size={19} />
                </button>
                <button className="icon-btn" onClick={createNewSession} aria-label="New conversation" title="New conversation">
                  <Icon name="plus" size={20} />
                </button>
              </>
            )}
            <button className="icon-btn" onClick={onClose} aria-label="Close">
              <Icon name="x" size={20} />
            </button>
          </div>
        </header>

        <div className="fchat-body">
          {showHistory ? (
            <div className="fchat-history">
              {chatSessions.length === 0 ? (
                <div className="fchat-empty">
                  <Icon name="chat" size={28} strokeWidth={1.5} />
                  <p>No conversations yet.</p>
                  <span>Your chats are saved here automatically.</span>
                </div>
              ) : (
                <ul className="fchat-sessions">
                  {chatSessions.map(session => (
                    <li key={session.id}>
                      <button
                        className="fchat-session"
                        aria-current={currentSessionId === session.id ? 'true' : undefined}
                        onClick={() => loadChatSession(session.id)}
                      >
                        <span className="fchat-session-title">{session.title}</span>
                        <span className="fchat-session-meta">
                          {session.messageCount} {session.messageCount === 1 ? 'question' : 'questions'} · {relativeDay(session.updatedAt)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <ChatThread
              messages={messages}
              isTyping={isTyping}
              error={error}
              input={input}
              onInputChange={(value) => {
                setInput(value)
                if (error) setError(null)
              }}
              onSend={handleSend}
              suggestions={quickQuestions}
              introTitle={`Hello${user?.displayName && user.displayName !== 'User' ? `, ${user.displayName.split(' ')[0]}` : ''}.`}
              inputRef={inputRef}
            />
          )}
        </div>
      </section>
    </div>
  )
}
