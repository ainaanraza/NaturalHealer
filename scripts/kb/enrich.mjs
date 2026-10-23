// Builds src/data/knowledge/enrichment.js from openly licensed sources only:
//   - Kew's World Checklist of Vascular Plants (WCVP) via GBIF   CC BY 4.0
//     accepted botanical names, authorship, family, synonyms
//   - Wikidata                                                    CC0
//     item ids and plant names in Indian languages
//
// Run when herbs change: npm run kb:enrich
// The curated entries in herbs.js stay hand-written; this file only adds facts we may reuse.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { herbs } from '../../src/data/knowledge/herbs.js'

const OUT = fileURLToPath(new URL('../../src/data/knowledge/enrichment.js', import.meta.url))
const WCVP = 'f382f0ce-323a-4091-bb9f-add557f3a9a2' // GBIF dataset key for WCVP
const UA = { 'User-Agent': 'NaturalHealerKB/1.0 (knowledge base enrichment; contact via GitHub ainaanraza/NaturalHealer)' }
const LANGS = ['hi', 'sa', 'mr', 'bn', 'gu', 'pa', 'ta', 'te', 'kn', 'ml', 'ur']

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function json(url, init = {}) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, { ...init, headers: { ...UA, ...(init.headers || {}) } })
    if (res.ok) return res.json()
    if (attempt === 3) throw new Error(`${res.status} ${res.statusText} for ${url}`)
    await sleep(1000 * attempt)
  }
}

// First Latin binomial in the field ("Phyllanthus emblica, Terminalia chebula" -> first)
const binomial = (latin) => (latin || '').split(',')[0].trim().split(/\s+/).slice(0, 2).join(' ')

async function wcvp(name) {
  const search = await json(`https://api.gbif.org/v1/species/search?datasetKey=${WCVP}&q=${encodeURIComponent(name)}&limit=20`)
  // Prefer the accepted record: one name can label different taxa (Aloe vera L. vs Aloe vera (L.) Burm.f.)
  const same = search.results.filter(r => r.canonicalName === name && r.rank === 'SPECIES')
  const hit = same.find(r => r.taxonomicStatus === 'ACCEPTED') || same[0] || search.results.find(r => r.canonicalName === name)
  if (!hit) return null
  const acceptedKey = hit.taxonomicStatus === 'ACCEPTED' ? hit.key : hit.acceptedKey
  const accepted = acceptedKey === hit.key ? hit : await json(`https://api.gbif.org/v1/species/${acceptedKey}`)
  const syn = await json(`https://api.gbif.org/v1/species/${acceptedKey}/synonyms?limit=50`)
  return {
    matchedName: hit.scientificName,
    matchedStatus: hit.taxonomicStatus,
    acceptedName: accepted.canonicalName,
    acceptedWithAuthor: accepted.scientificName,
    family: accepted.family || null,
    gbifKey: acceptedKey,
    synonyms: [...new Set(syn.results.filter(s => s.rank === 'SPECIES').map(s => s.canonicalName))].slice(0, 15),
  }
}

async function wikidata(names) {
  const values = names.map(n => `"${n.replace(/"/g, '')}"`).join(' ')
  const query = `SELECT ?item ?name ?lang ?label WHERE {
    VALUES ?name { ${values} }
    ?item wdt:P225 ?name .
    OPTIONAL { ?item rdfs:label ?label . BIND(LANG(?label) AS ?lang) FILTER(?lang IN (${LANGS.map(l => `"${l}"`).join(',')})) }
  }`
  const data = await json(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, { headers: { Accept: 'application/sparql-results+json' } })
  const out = {}
  for (const b of data.results.bindings) {
    const name = b.name.value
    out[name] ||= { qid: b.item.value.split('/').pop(), labels: {} }
    // Indian-language labels written only in Latin letters are usually mistakes ("Aloe Verra")
    if (b.lang && b.label && /[^\u0000-\u024f]/.test(b.label.value)) out[name].labels[b.lang.value] = b.label.value
  }
  return out
}

const plants = herbs.filter(h => h.latin && h.kind !== 'formulation')
console.log(`Enriching ${plants.length} plant entries…`)

const result = {}
for (const h of plants) {
  const name = binomial(h.latin)
  try {
    result[h.id] = { query: name, botanical: await wcvp(name) }
    const b = result[h.id].botanical
    console.log(`  ${h.id.padEnd(12)} ${name.padEnd(28)} ${b ? `${b.matchedStatus}${b.matchedStatus !== 'ACCEPTED' ? ` -> ${b.acceptedName}` : ''}` : 'NOT FOUND in WCVP'}`)
  } catch (err) {
    console.log(`  ${h.id}: WCVP lookup failed (${err.message})`)
    result[h.id] = { query: name, botanical: null }
  }
  await sleep(150)
}

// Wikidata: look up by accepted name and by the name we use, in one query
const lookupNames = [...new Set(Object.values(result).flatMap(r => [r.query, r.botanical?.acceptedName]).filter(Boolean))]
const wd = await wikidata(lookupNames)
for (const [id, r] of Object.entries(result)) {
  r.wikidata = wd[r.botanical?.acceptedName] || wd[r.query] || null
  if (!r.wikidata) console.log(`  ${id}: no Wikidata item found`)
}

const file = {
  generatedAt: new Date().toISOString().slice(0, 10),
  attribution: {
    wcvp: 'The World Checklist of Vascular Plants (WCVP), Royal Botanic Gardens, Kew, via GBIF.org. Licence: CC BY 4.0.',
    wikidata: 'Wikidata. Licence: CC0 1.0 (public domain).',
  },
  herbs: result,
}
const header = [
  '// Generated by scripts/kb/enrich.mjs. Do not edit by hand; rerun npm run kb:enrich.',
  `// ${file.attribution.wcvp}`,
  `// ${file.attribution.wikidata}`,
].join('\n')
writeFileSync(OUT, `${header}\nexport default ${JSON.stringify(file, null, 2)}\n`)
console.log(`\nWrote ${OUT}`)
