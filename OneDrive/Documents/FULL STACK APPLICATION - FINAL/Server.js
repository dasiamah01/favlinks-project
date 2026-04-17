const express = require('express');
const { Pool } = require('pg');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Database Connection (PostgreSQL) [cite: 36]
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 2. API Endpoint: Generate and Store (Create) [cite: 32, 37]
app.post('/api/generate', async (req, res) => {
  const { title, lyrics } = req.body;

  try {
    // Prompt Engineering for "Technical Ingenuity" [cite: 62]
    const aiPrompt = `Album cover art for a song titled "${title}". Mood: ${lyrics.substring(0, 100)}. Professional digital art style, no text.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: aiPrompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    // Save metadata to Database [cite: 37]
    const newUserContent = await pool.query(
      "INSERT INTO covers (song_title, lyrics, ai_prompt, image_url) VALUES($1, $2, $3, $4) RETURNING *",
      [title, lyrics, aiPrompt, imageUrl]
    );

    res.json(newUserContent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. API Endpoint: Get Gallery (Read) [cite: 32, 37]
app.get('/api/covers', async (req, res) => {
  try {
    const allCovers = await pool.query("SELECT * FROM covers ORDER BY created_at DESC");
    res.json(allCovers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));