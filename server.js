const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor Monitor Ergo activo ✅");
});

// Ruta para recibir datos de Sigfox
app.get("/sigfox", (req, res) => {
  const {
    id,
    time,
    data1, data2, data3, data4, data5, data6,
    data7, data8, data9, data10, data11, data12
  } = req.query;

  const registro = {
    dispositivo: id,
    timestamp: time,
    datos: [
      Number(data1), Number(data2), Number(data3), Number(data4),
      Number(data5), Number(data6), Number(data7), Number(data8),
      Number(data9), Number(data10), Number(data11), Number(data12)
    ]
  };

  console.log("📩 Datos recibidos:", registro);

  // Respuesta a Sigfox
  res.status(200).send("OK");

  // Aquí puedes guardar los datos en una base de datos (MongoDB, PostgreSQL, etc.)
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});

