// The AI now runs on the server (/api/chat), so no model key ships to the browser.
// What remains here is client-side input checking and suggested questions.

export function validateUserInput(input) {
  if (!input || typeof input !== 'string') return false
  if (input.trim().length < 2) return false
  if (input.length > 1000) return false
  return true
}

export function getSuggestedQuestions(diseaseContext) {
  const baseQuestions = [
    'What are the best natural remedies?',
    'Are there any dietary changes I should make?',
    'How long until I see improvement?',
    'Are there any side effects to watch for?',
    'Can I combine these remedies with medication?',
  ]

  if (diseaseContext) {
    return [
      `What causes ${diseaseContext.title}?`,
      `How can I prevent ${diseaseContext.title}?`,
      `What foods should I avoid with ${diseaseContext.title}?`,
      ...baseQuestions.slice(0, 2),
    ]
  }

  return baseQuestions
}
