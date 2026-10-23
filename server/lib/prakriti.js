// Prakriti (constitution) self-assessment. Questions follow the traits classically used
// to describe each dosha. The result is a self-assessment for personalising tips, not a
// diagnosis; an Ayurvedic practitioner assesses prakriti in person.

export const QUESTIONS = [
  { id: 'frame', prompt: 'Your body frame', options: {
    vata: 'Slim and light; I find it hard to gain weight',
    pitta: 'Medium and muscular; my weight stays fairly stable',
    kapha: 'Broad and solid; I gain weight easily',
  } },
  { id: 'skin', prompt: 'Your skin, most of the time', options: {
    vata: 'Dry, rough or cool to touch',
    pitta: 'Warm and sensitive; prone to redness, rashes or acne',
    kapha: 'Thick, smooth and moist',
  } },
  { id: 'hair', prompt: 'Your hair', options: {
    vata: 'Dry, frizzy or thin',
    pitta: 'Fine and soft; early greying or thinning runs in my family',
    kapha: 'Thick, wavy and glossy',
  } },
  { id: 'appetite', prompt: 'Your appetite', options: {
    vata: 'Irregular; some days I forget to eat',
    pitta: 'Strong; I get irritable if a meal is late',
    kapha: 'Steady but modest; I can skip a meal without trouble',
  } },
  { id: 'digestion', prompt: 'Your digestion', options: {
    vata: 'Variable, with gas, bloating or constipation',
    pitta: 'Quick, with a tendency to acidity or loose stools',
    kapha: 'Slow; I feel heavy after meals',
  } },
  { id: 'sleep', prompt: 'Your sleep', options: {
    vata: 'Light and easily disturbed; I wake during the night',
    pitta: 'Moderate and sound, though I can wake up feeling warm',
    kapha: 'Deep and long; I find it hard to get up',
  } },
  { id: 'climate', prompt: 'The weather you find hardest', options: {
    vata: 'Cold, dry and windy; my hands and feet get cold',
    pitta: 'Hot and humid; I sweat easily',
    kapha: 'Cold and damp; I feel sluggish',
  } },
  { id: 'energy', prompt: 'Your energy through the day', options: {
    vata: 'Comes in bursts, then I tire quickly',
    pitta: 'Intense and driven',
    kapha: 'Slow to start, then steady with good stamina',
  } },
  { id: 'mind', prompt: 'How your mind works', options: {
    vata: 'Quick and restless, full of ideas',
    pitta: 'Sharp, focused and analytical',
    kapha: 'Calm, steady and methodical',
  } },
  { id: 'stress', prompt: 'Under stress, you tend to become', options: {
    vata: 'Anxious or worried',
    pitta: 'Irritable or impatient',
    kapha: 'Withdrawn or sluggish',
  } },
  { id: 'memory', prompt: 'Your memory', options: {
    vata: 'I learn quickly but forget quickly',
    pitta: 'Sharp and clear',
    kapha: 'I learn slowly but rarely forget',
  } },
  { id: 'speech', prompt: 'The way you speak', options: {
    vata: 'Fast and talkative',
    pitta: 'Precise and persuasive',
    kapha: 'Slow, calm and soft',
  } },
]

const DOSHAS = ['vata', 'pitta', 'kapha']
const NAME = { vata: 'Vata', pitta: 'Pitta', kapha: 'Kapha' }

export const GUIDANCE = {
  vata: 'Favour warm, cooked, slightly oily meals at regular times, a steady daily routine, early nights, and a warm sesame oil massage (abhyanga) before bathing.',
  pitta: 'Favour cooling foods such as cucumber, coconut water and sweet fruit, go easy on chilli, sour and fried food, avoid the midday heat, and do not skip meals.',
  kapha: 'Favour light, warm, spiced meals, keep active every day, avoid heavy, oily and very sweet food, and skip daytime naps.',
}

// Public shape of the questionnaire for the client
export function questionnaire() {
  return QUESTIONS.map(q => ({ id: q.id, prompt: q.prompt, options: DOSHAS.map(d => ({ value: d, label: q.options[d] })) }))
}

/**
 * answers: { [questionId]: 'vata' | 'pitta' | 'kapha' }
 * Returns { scores: {vata, pitta, kapha} in whole percent summing to 100, dominant, secondary, label, answers }
 */
export function scorePrakriti(answers) {
  if (!answers || typeof answers !== 'object') throw new Error('Answers are required.')
  const counts = { vata: 0, pitta: 0, kapha: 0 }
  const clean = {}
  for (const q of QUESTIONS) {
    const a = answers[q.id]
    if (!DOSHAS.includes(a)) throw new Error(`Answer every question (missing: ${q.prompt.toLowerCase()}).`)
    counts[a] += 1
    clean[q.id] = a
  }

  // Largest-remainder rounding so the three percentages always add up to 100
  const total = QUESTIONS.length
  const raw = DOSHAS.map(d => ({ d, exact: (counts[d] / total) * 100 }))
  raw.forEach(r => { r.floor = Math.floor(r.exact) })
  let left = 100 - raw.reduce((s, r) => s + r.floor, 0)
  ;[...raw].sort((a, b) => (b.exact - b.floor) - (a.exact - a.floor)).forEach(r => { if (left > 0) { r.floor += 1; left -= 1 } })
  const scores = Object.fromEntries(raw.map(r => [r.d, r.floor]))

  const ranked = [...DOSHAS].sort((a, b) => scores[b] - scores[a])
  const [first, second, third] = ranked
  let label
  let secondary = null
  if (scores[first] - scores[third] <= 10) {
    label = 'Tridoshic (balanced)'
  } else if (scores[first] - scores[second] <= 10) {
    secondary = second
    label = `${NAME[first]}-${NAME[second]}`
  } else {
    label = NAME[first]
  }

  return { scores, dominant: first, secondary, label, answers: clean }
}
