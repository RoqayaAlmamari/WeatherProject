const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.static('website'));
// JavaScript Object to act as the app API endpoint
let projectData = {};

// GET route to return the projectData object
app.get('/data', (req, res) => {
  res.send(projectData);
});

// POST route to add incoming data to projectData
app.post('/data', (req, res) => {
  const newData = req.body;
  projectData = newData;
  res.send('Data added successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


