import React, { useId } from 'react'
import '../styles/Vaidya.css'

// Vanya, the vaidya who voices the AI guide: an adult anime figure at her work
// table with a brass khal-batta, a bowl of haldi and a glass flask. Motion is
// limited to breathing, blinking and a slow drift in the braid.

const SKIN = '#F6D5B8'
const SKIN_SHADE = '#E7B994'
const HAIR = '#1F1614'
const HAIR_HI = '#4A3A34'
const LINE = '#24160F'
const KURTA = '#2F5D45'
const KURTA_SHADE = '#264D39'
const BRASS = '#B08D57'

function Eye({ irisId, clipId }) {
  return (
    <g className="vaidya-eye">
      <defs>
        <clipPath id={clipId}>
          <path d="M164 125 Q170 114 181 114 Q190 115 194 123 Q186 131 177 131 Q169 131 164 125Z" />
        </clipPath>
      </defs>
      <path d="M164 125 Q170 114 181 114 Q190 115 194 123 Q186 131 177 131 Q169 131 164 125Z" fill="#FFFDF8" />
      <g clipPath={`url(#${clipId})`}>
        <circle cx="180" cy="123" r="8.8" fill={`url(#${irisId})`} />
        <circle cx="180" cy="123.6" r="3.8" fill="#140B07" />
        <circle cx="176.8" cy="119.8" r="2.4" fill="#fff" />
        <circle cx="183" cy="126.4" r="0.9" fill="#fff" opacity="0.9" />
        <path d="M164 118 Q178 112 195 120 L195 116 L164 114Z" fill="#000" opacity="0.12" />
      </g>
      <path d="M166 116.5 Q178 108.5 192 115" stroke="#B98066" strokeWidth="0.9" fill="none" opacity="0.7" />
      <path d="M162 124.5 Q168 111 181 112 Q191 113 196 122" stroke={LINE} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M162.5 124 L158 120.5" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
      <path d="M168 130.5 Q178 133.5 190 128.5" stroke="#8A5A40" strokeWidth="0.9" fill="none" opacity="0.55" />
    </g>
  )
}

/**
 * crop: 'full' shows her at the table; 'portrait' frames the face for avatars.
 */
export default function Vaidya({ size = 360, crop = 'full', still = false, className = '', title }) {
  const uid = useId().replace(/:/g, '')
  const ids = {
    iris: `vi-${uid}`, clipL: `vcl-${uid}`, clipR: `vcr-${uid}`,
    brass: `vb-${uid}`, kurta: `vk-${uid}`, glass: `vg-${uid}`, wood: `vw-${uid}`,
  }
  const portrait = crop === 'portrait'
  const viewBox = portrait ? '138 48 124 124' : '0 20 400 500'
  const height = portrait ? size : size * 1.25

  return (
    <svg
      className={`vaidya ${portrait ? 'is-portrait' : ''} ${still ? 'is-still' : ''} ${className}`}
      width={size}
      height={height}
      viewBox={viewBox}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <defs>
        <linearGradient id={ids.iris} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A170D" />
          <stop offset="0.6" stopColor="#6B4126" />
          <stop offset="1" stopColor="#B4824F" />
        </linearGradient>
        <linearGradient id={ids.brass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6CB86" />
          <stop offset="0.45" stopColor={BRASS} />
          <stop offset="1" stopColor="#6E5326" />
        </linearGradient>
        <linearGradient id={ids.kurta} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#36694F" />
          <stop offset="1" stopColor={KURTA_SHADE} />
        </linearGradient>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E8F2EF" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#CFE0DB" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={ids.wood} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A5636" />
          <stop offset="1" stopColor="#5A3D24" />
        </linearGradient>
      </defs>

      <g className="vaidya-breath">
        {/* Hair behind the head */}
        <path transform="translate(0 8)" d="M150 120 C144 64 172 38 202 38 C234 38 258 64 252 122 C250 150 246 172 240 190 C232 200 222 204 214 206 L186 206 C176 204 166 198 160 188 C154 170 150 148 150 120Z" fill={HAIR} />

        {/* Kurta, sleeves, neckline */}
        <path d="M100 440 C104 380 112 330 128 290 L150 310 C146 340 142 390 140 440Z" fill={KURTA_SHADE} />
        <path d="M300 440 C296 380 288 330 272 290 L250 310 C254 340 258 390 260 440Z" fill={KURTA_SHADE} />
        <path d="M112 520 C110 430 112 330 128 290 C138 266 160 252 186 244 L214 244 C240 252 262 266 272 290 C288 330 290 430 288 520Z" fill={`url(#${ids.kurta})`} />
        <path d="M150 310 C148 360 146 410 146 460 M250 310 C252 360 254 410 254 460" stroke="#1F4030" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Neck */}
        <path d="M182 192 L181 240 C190 247 210 247 219 240 L218 192Z" fill={SKIN_SHADE} />
        <path d="M187 243 L200 280 L213 243Z" fill={SKIN_SHADE} />
        <path d="M185 243 L200 281 L215 243" stroke={BRASS} strokeWidth="3" fill="none" strokeLinejoin="round" />
        <path d="M184 247 Q200 264 216 247" stroke="#C9A25A" strokeWidth="1.4" fill="none" />
        <circle cx="200" cy="262" r="2.8" fill="#C9A25A" />

        {/* Dupatta draped across from her right shoulder */}
        <path d="M126 286 C150 262 172 252 186 248 C196 300 236 380 288 446 L288 490 C226 420 176 350 146 300 C140 296 132 292 126 286Z" fill="#F3EAD6" />
        <path d="M146 300 C176 350 226 420 288 490" stroke={BRASS} strokeWidth="2.4" fill="none" />
        <path d="M160 290 C190 340 228 392 270 440 M176 276 C200 320 230 364 262 404" stroke="#C8B894" strokeWidth="1" fill="none" opacity="0.7" />

        {/* Braid over her left shoulder, drifting slightly */}
        <g className="vaidya-braid">
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse key={i} cx={238 + Math.sin(i * 0.5) * 6} cy={204 + i * 21} rx={11 - i * 0.5} ry="13" fill={i % 2 ? '#2B201C' : HAIR} transform={`rotate(${i % 2 ? 18 : -18} ${238 + Math.sin(i * 0.5) * 6} ${204 + i * 21})`} />
          ))}
          <path d="M240 392 l-4 14 M240 392 l0 16 M240 392 l4 14" stroke="#C9A25A" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="240" cy="391" r="3.4" fill="#9E2B20" />
        </g>

        <g transform="translate(0 8)">
        {/* Face */}
        <path d="M154 112 C154 74 176 56 200 56 C224 56 246 74 246 112 C246 140 239 162 227 178 C217 191 208 199 200 199 C192 199 183 191 173 178 C161 162 154 140 154 112Z" fill={SKIN} />
        <path d="M157 140 C164 164 180 190 200 199 C186 192 172 176 165 156Z" fill={SKIN_SHADE} opacity="0.45" />
        <ellipse cx="244" cy="130" rx="5.5" ry="11" fill={SKIN_SHADE} />
        {/* Jhumka earring */}
        <g className="vaidya-earring">
          <path d="M245 142 v6" stroke="#C9A25A" strokeWidth="1.2" />
          <path d="M239 156 Q245 146 251 156Z" fill="#C9A25A" />
          <circle cx="242" cy="159" r="1.2" fill="#C9A25A" /><circle cx="245" cy="160" r="1.2" fill="#C9A25A" /><circle cx="248" cy="159" r="1.2" fill="#C9A25A" />
        </g>

        <path d="M166 104 Q178 97 191 102" stroke="#2A1C16" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M209 102 Q222 97 234 104" stroke="#2A1C16" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        <g className="vaidya-blink">
          <Eye irisId={ids.iris} clipId={ids.clipL} />
          <g transform="translate(400 0) scale(-1 1)">
            <Eye irisId={ids.iris} clipId={ids.clipR} />
          </g>
        </g>

        <path d="M199.5 140 Q196.5 152 199 156 Q202 157.5 204.5 155" stroke="#C9906E" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <ellipse cx="171" cy="150" rx="10" ry="5" fill="#F2A5A0" opacity="0.28" />
        <ellipse cx="229" cy="150" rx="10" ry="5" fill="#F2A5A0" opacity="0.28" />
        <path d="M192 174 Q200 180 208 174 Q200 177 192 174Z" fill="#D98A7A" />
        <path d="M189 171.5 Q194 175 200 175 Q206 175 211 171.5" stroke="#A85A4A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="200" cy="96" r="2.5" fill="#B3261E" />

        {/* Front hair: centre parting, a loose strand by the cheek */}
        <path d="M200 50 C182 48 164 60 157 86 C153 104 154 124 157 146 C159 158 162 170 166 180 C163 160 165 132 171 110 C177 88 188 68 200 56Z" fill={HAIR} />
        <path d="M200 50 C218 48 237 60 243 86 C246 102 246 116 244 128 C240 112 234 98 226 86 C218 72 208 62 200 56Z" fill={HAIR} />
        <path d="M200 44 L200 57" stroke="#3A2C26" strokeWidth="1.2" />
        <path d="M200 46 L200 54" stroke="#B3261E" strokeWidth="1.6" opacity="0.8" />
        <path d="M172 70 Q184 58 197 56" stroke={HAIR_HI} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M218 58 Q230 62 238 74" stroke={HAIR_HI} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.55" />
        <path className="vaidya-strand" d="M163 112 C157 142 159 172 168 200" stroke={HAIR} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {!portrait && (
        <g className="vaidya-table">
          {/* Hands resting on the table */}
          <ellipse cx="150" cy="444" rx="18" ry="9" fill={SKIN} />
          <path d="M138 446 h22 M140 450 h18" stroke={SKIN_SHADE} strokeWidth="1" />
          <ellipse cx="262" cy="444" rx="18" ry="9" fill={SKIN} />
          <path d="M252 446 h22 M254 450 h18" stroke={SKIN_SHADE} strokeWidth="1" />
          <circle cx="150" cy="436" r="0" />
          {/* Gold bangles */}
          <ellipse cx="146" cy="436" rx="10" ry="3" fill="none" stroke="#C9A25A" strokeWidth="1.6" />
          <ellipse cx="266" cy="436" rx="10" ry="3" fill="none" stroke="#C9A25A" strokeWidth="1.6" />

          <rect x="20" y="448" width="360" height="12" rx="2" fill="#8A6440" />
          <rect x="20" y="460" width="360" height="60" fill={`url(#${ids.wood})`} />
          <path d="M40 478 C120 474 200 482 360 476 M30 498 C140 494 240 502 370 496" stroke="#4A3220" strokeWidth="1" fill="none" opacity="0.6" />

          {/* Clay bowl of haldi */}
          <path d="M58 432 Q86 462 114 432Z" fill="#B5612E" />
          <path d="M62 432 Q86 416 110 432Z" fill="#E3A31A" />
          <path d="M70 428 Q86 420 100 426" stroke="#F6C752" strokeWidth="1.4" fill="none" />
          <path d="M80 448 h12" stroke="#8A4520" strokeWidth="6" strokeLinecap="round" />

          {/* Glass flask: tradition, examined */}
          <g className="vaidya-flask">
            <path d="M193 372 h14 v20 l18 44 q2 8 -6 8 h-38 q-8 0 -6 -8 l18 -44Z" fill={`url(#${ids.glass})`} stroke="#9FB7B0" strokeWidth="1.4" />
            <path d="M184 418 h32 l7 18 q2 8 -6 8 h-38 q-8 0 -6 -8Z" fill="#6E9E5A" opacity="0.75" />
            <rect x="191" y="368" width="18" height="5" rx="2" fill="#9FB7B0" />
            <circle className="bubble b1" cx="196" cy="432" r="1.6" fill="#E6F2DD" />
            <circle className="bubble b2" cx="204" cy="436" r="1.2" fill="#E6F2DD" />
            <circle className="bubble b3" cx="200" cy="430" r="1" fill="#E6F2DD" />
            <path d="M188 400 l-4 10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          </g>

          {/* Tulsi sprig on the table */}
          <path d="M214 446 C226 440 236 438 246 440" stroke="#3F6B35" strokeWidth="1.4" fill="none" />
          <path d="M226 441 C222 432 226 426 234 426 C234 434 230 440 226 441Z" fill="#5E8C4A" />
          <path d="M236 439 C238 430 244 428 250 432 C246 438 242 440 236 439Z" fill="#4C7A3C" />

          {/* Brass khal-batta */}
          <path d="M318 400 L346 346" stroke={`url(#${ids.brass})`} strokeWidth="10" strokeLinecap="round" />
          <path d="M318 400 L346 346" stroke="#F1DDA6" strokeWidth="2" strokeLinecap="round" opacity="0.5" transform="translate(-2 0)" />
          <path d="M282 410 C282 436 300 448 322 448 C344 448 362 436 362 410Z" fill={`url(#${ids.brass})`} />
          <ellipse cx="322" cy="410" rx="40" ry="8" fill="#D9B970" />
          <ellipse cx="322" cy="410" rx="32" ry="5.5" fill="#6E4E2A" />
          <path d="M308 448 L304 452 H340 L336 448Z" fill="#8A6A2E" />
          <path d="M292 420 C296 432 306 440 318 442" stroke="#F1DDA6" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

/* A round portrait of Vanya, for chat avatars and small marks */
export function VaidyaAvatar({ size = 40, className = '' }) {
  return (
    <span className={`vaidya-avatar ${className}`} style={{ '--s': `${size}px` }} aria-hidden="true">
      <Vaidya crop="portrait" size={size} />
    </span>
  )
}
