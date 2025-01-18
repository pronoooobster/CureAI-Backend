// the running port
const PORT = process.env.PORT || 3001;

// IMPORTS
// import express
const express = require('express');

// Import the send message function from the openAiController
const openAiController = require('./controllers/openAiController');

// create an express app
const app = express();

// make the app parse JSON bodies
app.use(express.json());

// make the app listen on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'CureAI Backend API' });
});

// Status route
app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint to send a message to the AI
app.post('/sendMessage', (req, res) => {
  const message = req.body.message;
  openAiController.sendMessage(message)
    .then((response) => {
      res.json({ message: response });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
  