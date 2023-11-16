const express = require('express');
const { Pool } = require('pg');
const { PSQL_PASSWORD } = require('./src/.config');

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const pool = new Pool({
  user: 'camryn',
  host: 'localhost',
  database: 'anilist',
  password: PSQL_PASSWORD,
  port: 5432,
});


app.get('/api/data', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM favorites');
      const data = result.rows;
      console.log(result);
      client.release();
  
      res.json(data);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
