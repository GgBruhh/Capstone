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

  app.get('/api/status', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM status');
      const data = result.rows;
      client.release();
  
      return res.json(data);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  });

//add to favorites databse
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


//add a status to the show
  app.post('/api/status', async (req, res) => {
    const {show_name, show_id, status} = req.body;
      const cleanedShowName = show_name.replace(/"/g, '');
      const cleanedShowId = show_id.replace(/"/g, '');


    try {
      // Check if the show exists
      const result = await pool.query('SELECT * FROM status WHERE show_id = $1', [cleanedShowId]);
  
      if (result.rows.length > 0) {
        // If the show exists, update the status
            const {show_id, status} = req.body;
            const cleanedShowName = show_name.replace(/"/g, '');
            const cleanedShowId = show_id.replace(/"/g, '');
      
            const query = {
              text: 'UPDATE status SET status = $1 WHERE show_id = $2',
              values: [status, cleanedShowId]
            }
            const client = await pool.connect();
            const result = await client.query(query);
            client.release();
      
          }else {
        // If the show doesn't exist, add a new row
        const query = {
              text: 'INSERT INTO status(show_id, status, show_name) VALUES($1, $2, $3)',
              values: [cleanedShowId, status, cleanedShowName,],
            };
            console.log({cleanedShowName, cleanedShowId})
            const client = await pool.connect();
            const result = await client.query(query);
            client.release();
      }
  
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    // try {
    //   const {show_name, show_id, status} = req.body;
    //   const cleanedShowName = show_name.replace(/"/g, '');
    //   const cleanedShowId = show_id.replace(/"/g, '');
    //   const query = {
    //     text: 'INSERT INTO status(show_id, status, show_name) VALUES($1, $2, $3)',
    //     values: [cleanedShowId, status, cleanedShowName,],
    //   };
    //   console.log({cleanedShowName, cleanedShowId})
    //   const client = await pool.connect();
    //   const result = await client.query(query);
    //   client.release();
  
    // } catch (error) {
    //   console.error('Error executing query', error);
    //   res.status(500).send('Internal Server Error');
    // }
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


