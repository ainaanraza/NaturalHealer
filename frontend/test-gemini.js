// Quick test script to verify Gemini API is working
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCuGmgpF5_GARi9K5EnJdu_sk4Mubi62pQ';

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    console.log('API Key:', API_KEY);
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Use gemini-2.0-flash model (matches your curl example)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    console.log('Sending test request with gemini-2.0-flash...');
    const result = await model.generateContent('What are natural remedies for headaches?');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Success! Response:');
    console.log(text);
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error message:', error.message);
  }
}

testGemini();
