// Enhanced disease data with categories and more details
export const diseases = [
  {
    id: 'cold',
    title: 'Common Cold',
    category: 'respiratory',
    desc: 'Soothe Kapha imbalance with warmth and steam',
    severity: 'mild',
    icon: '🌬️',
    remedies: [
      'Tulsi (Holy Basil) + ginger tea with honey, 2-3 times daily',
      'Steam inhalation with eucalyptus or ajwain seeds',
      'Warm saline gargle with a pinch of turmeric',
      'Rest in a warm, well-ventilated room',
      'Avoid cold drinks and dairy products'
    ],
    prevention: [
      'Maintain good hand hygiene',
      'Stay warm in cold weather',
      'Boost immunity with regular Chyawanprash'
    ],
    duration: '3-7 days',
    doshas: ['kapha']
  },
  {
    id: 'indigestion',
    title: 'Indigestion',
    category: 'digestive',
    desc: 'Kindle Agni gently with warming spices',
    severity: 'mild',
    icon: '🍃',
    remedies: [
      'Jeera (cumin) + ajwain + saunf (fennel) tea after meals',
      'Buttermilk with roasted cumin powder and rock salt',
      'Small, warm, easily digestible meals',
      'Avoid cold, raw, and heavy foods',
      'Take a short walk after meals'
    ],
    prevention: [
      'Eat at regular times',
      'Avoid overeating',
      'Chew food thoroughly'
    ],
    duration: '1-3 days',
    doshas: ['pitta', 'kapha']
  },
  {
    id: 'headache',
    title: 'Tension Headache',
    category: 'mental',
    desc: 'Relax Vata and release tension',
    severity: 'mild',
    icon: '🧘',
    remedies: [
      'Apply diluted peppermint or lavender oil to temples',
      'Drink ginger tea and stay well-hydrated',
      'Gentle head and neck massage with warm sesame oil',
      'Practice deep breathing exercises',
      'Rest in a quiet, dimly lit room'
    ],
    prevention: [
      'Maintain regular sleep schedule',
      'Take regular breaks from screens',
      'Practice stress management'
    ],
    duration: '2-6 hours',
    doshas: ['vata']
  },
  {
    id: 'acne',
    title: 'Acne (Pitta)',
    category: 'skin',
    desc: 'Cool and cleanse gently for clear skin',
    severity: 'mild',
    icon: '✨',
    remedies: [
      'Neem + turmeric paste, rinse after 10-15 minutes',
      'Apply thin layer of pure aloe vera gel',
      'Avoid harsh scrubs and over-washing',
      'Reduce intake of fried and spicy foods',
      'Drink plenty of water throughout the day'
    ],
    prevention: [
      'Gentle cleansing routine',
      'Avoid touching face',
      'Use non-comedogenic products'
    ],
    duration: 'Varies',
    doshas: ['pitta']
  },
  {
    id: 'joint',
    title: 'Joint Pain (Vata)',
    category: 'musculoskeletal',
    desc: 'Warmth, lubrication, and gentle mobility',
    severity: 'moderate',
    icon: '🦴',
    remedies: [
      'Golden milk: turmeric + black pepper in warm milk',
      'Warm castor oil compress on affected joints',
      'Gentle yoga poses (Pawanmuktasana) daily',
      'Abhyanga (oil massage) with warm sesame oil',
      'Stay warm and avoid cold, damp environments'
    ],
    prevention: [
      'Regular gentle exercise',
      'Maintain healthy weight',
      'Stay warm in cold weather'
    ],
    duration: 'Ongoing',
    doshas: ['vata']
  },
  {
    id: 'insomnia',
    title: 'Insomnia',
    category: 'mental',
    desc: 'Calm Vata and mind for restful sleep',
    severity: 'moderate',
    icon: '🌙',
    remedies: [
      'Ashwagandha milk before bedtime (consult practitioner)',
      'Warm foot bath with essential oils',
      'Dim lights 1 hour before sleep',
      'Gentle yoga nidra or meditation',
      'Maintain consistent sleep schedule'
    ],
    prevention: [
      'Avoid screens before bed',
      'Create calming bedtime routine',
      'Keep bedroom cool and dark'
    ],
    duration: 'Varies',
    doshas: ['vata']
  },
  {
    id: 'anxiety',
    title: 'Anxiety & Stress',
    category: 'mental',
    desc: 'Balance nervous system with herbs and practices',
    severity: 'moderate',
    icon: '🧠',
    remedies: [
      'Brahmi tea or supplement (consult practitioner)',
      'Practice Pranayama (breathwork) - especially Nadi Shodhana',
      'Warm oil massage (Abhyanga) before shower',
      'Meditation and mindfulness practices',
      'Reduce caffeine and stimulants'
    ],
    prevention: [
      'Regular meditation practice',
      'Adequate sleep',
      'Balanced lifestyle'
    ],
    duration: 'Ongoing',
    doshas: ['vata', 'pitta']
  },
  {
    id: 'constipation',
    title: 'Constipation',
    category: 'digestive',
    desc: 'Encourage regular elimination with gentle support',
    severity: 'mild',
    icon: '🌾',
    remedies: [
      'Triphala powder in warm water before bed',
      'Warm water with lemon in the morning',
      'Include fiber-rich foods and healthy fats',
      'Gentle abdominal massage in clockwise direction',
      'Regular physical activity'
    ],
    prevention: [
      'Stay hydrated',
      'Eat fiber-rich diet',
      'Establish regular bathroom routine'
    ],
    duration: '1-3 days',
    doshas: ['vata']
  },
  {
    id: 'diabetes',
    title: 'Diabetes Support',
    category: 'chronic',
    desc: 'Supportive habits alongside medical care',
    severity: 'serious',
    icon: '💊',
    remedies: [
      'Soaked methi (fenugreek) seeds in the morning',
      'Light walks after meals for blood sugar control',
      'Bitter melon (karela) juice in moderation',
      'Cinnamon tea between meals',
      'Work closely with healthcare provider for medication'
    ],
    prevention: [
      'Maintain healthy weight',
      'Regular exercise',
      'Balanced, low-glycemic diet'
    ],
    duration: 'Ongoing management',
    doshas: ['kapha']
  },
  {
    id: 'hypertension',
    title: 'High Blood Pressure',
    category: 'chronic',
    desc: 'Calm, breathe, and reduce stress',
    severity: 'serious',
    icon: '❤️',
    remedies: [
      'Arjuna bark tea (consult on suitability)',
      'Slow deep breathing exercises (4-6 breaths/min) for 10 min daily',
      'Reduce sodium intake significantly',
      'Emphasize fresh, home-cooked, whole foods',
      'Regular monitoring with healthcare provider'
    ],
    prevention: [
      'Regular exercise',
      'Stress management',
      'Healthy diet low in sodium'
    ],
    duration: 'Ongoing management',
    doshas: ['pitta', 'vata']
  },
  {
    id: 'eczema',
    title: 'Eczema (Dry Skin)',
    category: 'skin',
    desc: 'Nourish and soothe irritated skin',
    severity: 'mild',
    icon: '🌸',
    remedies: [
      'Coconut oil or ghee applied to affected areas',
      'Avoid harsh soaps and hot water',
      'Neem and turmeric paste for inflammation',
      'Oatmeal baths for soothing relief',
      'Stay hydrated and avoid triggers'
    ],
    prevention: [
      'Use gentle, natural products',
      'Keep skin moisturized',
      'Identify and avoid triggers'
    ],
    duration: 'Varies',
    doshas: ['vata', 'pitta']
  },
  {
    id: 'arthritis',
    title: 'Arthritis Support',
    category: 'musculoskeletal',
    desc: 'Reduce inflammation and improve mobility',
    severity: 'moderate',
    icon: '🦿',
    remedies: [
      'Turmeric and ginger supplements or tea',
      'Warm oil massage with mahanarayana oil',
      'Gentle stretching and yoga',
      'Anti-inflammatory diet with omega-3s',
      'Stay warm and avoid dampness'
    ],
    prevention: [
      'Maintain healthy weight',
      'Regular low-impact exercise',
      'Avoid joint strain'
    ],
    duration: 'Ongoing management',
    doshas: ['vata']
  }
]

// Categories for filtering
export const categories = [
  { id: 'all', name: 'All Remedies', icon: '🌿' },
  { id: 'respiratory', name: 'Respiratory', icon: '🌬️' },
  { id: 'digestive', name: 'Digestive', icon: '🍃' },
  { id: 'mental', name: 'Mental Wellness', icon: '🧘' },
  { id: 'skin', name: 'Skin Care', icon: '✨' },
  { id: 'musculoskeletal', name: 'Joints & Muscles', icon: '🦴' },
  { id: 'chronic', name: 'Chronic Conditions', icon: '💊' }
]

// AI Assistant knowledge base
export const aiKnowledge = {
  cold: {
    overview: 'Common cold is typically a Kapha imbalance causing congestion and heaviness. Warmth, steam, and light foods help restore balance.',
    tips: [
      'Stay warm and avoid cold drafts',
      'Sip warm liquids throughout the day',
      'Rest is crucial for recovery',
      'Avoid dairy as it increases mucus production'
    ],
    herbs: ['Tulsi (Holy Basil)', 'Ginger', 'Turmeric', 'Black pepper', 'Cinnamon']
  },
  indigestion: {
    overview: 'Indigestion indicates weakened digestive fire (Agni). Warming spices and mindful eating help restore digestive power.',
    tips: [
      'Eat smaller, more frequent meals',
      'Avoid eating late at night',
      'Take a short walk after meals',
      'Sip warm water with meals'
    ],
    herbs: ['Cumin', 'Fennel', 'Ajwain', 'Ginger', 'Cardamom']
  },
  headache: {
    overview: 'Tension headaches often stem from Vata imbalance. Relaxation, proper hydration, and stress management are key.',
    tips: [
      'Take regular breaks from screens',
      'Practice deep breathing',
      'Maintain regular sleep patterns',
      'Stay well-hydrated'
    ],
    herbs: ['Brahmi', 'Ashwagandha', 'Jatamansi', 'Peppermint']
  },
  acne: {
    overview: 'Acne is often a Pitta condition showing heat and inflammation. Cooling herbs and gentle care help restore skin balance.',
    tips: [
      'Keep skin clean but don\'t over-wash',
      'Avoid touching your face',
      'Reduce spicy and fried foods',
      'Stay hydrated'
    ],
    herbs: ['Neem', 'Turmeric', 'Manjistha', 'Aloe vera', 'Sandalwood']
  },
  joint: {
    overview: 'Joint pain typically indicates Vata aggravation. Warmth, oil, and gentle movement help lubricate and strengthen joints.',
    tips: [
      'Practice gentle yoga daily',
      'Stay warm, especially in cold weather',
      'Massage with warm oil regularly',
      'Maintain a healthy weight'
    ],
    herbs: ['Turmeric', 'Guggulu', 'Ashwagandha', 'Ginger', 'Shallaki']
  },
  insomnia: {
    overview: 'Sleep issues often relate to excess Vata in the nervous system. Calming routines and grounding practices promote rest.',
    tips: [
      'Establish a consistent sleep schedule',
      'Create a calming bedtime routine',
      'Avoid screens 1-2 hours before bed',
      'Keep your bedroom cool and dark'
    ],
    herbs: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Chamomile', 'Valerian']
  },
  anxiety: {
    overview: 'Anxiety reflects aggravated Vata and sometimes Pitta. Grounding practices and nervine herbs help restore calm.',
    tips: [
      'Practice daily meditation',
      'Use breathwork (Pranayama)',
      'Maintain regular routines',
      'Reduce stimulants like caffeine'
    ],
    herbs: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi', 'Holy Basil']
  },
  constipation: {
    overview: 'Constipation is a classic Vata imbalance. Hydration, fiber, healthy fats, and routine help restore regularity.',
    tips: [
      'Drink warm water first thing in morning',
      'Include healthy fats in diet',
      'Establish regular bathroom timing',
      'Stay physically active'
    ],
    herbs: ['Triphala', 'Psyllium husk', 'Flaxseed', 'Castor oil']
  },
  diabetes: {
    overview: 'Type 2 diabetes relates to Kapha imbalance. Lifestyle modifications alongside medical care are essential.',
    tips: [
      'Monitor blood sugar regularly',
      'Take short walks after meals',
      'Choose low-glycemic foods',
      'Work closely with your healthcare team'
    ],
    herbs: ['Fenugreek', 'Bitter melon', 'Cinnamon', 'Gymnema', 'Turmeric']
  },
  hypertension: {
    overview: 'High blood pressure involves Pitta and Vata. Stress reduction and dietary changes support cardiovascular health.',
    tips: [
      'Practice daily stress management',
      'Reduce sodium intake',
      'Monitor blood pressure regularly',
      'Maintain healthy weight'
    ],
    herbs: ['Arjuna', 'Ashwagandha', 'Garlic', 'Hawthorn', 'Gotu kola']
  },
  eczema: {
    overview: 'Eczema shows Pitta and Vata imbalance in the skin. Gentle care, moisturization, and cooling help heal.',
    tips: [
      'Avoid harsh chemicals and fragrances',
      'Keep skin well-moisturized',
      'Identify and avoid triggers',
      'Use lukewarm (not hot) water'
    ],
    herbs: ['Neem', 'Turmeric', 'Aloe vera', 'Coconut oil', 'Manjistha']
  },
  arthritis: {
    overview: 'Arthritis involves Vata imbalance with inflammation. Anti-inflammatory herbs and gentle movement help.',
    tips: [
      'Practice gentle, regular exercise',
      'Apply warmth to affected joints',
      'Maintain healthy weight',
      'Avoid cold, damp environments'
    ],
    herbs: ['Turmeric', 'Ginger', 'Guggulu', 'Shallaki', 'Ashwagandha']
  }
}

// Generate contextual AI responses
export function generateAIResponse({ diseaseId, userQuestion, context = '' }) {
  const knowledge = aiKnowledge[diseaseId] || {}
  const disease = diseases.find(d => d.id === diseaseId)
  
  // Simple keyword-based response system
  const question = userQuestion.toLowerCase()
  
  if (question.includes('how long') || question.includes('duration') || question.includes('how many days')) {
    return `For ${disease?.title}, the typical duration is ${disease?.duration}. However, this varies by individual. If symptoms persist beyond the expected timeframe or worsen, please consult a healthcare practitioner.`
  }
  
  if (question.includes('diet') || question.includes('food') || question.includes('eat')) {
    return `For ${disease?.title}, focus on warm, easily digestible foods. ${knowledge.overview || ''} Specific dietary recommendations: ${knowledge.tips?.join(', ') || 'Consult with an Ayurvedic practitioner for personalized diet advice.'}`
  }
  
  if (question.includes('herb') || question.includes('medicine') || question.includes('supplement')) {
    const herbs = knowledge.herbs?.join(', ') || 'various Ayurvedic herbs'
    return `Commonly used herbs for ${disease?.title} include: ${herbs}. Always consult with a qualified practitioner before starting any herbal supplements, especially if you have existing health conditions or take medications.`
  }
  
  if (question.includes('prevent') || question.includes('avoid')) {
    const prevention = disease?.prevention?.join('; ') || 'maintain a balanced lifestyle'
    return `To prevent ${disease?.title}: ${prevention}. ${knowledge.tips?.[0] || 'Prevention is always better than cure - focus on maintaining balance through proper diet, sleep, and stress management.'}`
  }
  
  if (question.includes('yoga') || question.includes('exercise') || question.includes('asana')) {
    return `Gentle yoga can be very beneficial for ${disease?.title}. Focus on poses that promote ${disease?.category === 'digestive' ? 'digestive health like twists and forward bends' : disease?.category === 'respiratory' ? 'breathing like chest openers' : disease?.category === 'mental' ? 'relaxation like child\'s pose and savasana' : 'overall wellbeing'}. Practice daily for best results, but listen to your body.`
  }
  
  if (question.includes('serious') || question.includes('doctor') || question.includes('emergency')) {
    return `${disease?.severity === 'serious' ? 'This is a serious condition that requires ongoing medical supervision.' : 'While Ayurvedic remedies can help,'} you should consult a healthcare provider if: symptoms worsen, you have severe pain, breathing difficulties, high fever, or symptoms persist beyond the normal duration. Always work with your healthcare team.`
  }
  
  // Default response with overview
  return `${knowledge.overview || `${disease?.title} can benefit from Ayurvedic approaches.`}\n\nKey tips:\n${knowledge.tips?.map(t => `• ${t}`).join('\n') || '• Follow the remedies listed\n• Maintain a balanced lifestyle\n• Consult a practitioner for personalized guidance'}\n\nRemember: This information is educational and doesn't replace professional medical advice.`
}
