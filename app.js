const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    // Check if req.body.developers is defined
    if (!req.body.developers || !Array.isArray(req.body.developers)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    let results = await Promise.all(req.body.developers.map(async d => {
      try {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return { name: response.data.name || 'N/A', bio: response.data.bio || 'N/A' };
      } catch (error) {
        return { name: 'N/A', bio: 'N/A', error: error.message };
      }
    }));

    return res.json(results);
  } catch (err) {
    console.error('Error in processing:', err.message);
    next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
