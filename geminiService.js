// geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to apply timeout for gemini api
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  );
  return Promise.race([promise, timeout]);
}

async function processMeetingNotes(text) {
  // Input validation
  if (!text || typeof text !== 'string' || text.trim() === '') {
    throw new Error('Meeting notes input is missing or invalid');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an AI assistant. Analyze the following meeting notes and return:
1. A 2-3 sentence summary
2. A list of key decisions
3. A list of action items with task, owner (if mentioned), and deadline (if mentioned)

Respond ONLY in this JSON format:
{
  "summary": "...",
  "decisions": [...],
  "actionItems": [
    {
      "task": "...",
      "owner": "...", 
      "due": "..."
    }
  ]
}
MEETING NOTES:
${text}`;

  try {
    const result = await withTimeout(model.generateContent(prompt), 10000); // 10s timeout
    const response = await result.response;
    const rawText = await response.text();

    // Attempt to extract and parse JSON
    const jsonStart = rawText.indexOf('{');
    const jsonEnd = rawText.lastIndexOf('}');
    const jsonString = rawText.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);

  } catch (err) {
    throw new Error(`Gemini processing failed: ${err.message}`);
  }
}

module.exports = processMeetingNotes;
