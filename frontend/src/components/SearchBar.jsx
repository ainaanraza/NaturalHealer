import React, { useEffect, useRef } from 'react'
import Icon from './Icon'
import '../styles/SearchBar.css'

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)

  // "/" focuses search from anywhere on the page
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable
      if (e.key === '/' && !typing) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="search">
      <Icon name="search" size={20} className="search-icon" />
      <input
        ref={inputRef}
        type="search"
        className="search-input"
        placeholder="Search an ailment or ingredient, like jeera"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onChange('')
        }}
        aria-label="Search conditions and remedies"
      />
      {value ? (
        <button className="icon-btn search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <Icon name="x" size={18} />
        </button>
      ) : (
        <kbd className="search-kbd" aria-hidden="true">/</kbd>
      )}
    </div>
  )
}
