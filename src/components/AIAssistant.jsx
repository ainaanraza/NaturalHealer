import React, { useState, useRef } from 'react'
import { validateUserInput, getSuggestedQuestions } from '../services/geminiService'
import { streamChat } from '../services/api'
import ChatThread from './ChatThread'
import '../styles/AIAssistant.css'

// Condition-scoped assistant shown inside the remedy detail view
export default function AIAssistant({ disease }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Ask anything about ${disease.title.toLowerCase()}: what to take, when to take it, what to eat and what to avoid.`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleSend = async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isTyping) return

    if (!validateUserInput(trimmedInput)) {
      setError('Please enter a question between 2 and 1000 characters.')
      return
    }

    setError(null)
    // Condition-scoped chats are not saved, so the recent turns travel with the request
    const history = messages.slice(1).filter(m => !m.isError && m.text).map(m => ({ role: m.role, text: m.text }))
    setMessages(prev => [
      ...prev,
      { role: 'user', text: trimmedInput, timestamp: new Date() },
      { role: 'assistant', text: '', timestamp: new Date(), streaming: true },
    ])
    setInput('')
    setIsTyping(true)

    const patchAnswer = (fn) => setMessages(prev => {
      const next = prev.slice()
      next[next.length - 1] = { ...next[next.length - 1], ...fn(next[next.length - 1]) }
      return next
    })

    try {
      await streamChat({ message: trimmedInput, conditionId: disease.id, ephemeral: true, history }, (event) => {
        if (event.type === 'meta' && event.triage !== 'none') patchAnswer(() => ({ triage: event.triage }))
        if (event.type === 'delta') patchAnswer(m => ({ text: m.text + event.text }))
        if (event.type === 'done') patchAnswer(() => ({ sources: event.sources || [] }))
      })
      patchAnswer(() => ({ streaming: false }))
    } catch (err) {
      console.error('AI Response Error:', err)
      patchAnswer(m => ({ streaming: false, isError: !m.text, text: m.text || err.message }))
    } finally {
      setIsTyping(false)
      inputRef.current?.focus()
    }
  }

  const suggestions = getSuggestedQuestions({ title: disease.title }).slice(0, 3)

  return (
    <section className="ai-assistant" aria-label={`AI guide for ${disease.title}`}>
      <ChatThread
        compact
        messages={messages}
        isTyping={isTyping}
        error={error}
        input={input}
        onInputChange={(value) => {
          setInput(value)
          if (error) setError(null)
        }}
        onSend={handleSend}
        suggestions={suggestions}
        introTitle="Have a question?"
        placeholder={`Ask about ${disease.title.toLowerCase()}…`}
        inputRef={inputRef}
      />
    </section>
  )
}
