require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use Supabase or local PostgreSQL URL
  ssl: { rejectUnauthorized: false }, // Required for Supabase
});

// Middleware
app.use(cors());
app.use(express.json());

// Fetch questions
app.get('/api/questions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit answers
app.post('/api/submit', async (req, res) => {
  try {
    const { user_id, answers } = req.body;
    const result = await pool.query(
      'INSERT INTO submissions (user_id, answers) VALUES ($1, $2) RETURNING *',
      [user_id, JSON.stringify(answers)]
    );
    res.json({ message: 'Exam submitted!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
