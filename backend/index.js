import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Database connection setup (using PostgreSQL)
const dbClient = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dbClient.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error', err));

// Example route for fetching tools
app.get('/api/tools', async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM tools');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// Serve static files from React app in production
import path from 'path';
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Fallback to React's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve('frontend', 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
