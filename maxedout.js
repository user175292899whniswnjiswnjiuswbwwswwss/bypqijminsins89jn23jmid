const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});