const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration: Allow all origins (can change to specific domain in production)
const corsOptions = {
  origin: '*',  // Allow all origins or set a specific domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions)); // Apply CORS to all routes

// Use JSON middleware to parse request bodies
app.use(express.json());

// Ensure OPTIONS requests are handled properly (preflight)
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);  // Respond to OPTIONS preflight requests with status 200
});

let username = null;
let password = null;
let firstPuppeteerPostData = null;
let secondPuppeteerPostData = null;

// Example endpoint for setting username
app.post('/save-username', (req, res) => {
  username = req.body.username;
  console.log('Received username:', username);
  res.sendStatus(200);
});

// Example endpoint for setting password
app.post('/save-password', (req, res) => {
  password = req.body.password;
  console.log('Received password:', password);
  res.sendStatus(200);
});

// Example endpoint for getting username
app.get('/get-username', (req, res) => {
  if (username) {
    res.status(200).json({ username });
  } else {
    res.status(404).send('No username available.');
  }
});

// Export the Express app as a serverless function handler
module.exports = (req, res) => {
  app(req, res);  // Forward the request to the Express app
};
