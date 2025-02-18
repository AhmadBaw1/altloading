import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Securely load API key from environment
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    // This will log the response from the OpenAI API to Vercel logs
    console.log(response);

    res.status(200).json({ url: response.data[0].url });
  } catch (error) {
    console.error("Error generating image: ", error.message);
    res.status(500).json({ error: error.message });
  }
}