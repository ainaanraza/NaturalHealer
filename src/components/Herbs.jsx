import React from 'react'
import BotanicalPlate, { HerbMark } from './Botanicals'
import SpiceFill from './Spice'
import Icon from './Icon'
import { beds } from '../data/kitchen'
import '../styles/Herbs.css'

/* The materia medica: each category is a herbarium plate you can select */
export function HerbPlates({ selected, onSelect, counts = {} }) {
  return (
    <div className="plates" role="radiogroup" aria-label="Choose a category">
      {beds.map((bed, i) => {
        const active = selected === bed.id
        const count = counts[bed.id] ?? 0
        return (
          <button
            key={bed.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`plate-card ${active ? 'is-active' : ''}`}
            data-herb={bed.herb}
            style={{ '--d': i }}
            onClick={() => onSelect(bed.id)}
          >
            <span className="plate-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="plate-art"><BotanicalPlate herb={bed.herb} size={104} /></span>
            <span className="plate-latin">{bed.latin}</span>
            <span className="plate-name">
              {bed.herbName} <span className="hi" lang="hi">{bed.hindi}</span>
            </span>
            <span className="plate-foot">
              <span className="plate-label">{bed.label}</span>
              <span className="plate-count">{count}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* A compact row of herb marks used as the filter on working screens */
export function HerbRail({ selected, onSelect, counts = {}, savedCount = 0 }) {
  const items = [beds[0], { id: 'saved', label: 'Saved', herb: null }, ...beds.slice(1)]

  return (
    <div className="herb-rail" role="radiogroup" aria-label="Filter by category">
      {items.map(item => {
        const active = selected === item.id
        const count = item.id === 'saved' ? savedCount : counts[item.id]
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`rail-item ${active ? 'is-active' : ''}`}
            data-herb={item.herb || undefined}
            onClick={() => onSelect(item.id)}
          >
            {item.herb ? (
              <HerbMark herb={item.herb} size={34} />
            ) : (
              <span className="rail-heart"><Icon name="heart" size={17} strokeWidth={2} /></span>
            )}
            <span className="rail-label">
              {item.label}
              {count > 0 && <span className="rail-count">{count}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* A clay bowl holding a real-looking spice: the ingredient token on the shelf */
export function ClayBowl({ spice, size = 28 }) {
  return (
    <span className="clay-bowl" style={{ '--s': `${size}px` }} aria-hidden="true">
      <SpiceFill spice={spice} size={size} />
    </span>
  )
}
