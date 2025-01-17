// the running port
const PORT = process.env.PORT || 3001;

// IMPORTS
// import express
const express = require('express');
// import openAI
import OpenAI from "openai";

// create an express app
const app = express();

// make the app parse JSON bodies
app.use(express.json());

// OpenAI API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAPI_KEY,
});

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
app.post('/chat', async (req, res) => {
    const { message } = req.body;
  
    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {"role": "user", "content": message},
      ],
    });
  
    completion.then((result) => res.json(result.choices[0].message));
  });
  