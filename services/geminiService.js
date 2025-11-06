import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const API_KEY = 'AIzaSyApgjMJy2Ln4jX1r61BIYqJX21Z_dz31qk';
const genAI = new GoogleGenerativeAI(API_KEY);

// Ayurvedic Expert System Prompt
const SYSTEM_PROMPT = `You are an expert Ayurvedic practitioner and natural healing specialist with deep knowledge of traditional medicine, herbal remedies, and holistic wellness. Your role is to:

1. Provide evidence-based natural healing advice rooted in Ayurvedic principles
2. Recommend safe, natural remedies using herbs, dietary changes, and lifestyle modifications
3. Explain the reasoning behind your recommendations in simple, accessible language
4. Always emphasize the importance of consulting healthcare professionals for serious conditions
5. Focus on prevention, balance, and holistic wellbeing
6. Personalize advice based on individual symptoms and conditions

Guidelines:
- Be compassionate, supportive, and encouraging
- Use clear, jargon-free language while maintaining expertise
- Provide practical, actionable recommendations
- Include dietary advice, herbal remedies, yoga/exercise suggestions, and lifestyle tips
- Mention any precautions or contraindications
- Never diagnose serious medical conditions - recommend professional consultation when needed
- Focus on natural, safe remedies with traditional Ayurvedic backing

Your tone should be warm, knowledgeable, and empowering - helping users take charge of their health naturally.`;

/**
 * Generate AI response for health-related queries
 * @param {string} userMessage - The user's question or symptom description
 * @param {Array} conversationHistory - Previous messages for context
 * @param {Object} diseaseContext - Optional context about the current disease being discussed
 * @returns {Promise<string>} - AI-generated response
 */
export async function generateAIResponse(userMessage, conversationHistory = [], diseaseContext = null) {
  try {
    // Use Gemini 1.5 Flash for fast responses
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build context from conversation history
    let contextualPrompt = SYSTEM_PROMPT + '\n\n';
    
    // Add disease context if available
    if (diseaseContext) {
      contextualPrompt += `Current Context: The user is inquiring about "${diseaseContext.title}".\n`;
      contextualPrompt += `Description: ${diseaseContext.description}\n`;
      contextualPrompt += `Common Symptoms: ${diseaseContext.symptoms.join(', ')}\n\n`;
    }

    // Add conversation history (last 5 messages for context)
    if (conversationHistory.length > 0) {
      contextualPrompt += 'Recent Conversation:\n';
      const recentHistory = conversationHistory.slice(-5);
      recentHistory.forEach(msg => {
        contextualPrompt += `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
      });
      contextualPrompt += '\n';
    }

    // Add current user message
    contextualPrompt += `User Question: ${userMessage}\n\n`;
    contextualPrompt += 'Please provide a helpful, natural healing-focused response:';

    // Generate response
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Provide user-friendly error messages
    if (error.message?.includes('API key')) {
      throw new Error('API configuration error. Please check your API key.');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('Unable to generate response. Please try again.');
    }
  }
}

/**
 * Generate quick remedy suggestions for a specific condition
 * @param {Object} disease - The disease object with title and symptoms
 * @returns {Promise<string>} - Quick remedy suggestions
 */
export async function generateQuickRemedies(disease) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `As an Ayurvedic expert, provide 3-5 quick, practical natural remedies for "${disease.title}".
    
Symptoms: ${disease.symptoms.join(', ')}

Please provide:
1. Immediate relief remedies (herbs, home remedies)
2. Dietary recommendations
3. Lifestyle tips

Keep it concise, actionable, and safe. Format as a numbered list.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Quick Remedies Error:', error);
    throw new Error('Unable to generate remedies. Please try again.');
  }
}

/**
 * Validate and sanitize user input
 * @param {string} input - User input to validate
 * @returns {boolean} - Whether input is valid
 */
export function validateUserInput(input) {
  if (!input || typeof input !== 'string') return false;
  
  // Check minimum length
  if (input.trim().length < 2) return false;
  
  // Check maximum length (prevent abuse)
  if (input.length > 1000) return false;
  
  return true;
}

/**
 * Check if API is properly configured
 * @returns {boolean} - Whether API key is set
 */
export function isAPIConfigured() {
  return !!API_KEY && API_KEY.length > 20;
}

/**
 * Get suggested follow-up questions based on context
 * @param {Object} diseaseContext - Current disease context
 * @returns {Array<string>} - Array of suggested questions
 */
export function getSuggestedQuestions(diseaseContext) {
  const baseQuestions = [
    "What are the best natural remedies?",
    "Are there any dietary changes I should make?",
    "How long until I see improvement?",
    "Are there any side effects to watch for?",
    "Can I combine these remedies with medication?"
  ];

  if (diseaseContext) {
    return [
      `What causes ${diseaseContext.title}?`,
      `How can I prevent ${diseaseContext.title}?`,
      `What foods should I avoid with ${diseaseContext.title}?`,
      ...baseQuestions.slice(0, 2)
    ];
  }

  return baseQuestions;
}

export default {
  generateAIResponse,
  generateQuickRemedies,
  validateUserInput,
  isAPIConfigured,
  getSuggestedQuestions
};
