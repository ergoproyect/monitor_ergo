const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000; // Render usa un puerto dinámico

app.get('/sigfox', (req, res) => {
  console.log("🔍 Querystring recibido:", req.query);

  const dispositivo = req.query.id;
  const timestamp = req.query.time;

  const datos = [
    Number(req.query.data1), Number(req.query.data2), Number(req.query.data3),
    Number(req.query.data4), Number(req.query.data5), Number(req.query.data6),
    Number(req.query.data7), Number(req.query.data8), Number(req.query.data9),
    Number(req.query.data10), Number(req.query.data11), Number(req.query.data12)
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

