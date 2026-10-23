import { test } from 'node:test'
import assert from 'node:assert/strict'
import { QUESTIONS, scorePrakriti, questionnaire } from '../lib/prakriti.js'

const all = (dosha) => Object.fromEntries(QUESTIONS.map(q => [q.id, dosha]))
const mix = (pattern) => Object.fromEntries(QUESTIONS.map((q, i) => [q.id, pattern[i % pattern.length]]))

test('a single dominant dosha', () => {
  const r = scorePrakriti(all('pitta'))
  assert.deepEqual(r.scores, { vata: 0, pitta: 100, kapha: 0 })
  assert.equal(r.dominant, 'pitta')
  assert.equal(r.label, 'Pitta')
})

test('scores always add up to 100', () => {
  for (const pattern of [['vata', 'pitta', 'kapha'], ['vata', 'vata', 'kapha'], ['kapha', 'pitta', 'pitta', 'vata', 'kapha']]) {
    const { scores } = scorePrakriti(mix(pattern))
    assert.equal(scores.vata + scores.pitta + scores.kapha, 100)
  }
})

test('close first and second give a dual type', () => {
  // 5 vata, 5 pitta, 2 kapha
  const answers = mix(['vata', 'pitta', 'vata', 'pitta', 'vata', 'pitta', 'vata', 'pitta', 'vata', 'pitta', 'kapha', 'kapha'])
  const r = scorePrakriti(answers)
  assert.equal(r.label.includes('-'), true)
  assert.ok(['vata', 'pitta'].includes(r.dominant))
})

test('an even spread is tridoshic', () => {
  const r = scorePrakriti(mix(['vata', 'pitta', 'kapha']))
  assert.equal(r.label, 'Tridoshic (balanced)')
})

test('missing or invalid answers are rejected', () => {
  const partial = all('vata')
  delete partial.sleep
  assert.throws(() => scorePrakriti(partial), /Answer every question/)
  assert.throws(() => scorePrakriti({ ...all('vata'), frame: 'fire' }), /Answer every question/)
})

test('the public questionnaire has three options per question', () => {
  for (const q of questionnaire()) assert.equal(q.options.length, 3)
})
