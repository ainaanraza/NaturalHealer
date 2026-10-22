import React from 'react'
import '../styles/Garden.css'

// Quiet ornaments shared across screens: a slowly turning mandala and a vine rule.

/* A lotus-petal mandala, used as the sun's halo and as a section ornament */
export function Mandala({ size = 320, petals = 16, color = '#E3A31A', className = '' }) {
  const rings = [
    { r: 46, n: petals, len: 18, w: 7, o: 0.9 },
    { r: 30, n: petals / 2, len: 14, w: 8, o: 0.7 },
  ]
  return (
    <svg className={`mandala ${className}`} width={size} height={size} viewBox="-100 -100 200 200" aria-hidden="true">
      <circle r="96" fill="none" stroke={color} strokeOpacity="0.25" strokeWidth="0.8" strokeDasharray="2 5" />
      <circle r="80" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="0.8" />
      {Array.from({ length: petals * 2 }, (_, i) => (
        <circle key={`d${i}`} cx={0} cy={-88} r={1.6} fill={color} fillOpacity="0.5" transform={`rotate(${(360 / (petals * 2)) * i})`} />
      ))}
      {rings.map((ring, k) => (
        <g key={k} className={`mandala-ring mandala-ring-${k}`}>
          {Array.from({ length: ring.n }, (_, i) => (
            <path
              key={i}
              d={`M0 ${-ring.r} C${ring.w} ${-ring.r - ring.len * 0.4} ${ring.w * 0.6} ${-ring.r - ring.len} 0 ${-ring.r - ring.len - 6} C${-ring.w * 0.6} ${-ring.r - ring.len} ${-ring.w} ${-ring.r - ring.len * 0.4} 0 ${-ring.r}Z`}
              fill={color}
              fillOpacity={ring.o * 0.5}
              stroke={color}
              strokeOpacity={ring.o}
              strokeWidth="0.8"
              transform={`rotate(${(360 / ring.n) * i + (k ? 360 / ring.n / 2 : 0)})`}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

/* A hand-drawn vine that draws itself across the page when it scrolls into view */
export function VineDivider({ className = '' }) {
  return (
    <div className={`vine ${className}`} aria-hidden="true" data-reveal="draw">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path className="vine-stem" d="M0 30 C100 6 200 54 300 30 C400 6 500 54 600 30 C700 6 800 54 900 30 C1000 6 1100 54 1200 30" fill="none" stroke="#5E8C4A" strokeWidth="2" strokeLinecap="round" pathLength="1" />
        {[150, 450, 750, 1050].map((x, i) => (
          <g key={x} className="vine-leaf" style={{ '--i': i }} transform={`translate(${x} ${i % 2 ? 40 : 20})`}>
            <path d="M0 0 C10 -10 22 -8 26 -2 C18 6 8 6 0 0Z" fill="#7FA86A" transform={i % 2 ? 'scale(1 -1)' : undefined} />
          </g>
        ))}
        {[300, 900].map(x => (
          <g key={x} className="vine-flower" transform={`translate(${x} 30)`}>
            {Array.from({ length: 6 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-6" rx="3.6" ry="6" fill="#E3A31A" transform={`rotate(${i * 60})`} />
            ))}
            <circle r="3" fill="#C9733B" />
          </g>
        ))}
      </svg>
    </div>
  )
}
