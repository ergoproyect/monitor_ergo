const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // carpeta donde pondrás index.html y demás archivos

// Últimos datos recibidos
let latestData = {
  angulo_cabeza: 0,
  angulo_hombro_izq: 0,
  angulo_hombro_der: 0,
  angulo_brazo_izq: 0,
  angulo_brazo_der: 0,
  angulo_espalda: 0,
  owas: 1
};

// Endpoint para recibir datos desde curl / Sigfox / Kinect
app.post("/api/data", (req, res) => {
  const { angulo_cabeza, angulo_hombro_izq, angulo_hombro_der, angulo_brazo_izq, angulo_brazo_der, angulo_espalda, owas } = req.body;

  latestData = {
    angulo_cabeza,
    angulo_hombro_izq,
    angulo_hombro_der,
    angulo_brazo_izq,
    angulo_brazo_der,
    angulo_espalda,
    owas
  };

  // Emitimos a todos los navegadores conectados
  io.emit("updateData", latestData);

  res.json({ status: "ok", received: latestData });
});

// WebSocket para enviar siempre los últimos datos
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Enviar últimos datos al nuevo cliente
  socket.emit("updateData", latestData);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

