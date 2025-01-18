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

// Endpoint to send a lifestyle message to the AI
app.post('/lifestyle', (req, res) => {
  const sex = req.body.sex;
  const age = req.body.age;
  const city = req.body.city;
  const job = req.body.job;
  const smoker = req.body.smoker;
  const passiveSmoker = req.body.passiveSmoker;
  const alcohol = req.body.alcohol;
  const physicalActivity = req.body.physicalActivity;
  const sunExposure = req.body.sunExposure;
  const geneticHistory = req.body.geneticHistory;

  openAiController.analyzeLifestyle(sex, age, city, job, smoker, passiveSmoker, alcohol, physicalActivity, sunExposure, geneticHistory)
    .then((response) => {
      res.json({ message: response });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
  