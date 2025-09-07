// routes/gemini.js
import express from 'express';
import genAI from '../config/genaiClient.js';

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Pick a model your key supports
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.json({ answer: text });
  // } catch (err) {
  //   console.error('Gemini error:', err);
  //   return res.status(500).json({
  //     error: 'Failed to generate content',
  //     details: process.env.NODE_ENV === 'development' ? err.message : undefined
  //   });
} catch (err) {
  console.error("Gemini error:", err);
  if (err.response) {
    console.error("Gemini error details:", err.response.status, err.response.data);
  }
  return res.status(500).json({
    error: "Failed to generate content",
    details: process.env.NODE_ENV === "development" ? err.message : undefined
  });
}

  }
);

export default router;
