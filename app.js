// the running port
const PORT = process.env.PORT || 3001;
var cors = require('cors')

// IMPORTS
// import express
const express = require('express');

// Import the send message function from the openAiController
const openAiController = require('./controllers/openAiController');

// create an express app
const app = express();

// make the app parse JSON bodies
app.use(express.json()).use(cors());


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
  const smoker = req.body.smoker;
  const passiveSmoker = req.body.passiveSmoker;
  const alcohol = req.body.alcohol;
  const physicalActivity = req.body.physicalActivity;
  const sunExposure = req.body.sunExposure;
  const geneticHistory = req.body.geneticHistory;
  const airPollution = req.body.airPollution;

  openAiController.analyzeLifestyle(sex, age, city, airPollution, smoker, passiveSmoker, alcohol, physicalActivity, sunExposure, geneticHistory)
    .then((response) => {
      res.json({ message: response });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
  
// Endpoint to send an analysis message to the AI for a specific cancer type
app.post('/cancer', (req, res) => {
  const cancerType = req.body.cancerType;
  const message = req.body.message;
  openAiController.analyzeForCancerType(message, cancerType)
    .then((response) => {
      res.json({ message: response });
    })
    .catch((error) => {
      res.json({ message: error });
    });
});
