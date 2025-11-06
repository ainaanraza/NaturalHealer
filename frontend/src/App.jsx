import React, { useState, useMemo } from 'react'
import DiseaseCard from './components/DiseaseCard.jsx'
import AssistantPanel from './components/AssistantPanel.jsx'
import { diseases } from './data.js'

export default function App(){
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  function openDisease(d){ setSelected(d); setOpen(true) }
  function close(){ setOpen(false); setTimeout(()=> setSelected(null), 180) }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return diseases
    return diseases.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <>
      <div className="topnav" role="navigation" aria-label="Main">
        <div className="navInner">
          <div className="navLeft">
            <span className="logo">Natural Healer</span>
          </div>
          <div className="navRight">
            <a className="navLink" href="#" aria-label="Home">Home</a>
            <a className="navLink" href="#" aria-label="Profile">Profile</a>
            <button className="navLink danger" onClick={()=> alert('Logged out')} aria-label="Logout">Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        <header>
          <div>
            <h1>Natural Healer</h1>
            <div className="subtitle">Click a card to view remedies and chat with the assistant</div>
          </div>
          <span className="badge">React · Responsive · Minimal</span>
        </header>

        <div className="searchRow">
          <input
            className="searchInput"
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            placeholder="Search diseases…"
            aria-label="Search diseases"
          />
          <span className="pill">{filtered.length} result{filtered.length===1?'':'s'}</span>
        </div>

        <section className="grid" aria-label="Disease cards">
          {filtered.map(d => (
            <DiseaseCard key={d.id} item={d} onClick={() => openDisease(d)} />
          ))}
        </section>

        {open && selected && (
          <div className="overlay" role="dialog" aria-modal="true" aria-label={`${selected.title} details`}>
            <div className="drawer">
              <div className="drawerHeader">
                <div style={{display:'flex',flexDirection:'column',gap:4}}>
                  <div style={{fontWeight:700, fontSize:18}}>{selected.title}</div>
                  <div className="subtitle">{selected.desc}</div>
                </div>
                <button className="close" onClick={close} aria-label="Close">Close</button>
              </div>

              <div className="drawerBody">
                <section>
                  <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                    <span className="chip" style={{borderColor: selected.color, color: selected.color}}>Ayurveda</span>
                    <span className="chip">Remedies</span>
                  </div>
                  <ul className="remedies">
                    {selected.remedies.map((r,i)=> <li key={i}>{r}</li>)}
                  </ul>
                </section>

                <section>
                  <AssistantPanel disease={selected} />
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}