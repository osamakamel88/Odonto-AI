import OpenAI from 'openai';

// Safe fallback for Next.js build-time page collection on Vercel
const apiKey = process.env.OPENAI_API_KEY || 'sk-build-time-placeholder-key-for-vercel';

export const openai = new OpenAI({ 
  apiKey,
});
