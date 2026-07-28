import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: AI Prompt Enhancer for Creators
  app.post('/api/enhance-prompt', async (req, res) => {
    try {
      const { draftPrompt, projectTitle, category } = req.body;

      if (!draftPrompt) {
        return res.status(400).json({ error: 'Draft prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback enhancement if API key is not yet configured
        const fallbackPrompt = `Build a modern, responsive ${projectTitle || 'web application'} in React and Tailwind CSS.\n\nKey Requirements:\n- ${draftPrompt}\n- Clean, accessible user interface with smooth animations and responsive layout\n- Modular component structure with local state persistence\n- High contrast colors and Lucide React icons.`;
        return res.json({ enhancedPrompt: fallbackPrompt, note: 'Used standard structure (API key not configured).' });
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert AI Studio Prompt Engineer. Enhance the following rough prompt into a detailed, high-performing AI system prompt for building a React & Tailwind CSS web app.

Project Title: ${projectTitle || 'Untitled Project'}
Category: ${category || 'Web Application'}
Rough Draft: "${draftPrompt}"

Instructions:
1. Format as a clean, structured prompt with clear sections (Overview, Key Features, UI/UX Guidelines, Technical Requirements).
2. Make it actionable, detailed, and clear so AI Studio can build the exact app on the first try.
3. Keep it under 250 words, clean bullet points, high impact. Return ONLY the enhanced prompt text.`
      });

      const enhancedText = response.text || draftPrompt;
      return res.json({ enhancedPrompt: enhancedText });
    } catch (err: any) {
      console.error('Error enhancing prompt:', err);
      return res.status(500).json({ error: err.message || 'Failed to enhance prompt' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
