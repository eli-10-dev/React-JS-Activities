import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

app.get('/api/photo', async (req, res) => {
    try {
        const response = await fetch('https://api.unsplash.com/search/photos?query=landscape&per_page=30', {
            headers: {
              'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`,
            }
          });
          
      const data = await response.json();
      
      console.log('Unsplash API response (server.js):', data);  
      
      if (data && data.length > 0) {
        res.json(data);
      } else {
        console.log('No photo data found');
        res.status(404).json({ error: 'No photos found' }); 
      }
    } catch (error) {
      console.error('Error fetching from Unsplash:', error); 
      res.status(500).send('Error fetching photo');
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
