const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("OrbyonX backend running");
});

// Ruta de chat simple
app.post("/chat", (req, res) => {
  const message = req.body && req.body.message ? req.body.message : "";

  res.json({
    reply: "Recibi tu mensaje: " + message
  });
});

// Puerto asignado por Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
