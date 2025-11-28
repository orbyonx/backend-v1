const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("OrbyonX backend running with AI");
});

// Ruta de chat con OpenAI
app.post("/chat", async (req, res) => {
  const userMessage = req.body && req.body.message ? req.body.message : "";

  if (!userMessage) {
    return res.json({ reply: "Necesito un mensaje para responder." });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.json({ reply: "Falta la API Key de OpenAI en el servidor." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${apiKey}
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres el asistente oficial de OrbyonX. Responde breve, directo y profesional sobre IA, automatización, OrbyonX y Web3."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data && data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "Hubo un error procesando tu mensaje.";

    res.json({ reply });
  } catch (error) {
    console.error("Error en OpenAI:", error);
    res.json({ reply: "Error al conectar con la IA." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("AI server running on port " + PORT);
});
