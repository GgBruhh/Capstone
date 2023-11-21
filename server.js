const express = require('express');
const { Pool } = require('pg');
const { PSQL_PASSWORD } = require('./src/.config');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

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
      client.release();
  
      return res.json(data);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/api/data', async (req, res) => {
    try {
      const {show_name, show_id, img_src, description} = req.body;
      const cleanedShowName = show_name.replace(/"/g, '');
      const cleanedShowId = show_id.replace(/"/g, '');
      const cleanedImgSrc = img_src.replace(/"/g, '');
      const cleanedDescription = description.replace(/"/g, '');
      const query = {
        text: 'INSERT INTO favorites(show_name, show_id, img_src, description) VALUES($1, $2, $3, $4)',
        values: [cleanedShowName, cleanedShowId, cleanedImgSrc, cleanedDescription],
      };
      console.log({cleanedShowName, cleanedShowId, cleanedImgSrc, cleanedDescription})
      const client = await pool.connect();
      const result = await client.query(query);
      client.release();
  
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.delete('/api/data', async (req, res) => {
    try{
      const {name} = req.body
      const cleanedName = name.replace(/"/g, '');
      console.log(cleanedName);
      const query = `DELETE FROM favorites WHERE show_name = '${cleanedName}'`
      const client = await pool.connect();
      const result = await client.query(query);
      client.release();
    } catch (error){
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  })
