const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000; // Render usa un puerto dinámico

app.get('/sigfox', (req, res) => {
  console.log("🔍 Querystring recibido:", req.query);

  const dispositivo = req.query.id;
  const timestamp = req.query.time;

  const datos = [
    parseInt(req.query.data1),
    parseInt(req.query.data2),
    parseInt(req.query.data3),
    parseInt(req.query.data4),
    parseInt(req.query.data5),
    parseInt(req.query.data6)
  ];

  console.log("📩 Datos recibidos:", {
    dispositivo,
    timestamp,
    datos
  });

  res.send('OK');
});

// Ruta de prueba para confirmar que el servidor está vivo
app.get('/', (req, res) => {
  res.send('Servidor Monitor Ergo activo ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

