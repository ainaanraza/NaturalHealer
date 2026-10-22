import React from 'react'
import '../styles/Botanicals.css'

// Botanical plates in the manner of a herbarium sheet: fine ink outlines with a
// pale wash. Every stroke has pathLength=1 so it can draw itself in (see CSS).
// All plates share a 160x200 grid with the plant rooted at the bottom.

const WASH = 'rgba(127, 168, 106, 0.22)'

// Leaf outline pointing up (-y) from the origin.
// shape: 'ovate' (widest near base), 'lance' (even), 'obovate' (widest near tip)
function leafOutline(L, w, { shape = 'ovate', teeth = 0, curve = 0 } = {}) {
  const N = 22
  const k = shape === 'ovate' ? 0.78 : shape === 'obovate' ? 1.4 : 1
  const edge = (side) => {
    const pts = []
    for (let i = 0; i <= N; i++) {
      const t = i / N
      let half = (w / 2) * Math.pow(Math.sin(Math.PI * Math.pow(t, k)), 0.85)
      if (teeth && i % 2 === 1 && i > 1 && i < N - 1) half += w * 0.07
      const bend = curve * Math.sin(Math.PI * t) * L * 0.12
      pts.push([(side * half + bend).toFixed(2), (-L * t).toFixed(2)])
    }
    return pts
  }
  const right = edge(1)
  const left = edge(-1).reverse()
  return `M0 0 L${right.map(p => p.join(' ')).join(' L')} L${left.map(p => p.join(' ')).join(' L')}Z`
}

function Leaf({ x, y, angle = 0, L, w, shape, teeth, curve = 0, veins = 3, parallel = false, fill = WASH }) {
  const lines = []
  for (let k = 1; k <= veins; k++) {
    const vy = (-L * k) / (veins + 1)
    const bend = curve * Math.sin(Math.PI * (k / (veins + 1))) * L * 0.12
    if (parallel) {
      lines.push(`M${(w * 0.18 * (k % 2 ? 1 : -1)).toFixed(1)} ${(-L * 0.08).toFixed(1)} Q${(w * 0.22 * (k % 2 ? 1 : -1) + bend).toFixed(1)} ${(-L * 0.5).toFixed(1)} ${bend.toFixed(1)} ${(-L * 0.94).toFixed(1)}`)
    } else {
      lines.push(`M${bend.toFixed(1)} ${vy.toFixed(1)} l${(w * 0.34).toFixed(1)} ${(-L * 0.1).toFixed(1)}`)
      lines.push(`M${bend.toFixed(1)} ${vy.toFixed(1)} l${(-w * 0.34).toFixed(1)} ${(-L * 0.1).toFixed(1)}`)
    }
  }
  const mid = curve
    ? `M0 0 Q${(curve * L * 0.12).toFixed(1)} ${(-L * 0.5).toFixed(1)} 0 ${(-L * 0.94).toFixed(1)}`
    : `M0 0 L0 ${(-L * 0.94).toFixed(1)}`
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path className="ink-fill" d={leafOutline(L, w, { shape, teeth, curve })} fill={fill} stroke="none" />
      <path className="ink-stroke" pathLength="1" d={leafOutline(L, w, { shape, teeth, curve })} />
      <path className="ink-stroke ink-fine" pathLength="1" d={mid} />
      {lines.map((d, i) => <path key={i} className="ink-stroke ink-fine" pathLength="1" d={d} />)}
    </g>
  )
}

const Stroke = ({ d, fine }) => <path className={`ink-stroke ${fine ? 'ink-fine' : ''}`} pathLength="1" d={d} />

function Tulsi() {
  const pairs = [[168, 36, 22], [142, 32, 20], [116, 28, 17], [92, 22, 14]]
  return (
    <>
      <Stroke d="M80 196 C80 160 79 120 80 40" />
      <Stroke d="M80 150 C92 140 102 128 108 116" />
      {pairs.map(([y, L, w]) => (
        <g key={y}>
          <Leaf x={80} y={y} angle={-62} L={L} w={w} teeth />
          <Leaf x={80} y={y} angle={62} L={L} w={w} teeth />
        </g>
      ))}
      <Leaf x={108} y={116} angle={30} L={18} w={11} teeth veins={2} />
      {/* Flower spike (manjari) in whorls */}
      {[44, 37, 30, 23, 16].map((y, i) => (
        <g key={y}>
          <ellipse className="ink-fill" cx={80 - 5} cy={y} rx="3" ry="2.2" fill="rgba(155, 95, 168, 0.35)" />
          <ellipse className="ink-fill" cx={80 + 5} cy={y} rx="3" ry="2.2" fill="rgba(155, 95, 168, 0.35)" />
          <path className="ink-stroke ink-fine" pathLength="1" d={`M${80 - 8 + i * 0.4} ${y} q3 -3 6 0 M${80 + 2 - i * 0.4} ${y} q3 -3 6 0`} />
        </g>
      ))}
    </>
  )
}

function Saunf() {
  const rays = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
  const frond = (sx, sy, ex, ey, cx, cy) => {
    const lines = []
    for (let i = 1; i < 10; i++) {
      const t = i / 10
      const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * ex
      const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ey
      const len = 9 * (1 - t * 0.6)
      lines.push(`M${x.toFixed(1)} ${y.toFixed(1)} l${(len * 0.7).toFixed(1)} ${(-len).toFixed(1)} M${x.toFixed(1)} ${y.toFixed(1)} l${(-len * 0.7).toFixed(1)} ${(-len * 0.9).toFixed(1)}`)
    }
    return [`M${sx} ${sy} Q${cx} ${cy} ${ex} ${ey}`, ...lines]
  }
  return (
    <>
      <Stroke d="M80 196 C80 150 81 100 80 60" />
      {rays.map(i => (
        <g key={i}>
          <Stroke fine d={`M80 60 Q${80 + i * 5} 48 ${80 + i * 10} ${36 + Math.abs(i) * 2.5}`} />
          {[[-3, -1], [3, -1], [0, -4], [-2, 2], [2, 2]].map(([dx, dy], j) => (
            <circle key={j} className="ink-fill" cx={80 + i * 10 + dx} cy={36 + Math.abs(i) * 2.5 + dy} r="1.7" fill="rgba(227, 190, 40, 0.75)" />
          ))}
        </g>
      ))}
      {frond(80, 150, 34, 104, 52, 140).map((d, i) => <Stroke key={`a${i}`} d={d} fine={i > 0} />)}
      {frond(80, 128, 126, 86, 110, 122).map((d, i) => <Stroke key={`b${i}`} d={d} fine={i > 0} />)}
      {frond(80, 176, 128, 150, 104, 172).map((d, i) => <Stroke key={`c${i}`} d={d} fine={i > 0} />)}
      {/* Seeds, ribbed */}
      {[[30, 178, -30], [40, 186, 10]].map(([x, y, r]) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse className="ink-fill" rx="3" ry="8" fill="rgba(156, 138, 85, 0.45)" />
          <Stroke d="M0 -8 C3 -4 3 4 0 8 C-3 4 -3 -4 0 -8Z" />
          <Stroke fine d="M0 -7 V7 M-1.6 -6 V6 M1.6 -6 V6" />
        </g>
      ))}
    </>
  )
}

function Brahmi() {
  const flower = (x, y) => (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map(a => (
        <g key={a} transform={`rotate(${a})`}>
          <ellipse className="ink-fill" cx="0" cy="-4.4" rx="2.6" ry="4" fill="rgba(200, 180, 230, 0.45)" />
          <path className="ink-stroke ink-fine" pathLength="1" d="M0 0 C2.6 -2 2.6 -7 0 -8.4 C-2.6 -7 -2.6 -2 0 0Z" />
        </g>
      ))}
      <circle className="ink-fill" r="1.4" fill="rgba(227, 190, 40, 0.8)" />
    </g>
  )
  return (
    <>
      <Stroke d="M14 178 C40 168 64 184 90 172 C112 162 132 172 150 164" />
      {[[34, 173], [62, 178], [90, 172], [120, 166]].map(([x, y]) => (
        <g key={x}>
          <Leaf x={x} y={y} angle={-38} L={16} w={11} shape="obovate" veins={1} />
          <Leaf x={x} y={y} angle={142} L={14} w={10} shape="obovate" veins={1} />
        </g>
      ))}
      <Stroke d="M62 178 C60 150 64 122 62 96" />
      <Stroke d="M120 166 C122 140 118 118 122 90" />
      {[[62, 150], [62, 124], [121, 140], [120, 114]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <Leaf x={x} y={y} angle={-60} L={15} w={10} shape="obovate" veins={1} />
          <Leaf x={x} y={y} angle={60} L={15} w={10} shape="obovate" veins={1} />
        </g>
      ))}
      <Stroke fine d="M62 96 C60 84 56 76 50 70 M122 90 C124 78 128 70 134 64 M62 110 C70 100 76 94 84 90" />
      {flower(50, 64)}
      {flower(134, 58)}
      {flower(88, 86)}
    </>
  )
}

function Haldi() {
  return (
    <>
      <Leaf x={80} y={172} angle={-18} L={132} w={34} shape="lance" veins={4} parallel curve={-0.5} />
      <Leaf x={82} y={172} angle={4} L={150} w={36} shape="lance" veins={4} parallel curve={0.3} />
      <Leaf x={84} y={172} angle={24} L={118} w={30} shape="lance" veins={3} parallel curve={0.6} />
      {/* Rhizome, with a cut showing the orange flesh */}
      <g>
        <path className="ink-fill" d="M40 186 C46 172 70 168 92 174 C110 168 128 172 130 182 C126 194 100 194 84 190 C66 196 44 196 40 186Z" fill="rgba(201, 138, 11, 0.35)" />
        <Stroke d="M40 186 C46 172 70 168 92 174 C110 168 128 172 130 182 C126 194 100 194 84 190 C66 196 44 196 40 186Z" />
        <Stroke fine d="M54 178 v12 M70 176 v14 M104 174 v14 M118 176 v12" />
        <path className="ink-fill" d="M132 184 a8 9 0 1 0 0.1 0Z" fill="rgba(227, 140, 20, 0.85)" />
        <Stroke d="M140 176 a8 9 0 1 1 -0.1 0" />
        <Stroke fine d="M130 182 C134 178 136 176 140 176" />
      </g>
    </>
  )
}

function Adrak() {
  const stem = (x0, y0, x1, y1, side) => {
    const out = [<Stroke key="s" d={`M${x0} ${y0} C${x0} ${(y0 + y1) / 2} ${x1} ${(y0 + y1) / 2} ${x1} ${y1}`} />]
    for (let i = 1; i <= 6; i++) {
      const t = i / 7
      const x = x0 + (x1 - x0) * t
      const y = y0 + (y1 - y0) * t
      out.push(<Leaf key={i} x={x} y={y} angle={(i % 2 ? 1 : -1) * 58 * side} L={36 - i * 2.4} w={8} shape="lance" veins={1} />)
    }
    return out
  }
  return (
    <>
      {stem(70, 168, 56, 30, 1)}
      {stem(96, 168, 116, 54, -1)}
      {/* Knobbly rhizome */}
      <path className="ink-fill" d="M28 182 C30 168 50 168 58 172 C62 160 82 158 90 168 C100 160 120 162 122 174 C136 172 144 182 138 190 C124 198 100 192 88 194 C70 200 48 198 34 194 C26 192 26 186 28 182Z" fill="rgba(205, 169, 120, 0.45)" />
      <Stroke d="M28 182 C30 168 50 168 58 172 C62 160 82 158 90 168 C100 160 120 162 122 174 C136 172 144 182 138 190 C124 198 100 192 88 194 C70 200 48 198 34 194 C26 192 26 186 28 182Z" />
      <Stroke fine d="M44 180 q4 6 0 12 M74 172 q4 8 0 18 M108 172 q4 8 0 16 M128 180 q3 5 0 10" />
    </>
  )
}

function Neem() {
  const rachis = 'M30 190 C58 150 92 100 132 26'
  const at = (t) => {
    const p0 = [30, 190], c1 = [58, 150], c2 = [92, 100], p1 = [132, 26]
    const u = 1 - t
    const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0]
    const y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1]
    return [x, y]
  }
  const leaflets = []
  for (let i = 1; i <= 8; i++) {
    const t = 0.12 + i * 0.1
    const [x, y] = at(Math.min(t, 0.96))
    const L = 28 - i * 1.2
    leaflets.push(<Leaf key={`l${i}`} x={x} y={y} angle={-58 + 30} L={L} w={8.5} teeth curve={-1} veins={0} />)
    leaflets.push(<Leaf key={`r${i}`} x={x} y={y} angle={58 + 30} L={L} w={8.5} teeth curve={1} veins={0} />)
  }
  return (
    <>
      <Stroke d={rachis} />
      {leaflets}
      <Leaf x={132} y={26} angle={30} L={20} w={8} teeth veins={0} />
      {/* Drupes */}
      <Stroke fine d="M34 182 C26 176 20 168 18 160 M22 170 C14 168 10 164 8 158" />
      {[[18, 156], [8, 154], [24, 150]].map(([x, y]) => (
        <g key={x}>
          <ellipse className="ink-fill" cx={x} cy={y} rx="3.6" ry="5" fill="rgba(200, 190, 80, 0.55)" />
          <ellipse className="ink-stroke" pathLength="1" cx={x} cy={y} rx="3.6" ry="5" />
        </g>
      ))}
    </>
  )
}

function Mortar() {
  return (
    <>
      <path className="ink-fill" d="M30 120 C30 160 56 178 80 178 C104 178 130 160 130 120Z" fill="rgba(176, 141, 87, 0.35)" />
      <Stroke d="M30 120 C30 160 56 178 80 178 C104 178 130 160 130 120" />
      <ellipse className="ink-stroke" pathLength="1" cx="80" cy="120" rx="50" ry="10" />
      <ellipse className="ink-stroke ink-fine" pathLength="1" cx="80" cy="120" rx="40" ry="6.5" />
      <Stroke d="M64 178 L60 188 H100 L96 178" />
      <Stroke d="M84 116 L120 40 C124 34 132 38 130 44 L94 120" />
      <Stroke fine d="M44 140 C50 156 62 166 76 170" />
      <Leaf x={46} y={112} angle={-40} L={34} w={18} teeth />
      <Leaf x={52} y={112} angle={-10} L={30} w={16} teeth />
      <Stroke d="M46 112 C40 100 34 90 30 74" />
    </>
  )
}

const plates = { tulsi: Tulsi, saunf: Saunf, brahmi: Brahmi, haldi: Haldi, adrak: Adrak, neem: Neem, all: Mortar }

/**
 * herb: tulsi | saunf | brahmi | haldi | adrak | neem | all
 * drawn: render fully inked (no draw-in), for small marks and repeat views
 */
export default function BotanicalPlate({ herb = 'tulsi', size = 160, drawn = false, className = '' }) {
  const Plate = plates[herb] || Tulsi
  return (
    <svg
      className={`plate ${drawn ? 'is-drawn' : ''} ${className}`}
      width={size}
      height={size * 1.25}
      viewBox="0 0 160 200"
      aria-hidden="true"
    >
      <g className="ink">
        <Plate />
      </g>
    </svg>
  )
}

/* A herb plate inside a small round frame: the marker beside conditions */
export function HerbMark({ herb = 'tulsi', size = 44, className = '' }) {
  return (
    <span className={`herb-mark ${className}`} style={{ '--s': `${size}px` }} data-herb={herb} aria-hidden="true">
      <BotanicalPlate herb={herb} size={size * 0.86} drawn />
    </span>
  )
}
