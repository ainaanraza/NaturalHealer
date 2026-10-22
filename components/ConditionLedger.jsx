import React, { useState } from 'react'
import Icon from './Icon'
import { HerbMark } from './Botanicals'
import { ingredientsFor, bedFor } from '../data/kitchen'
import '../styles/Ledger.css'

export const severityLabels = {
  mild: 'Mild',
  moderate: 'Moderate',
  serious: 'Needs a doctor',
}

export function SaveButton({ saved, onToggle, label }) {
  return (
    <button
      type="button"
      className={`save-btn ${saved ? 'is-saved' : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
    >
      <Icon name="heart" size={20} />
    </button>
  )
}

export function ShelfTags({ disease, highlight, limit = 4 }) {
  const items = ingredientsFor(disease)
  if (items.length === 0) return null
  const shown = items.slice(0, limit)
  return (
    <ul className="shelf-tags" aria-label="From your kitchen shelf">
      {shown.map(item => (
        <li key={item.id} className={`tag ${highlight === item.id ? 'is-match' : ''}`}>
          {item.name}
          <span className="hi" lang="hi">{item.hindi}</span>
        </li>
      ))}
      {items.length > limit && <li className="shelf-more">+{items.length - limit}</li>}
    </ul>
  )
}

function Severity({ level }) {
  return (
    <span className={`severity severity-${level}`}>
      {level === 'serious' && <Icon name="alert" size={15} strokeWidth={2.25} />}
      {severityLabels[level] || 'Mild'}
    </span>
  )
}

function RowHead({ disease, highlight }) {
  const bed = bedFor(disease.category)
  return (
    <>
      <HerbMark herb={bed.herb} size={52} />
      <span className="ledger-main">
        <span className="ledger-title">{disease.title}</span>
        <span className="ledger-desc">{disease.desc}</span>
        <ShelfTags disease={disease} highlight={highlight} />
      </span>
      <span className="ledger-meta">
        <Severity level={disease.severity} />
        <span className="ledger-duration">{disease.duration}</span>
      </span>
    </>
  )
}

/* Inline remedy, read straight from the ledger (landing) */
function RemedyPanel({ disease, onContinue, continueLabel }) {
  return (
    <div className="ledger-panel">
      {disease.severity === 'serious' && (
        <p className="notice notice-chilli">
          <Icon name="alert" size={18} />
          <span>{disease.title} needs a doctor's care. Use these alongside your treatment, never instead of it.</span>
        </p>
      )}
      <div className="ledger-panel-cols">
        <div>
          <h4 className="ledger-panel-title">What to make</h4>
          <ol className="ledger-remedies">
            {disease.remedies.map(r => <li key={r}>{r}</li>)}
          </ol>
        </div>
        <div>
          <h4 className="ledger-panel-title">To keep it away</h4>
          <ul className="ledger-prevention">
            {disease.prevention.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>
      <button className="btn btn-leaf" onClick={onContinue}>
        {continueLabel}
        <Icon name="arrowRight" size={18} className="btn-arrow" />
      </button>
    </div>
  )
}

export default function ConditionLedger({
  conditions,
  mode = 'open',
  onOpen,
  isFavorite,
  onToggleFavorite,
  highlight,
  onContinue,
  continueLabel = 'Save it and ask the guide',
}) {
  const [expanded, setExpanded] = useState(null)

  return (
    <ul className={`ledger ${mode === 'expand' ? 'ledger-staggered' : ''}`}>
      {conditions.map((disease, i) => {
        const open = expanded === disease.id
        return (
          <li
            key={disease.id}
            className={`ledger-row ${open ? 'is-open' : ''}`}
            data-category={disease.category}
            style={{ '--i': Math.min(i, 8) }}
          >
            {mode === 'expand' ? (
              <>
                <button
                  type="button"
                  className="ledger-head"
                  aria-expanded={open}
                  onClick={() => setExpanded(open ? null : disease.id)}
                >
                  <RowHead disease={disease} highlight={highlight} />
                  <Icon name="plus" size={20} className="ledger-toggle" />
                </button>
                {/* Always mounted so opening and closing can transition (and retarget mid-way) */}
                <div className="ledger-collapse" data-open={open} inert={open ? undefined : ''}>
                  <div className="ledger-collapse-inner">
                    <RemedyPanel disease={disease} onContinue={() => onContinue(disease)} continueLabel={continueLabel} />
                  </div>
                </div>
              </>
            ) : (
              <div className="ledger-head ledger-head-static">
                <RowHead disease={disease} highlight={highlight} />
                <SaveButton
                  saved={isFavorite(disease.id)}
                  onToggle={() => onToggleFavorite(disease.id)}
                  label={disease.title}
                />
                {/* Whole row opens the remedy; the save button sits above this layer */}
                <button type="button" className="ledger-open" onClick={() => onOpen(disease)}>
                  <span className="visually-hidden">Open {disease.title}</span>
                </button>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
