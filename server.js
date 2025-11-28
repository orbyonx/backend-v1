const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("OrbyonX backend running with AI");
});

// Ruta de chat con OpenAI usando fetch nativo de Node 22
app.post("/chat", async (req, res) => {
  const userMessage =
    req.body && req.body.message ? req.body.message : "";

  if (!userMessage) {
    return res.json({ reply: "I need a message to respond." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.json({ reply: "Missing OpenAI API Key on server." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Hi, I am Orby, and I'm here to help you!"
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    let reply = "There was an error processing your message.";
    if (
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      reply = data.choices[0].message.content;
    }

    res.json({ reply });
  } catch (error) {
    console.error("Error in OpenAI:", error);
    res.json({ reply: "Error connecting to AI." });
  }
});

// Puerto asignado por Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("AI server running on port " + PORT);
});
