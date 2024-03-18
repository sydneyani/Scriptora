const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Initialize the OpenAI API with your API key directly
const openai = new OpenAI({
  apiKey: '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' // Replace with your actual API key
});

let conversationHistory = [];

router.post('/id/ai-endpoint', async (req, res) => {
  const userQuery = req.body.query;
  
  if (!userQuery) {
    return res.status(400).json({ message: "No query provided" });
  }

  conversationHistory.push({ role: 'user', content: userQuery });

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
                 
    });

    const assistantReply = chatCompletion.choices[0].message.content;

    conversationHistory.push({ role: 'assistant', content: assistantReply });


    res.json({ reply: assistantReply});
  } catch (error) {
    console.error('Error with OpenAI:', error);
    res.status(500).json({ message: 'Error generating response from AI', error: error.message });
  }
});


module.exports = router;
