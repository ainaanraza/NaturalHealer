export const diseases = [
  {
    id: 'cold',
    title: 'Common Cold',
    desc: 'Soothe Kapha imbalance with warmth and steam',
    color: 'var(--teal)',
    remedies: [
      'Tulsi + ginger tea with a little honey, 2–3×/day',
      'Steam inhalation (eucalyptus or ajwain seeds)',
      'Warm saline + a pinch of turmeric gargle'
    ]
  },
  {
    id: 'indigestion',
    title: 'Indigestion',
    desc: 'Kindle Agni gently; keep meals warm and simple',
    color: 'var(--orange)',
    remedies: [
      'Jeera + ajwain + saunf tea after meals',
      'Buttermilk with roasted cumin and rock salt',
      'Small, warm meals; avoid cold/raw/heavy foods'
    ]
  },
  {
    id: 'headache',
    title: 'Headache (Tension)',
    desc: 'Relax Vata; release neck–scalp tension',
    color: 'var(--indigo)',
    remedies: [
      'Diluted peppermint oil to temples',
      'Ginger tea; hydrate well',
      'Sesame oil head massage, 10 min'
    ]
  },
  {
    id: 'acne',
    title: 'Acne (Pitta)',
    desc: 'Cool and cleanse gently',
    color: 'var(--pink)',
    remedies: [
      'Neem + turmeric paste; rinse after 10–15 min',
      'Aloe vera gel thin layer; avoid harsh scrubs',
      'Reduce fried/spicy foods; hydrate'
    ]
  },
  {
    id: 'joint',
    title: 'Joint Pain (Vata)',
    desc: 'Warmth, lubrication, gentle mobility',
    color: 'var(--violet)',
    remedies: [
      'Golden milk: turmeric + black pepper in warm milk',
      'Warm castor oil compress on affected joint',
      'Gentle yoga (pawanmuktasana), daily'
    ]
  },
  {
    id: 'insomnia',
    title: 'Insomnia',
    desc: 'Calm Vata and mind before sleep',
    color: 'var(--blue)',
    remedies: [
      'Ashwagandha milk at night (if suitable)',
      'Warm foot bath; dim lights 1 hr before bed',
      '2–3 drops ghee or sesame oil nasya (consult first)'
    ]
  },
  {
    id: 'diabetes',
    title: 'Diabetes Support',
    desc: 'Supportive habits alongside medical care',
    color: 'var(--green)',
    remedies: [
      'Soaked methi (fenugreek) seeds in the morning',
      'Light walks after meals; mindful portions',
      'Work with a clinician for medication/dosing'
    ]
  },
  {
    id: 'hypertension',
    title: 'Hypertension Support',
    desc: 'Calm, breathe, and reduce load',
    color: 'var(--red)',
    remedies: [
      'Arjuna bark tea (consult on suitability)',
      'Slow breathing 4–6/min for 10 min daily',
      'Lower sodium; emphasize fresh, home-cooked food'
    ]
  }
]

export function generateAdvice({ diseaseId, userText }){
  const base = {
    cold: 'Stay warm and hydrated. Steam and herbal teas help loosen congestion. Rest supports recovery.',
    indigestion: 'Favor warm, light meals. Sip cumin-fennel-ajwain tea. Avoid late heavy dinners.',
    headache: 'Ease muscle tension, keep regular meals, hydrate, and reduce screen strain. Gentle neck stretches help.',
    acne: 'Keep it gentle: avoid harsh scrubs, use soothing topicals, and reduce spicy/fried foods.',
    joint: 'Gentle mobility + warmth reduce stiffness. Turmeric with pepper can support comfort.',
    insomnia: 'Consistent sleep times, low light, and warm milk/herbal support can help; avoid screens late.',
    diabetes: 'Pair carbs with protein/fiber. Short walks after meals support glucose control with medical care.',
    hypertension: 'Slow breathing and stress reduction help; maintain a balanced, lower-sodium diet with care team guidance.'
  }

  const tip = base[diseaseId] || 'Adopt balanced routines and consult a practitioner for personalized guidance.'
  const ask = userText?.trim() ? `\n\nYou asked: "${userText.trim()}"` : ''
  return `${tip}${ask ? ask + '\n' : ''}This is educational content, not medical advice.`
}