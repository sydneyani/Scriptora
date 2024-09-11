const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Initialize the OpenAI API using the environment variable for the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Securely load the API key from .env
});

let conversationHistory = [];

router.post('/id/ai-endpoint', async (req, res) => {
  const userQuery = req.body.query;
  
  if (!userQuery) {
    return res.status(400).json({ message: "No query provided" });
  }

  // Append the user's query to the conversation history
  conversationHistory.push({ role: 'user', content: userQuery });

  try {
    // Call the GPT-4o model instead of gpt-3.5-turbo
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",  // Use the new GPT-4o model
      messages: conversationHistory,
    });

    const assistantReply = chatCompletion.choices[0].message.content;

    // Append the assistant's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantReply });

    // Respond with the assistant's reply
    res.json({ reply: assistantReply });
  } catch (error) {
    console.error('Error with OpenAI:', error);
    res.status(500).json({ message: 'Error generating response from AI', error: error.message });
  }
});

module.exports = router;
