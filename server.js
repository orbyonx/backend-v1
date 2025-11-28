const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("OrbyonX backend running");
});

// Ruta de chat sencilla (eco)
app.post("/chat", (req, res) => {
  const message = (req.body && req.body.message) || "";
  console.log("Mensaje recibido desde Shopify:", message);

  res.json({
    reply: message
      ? Recibí tu mensaje: "${message}"
      : "No recibí ningún mensaje, intenta de nuevo."
  });
});

// Render asigna el puerto en PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
