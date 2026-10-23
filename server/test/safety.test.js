import { test } from 'node:test'
import assert from 'node:assert/strict'
import { triage, emergencyReply } from '../lib/safety.js'

const level = (text) => triage(text).level

test('emergency signs skip the AI', () => {
  for (const text of [
    'I have crushing chest pain going down my left arm',
    'my father has pressure in his chest and is sweating',
    "I can't breathe properly since an hour",
    'her face is drooping and she has slurred speech',
    'my son fainted twice today',
    'I am vomiting blood',
    'my throat is swelling after eating peanuts',
    'I took too many pills',
    'I want to die, nothing helps',
    'my 3 week old baby has a fever',
    'this is the worst headache of my life',
  ]) {
    assert.equal(level(text), 'emergency', text)
  }
})

test('caution cases still get an answer, with a doctor notice', () => {
  for (const text of [
    'Is ajwain water safe while pregnant?',
    'can I give tulsi tea to my toddler',
    'I take metformin, can I have karela juice?',
    'fever for 4 days, what should I do',
    'remedies for acidity with high blood pressure',
  ]) {
    assert.equal(level(text), 'caution', text)
  }
})

test('everyday questions pass straight through', () => {
  for (const text of [
    'What helps a tension headache naturally?',
    'How do I make jeera water for bloating?',
    'Which foods support immunity in winter?',
    'How can I calm my mind before sleep?',
    'I have a mild cold and a runny nose',
  ]) {
    assert.equal(level(text), 'none', text)
  }
})

test('self-harm replies point to Tele-MANAS', () => {
  const reply = emergencyReply(triage('I keep thinking about suicide'))
  assert.match(reply, /14416/)
  assert.match(reply, /112/)
})
