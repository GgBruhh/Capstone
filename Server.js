const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { PSQL_PASSWORD } = require('./src/.config');

const app = express();
const port = 3001; // Choose a port for your server

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// PostgreSQL configuration
const pool = new Pool({
  user: 'camryn',
  host: 'localhost',
  database: 'anilist',
  password: PSQL_PASSWORD,
  port: 5432,
});

const SERVER_URL = 'http://localhost:3001'

// Registration endpoint
app.post(`${SERVER_URL}/api/register`, async (req, res) => {
  const { username, email, password } = req.body;
  console.log({username, email, password})

  try {
    // Check if the user with the provided email already exists
    const userExistsQuery = 'SELECT * FROM users WHERE email = $1';
    const userExistsResult = await pool.query(userExistsQuery, [email]);

    if (userExistsResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // If the user doesn't exist, insert the new user
    const registerQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const registerResult = await pool.query(registerQuery, [username, email, password]);

    // You might want to generate and send back an authentication token at this point
    res.json({ user: registerResult.rows[0] });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email and password exists
    const loginQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const loginResult = await pool.query(loginQuery, [email, password]);

    if (loginResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // You might want to generate and send back an authentication token at this point
    res.json({ user: loginResult.rows[0] });
  } catch (error) {
    console.error('Login failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
