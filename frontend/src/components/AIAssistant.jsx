import React, { useState, useRef } from 'react'
import { generateAIResponse, validateUserInput, getSuggestedQuestions } from '../services/geminiService'
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
    setMessages(prev => [...prev, { role: 'user', text: trimmedInput, timestamp: new Date() }])
    setInput('')
    setIsTyping(true)

    try {
      const aiResponseText = await generateAIResponse(
        trimmedInput,
        messages,
        {
          title: disease.title,
          description: disease.desc
        }
      )

      setMessages(prev => [...prev, { role: 'assistant', text: aiResponseText, timestamp: new Date() }])
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
