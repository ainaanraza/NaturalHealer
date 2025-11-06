import React from 'react'

export default function DiseaseCard({ item, onClick }){
  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); onClick(); } }} aria-label={`Open remedies for ${item.title}`}>
      <div className="title">{item.title}</div>
      <div className="desc">{item.desc}</div>
      <div className="accentBar" style={{ background: item.color }} />
    </article>
  )
}