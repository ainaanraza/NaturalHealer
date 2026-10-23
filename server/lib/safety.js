// Safety triage runs before any AI call.
//
// emergency  The message describes signs that need urgent medical care. We do not
//            call the AI; we reply with a fixed "seek care now" message.
// caution    The AI may answer, but the reply opens with a doctor notice and the
//            model is told to keep advice conservative.
// none       Normal flow.
//
// Patterns are deliberately broad: a false alarm costs one extra sentence,
// a miss can cost much more.

const EMERGENCY = [
  { id: 'chest', label: 'chest pain or pressure', re: /\b(chest|heart)\b[^.?!]{0,40}\b(pain|pressure|tight(ness)?|squeez\w*|crush\w*|ache|hurts?)\b|\b(pain|pressure|tightness)\b[^.?!]{0,25}\bchest\b|heart attack/i },
  { id: 'breathing', label: 'serious trouble breathing', re: /\b(can'?t|cannot|unable to|struggling to|hard to|difficult(y)? (to )?)\s*breath(e|ing)?\b|\bshort(ness)? of breath\b|\bgasping\b|\bchoking\b|\blips?\b[^.?!]{0,20}\b(blue|purple)\b/i },
  { id: 'stroke', label: 'possible stroke signs', re: /\b(face|mouth)\b[^.?!]{0,20}\bdroop\w*|\bslurred speech\b|\bsudden(ly)?\b[^.?!]{0,30}\b(numb\w*|weak\w*|paraly\w*|confus\w*|can'?t (speak|talk|see|walk))\b|\bstroke\b/i },
  { id: 'consciousness', label: 'fainting, seizure or unresponsiveness', re: /\b(faint(ed|ing)?|passed out|pass(ing)? out|unconscious|unresponsive|won'?t wake|seizure|convuls\w*|fits?\b(?= (?:and|while|after)))/i },
  { id: 'bleeding', label: 'heavy bleeding', re: /\b(heavy|severe|won'?t stop|uncontrolled|a lot of)\b[^.?!]{0,20}\bbleed\w*|\b(vomit\w*|cough\w*|throw\w* up)\b[^.?!]{0,20}\bblood\b|\bblood\b[^.?!]{0,20}\b(vomit|stool|poop)\b|\bblack,? tarry\b/i },
  { id: 'allergy', label: 'severe allergic reaction', re: /\banaphyla\w*|\b(throat|tongue|lips?|face)\b[^.?!]{0,25}\b(swell\w*|swollen|closing)\b/i },
  { id: 'poison', label: 'overdose or poisoning', re: /\b(overdos\w*|poison\w*|swallowed (bleach|pills|chemicals?|kerosene)|took too many (pills|tablets))\b/i },
  { id: 'selfharm', label: 'thoughts of suicide or self-harm', re: /\b(suicid\w*|kill (myself|me)|end (my|it all)\b|want to die|don'?t want to (live|be alive)|self[- ]?harm|hurt(ing)? myself|cut(ting)? myself)\b/i },
  { id: 'infantFever', label: 'fever in a young baby', re: /\b(newborn|new born|infant|\d{1,2}[- ]?(day|week|month)[- ]?old)\b[^.?!]{0,40}\b(fever|temperature)\b|\b(fever|temperature)\b[^.?!]{0,40}\b(newborn|infant|\d{1,2}[- ]?(day|week|month)[- ]?old)\b/i },
  { id: 'headInjury', label: 'head injury or sudden severe headache', re: /\bworst headache\b|\bthunderclap\b|\bhead injury\b|\bhit (my|his|her|their) head\b/i },
]

const CAUTION = [
  { id: 'pregnancy', label: 'pregnancy or breastfeeding', re: /\b(pregnan\w*|expecting a baby|trimester|breast ?feeding|nursing (mother|my baby))\b/i },
  { id: 'child', label: 'a young child', re: /\b(baby|babies|toddler|infant|my (son|daughter|child|kid)|\d{1,2}[- ]?(year|yr)[- ]?old (child|kid|son|daughter|boy|girl))\b/i },
  { id: 'medication', label: 'prescription medicines', re: /\b(medicines?|medication|tablets?|blood thinners?|warfarin|insulin|metformin|chemo\w*|antidepressants?|prescri\w*|steroids?)\b/i },
  { id: 'longFever', label: 'a fever lasting several days', re: /\b(fever|temperature)\b[^.?!]{0,40}\b([3-9]|three|four|five|six|seven|ten|several) (days?|weeks?)\b|\b(high|very high) fever\b|\b10[3-5](\.\d)? ?(°|deg|f)\b/i },
  { id: 'chronic', label: 'a chronic condition', re: /\b(diabet\w*|blood pressure|hypertension|heart (disease|condition)|kidney|liver|thyroid|asthma|cancer|epilep\w*)\b/i },
  { id: 'redFlags', label: 'warning signs that need a check-up', re: /\b(blood in (my )?(urine|stool|pee)|unexplained weight loss|lost weight without|lump|night sweats|jaundice|yellow (skin|eyes))\b/i },
]

export function triage(text = '') {
  const message = String(text)
  const hits = (list) => list.filter(rule => rule.re.test(message))
  const emergency = hits(EMERGENCY)
  if (emergency.length) return { level: 'emergency', categories: emergency.map(r => r.id), labels: emergency.map(r => r.label) }
  const caution = hits(CAUTION)
  if (caution.length) return { level: 'caution', categories: caution.map(r => r.id), labels: caution.map(r => r.label) }
  return { level: 'none', categories: [], labels: [] }
}

// India-first, since that is who the product serves (112 is India's single emergency number,
// Tele-MANAS 14416 is the national mental health helpline)
export function emergencyReply(result) {
  const selfHarm = result.categories.includes('selfharm')
  const lines = [
    `**This sounds like it could need urgent medical care** (${result.labels.join(', ')}). Please don't rely on home remedies for this.`,
    '',
    selfHarm
      ? '- If you are thinking about ending your life or hurting yourself, you are not alone. Call **Tele-MANAS on 14416** (free, 24×7, in Indian languages) or **112** now, and tell someone near you.'
      : '- Call **112** (India) or your local emergency number now, or go to the nearest emergency department.',
    '- If someone is with you, ask them to stay with you until help arrives.',
    selfHarm ? '- If you are outside India, contact your local emergency number or a crisis line.' : '- Do not eat, drink or take any remedy until a doctor has seen you, unless they tell you to.',
    '',
    'Once you are safe and have been checked by a doctor, I am happy to help with gentle support for recovery.',
  ]
  return lines.join('\n')
}

export function cautionNotice(result) {
  return `> **Please check with a doctor too.** Because this involves ${result.labels.join(' and ')}, the guidance below is general and should not replace advice from a qualified clinician.\n\n`
}
