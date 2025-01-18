// import openai
const OpenAI = require('openai');

// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// create an openai instance
// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to send a message to the AI
const sendMessage = async (message) => {
  const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a doctor of oncology consulting a patient. Reply with only a short paragraph." },
      {
          role: "user",
          content: message,
      },
    ],
  });

  return completion.then((result) => result.choices[0].message);
};

// export the sendMessage function
exports.sendMessage = sendMessage;