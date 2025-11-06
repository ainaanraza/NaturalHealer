import React, { useState } from 'react'
import { generateAdvice } from '../data.js'

export default function AssistantPanel({ disease }){
  const [messages, setMessages] = useState([
    { role: 'bot', text: `I can help with general Ayurvedic guidance for ${disease.title}. Ask me anything!` }
  ])
  const [text, setText] = useState('')

  function send() {
    const t = text.trim()
    if (!t) return
    const userMsg = { role: 'user', text: t }
    setMessages(m => [...m, userMsg])
    setText('')
    // Local stubbed assistant response
    const reply = generateAdvice({ diseaseId: disease.id, userText: t })
    const botMsg = { role: 'bot', text: reply }
    setTimeout(() => setMessages(m => [...m, botMsg]), 150)
  }

  return (
    <div className="assistant">
      <div className="assistantHeader">
        <span className="pill">AI Assistant</span>
        <span style={{ color: '#a5b4ce', fontSize: 12 }}>educational only</span>
      </div>
      <div className="assistantBody" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'bot'}`}>{m.text}</div>
        ))}
      </div>
      <div className="assistantInput">
        <input
          value={text}
          placeholder={`Ask about ${disease.title}…`}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send() }}
          aria-label="Type your question"
        />
        <button onClick={send} aria-label="Send message">Send</button>
      </div>
    </div>
  )
}