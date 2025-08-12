const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Guardar datos temporalmente en memoria
let registros = [];

app.get("/sigfox", (req, res) => {
  const { id, time, ...data } = req.query;

  registros.push({
    deviceId: id,
    timestamp: new Date(parseInt(time) * 1000),
    ...data
  });

  console.log("Datos recibidos:", req.query);
  res.send("OK");
});

app.get("/datos", (req, res) => {
  res.json(registros);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));

