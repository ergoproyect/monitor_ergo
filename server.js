app.get('/sigfox', (req, res) => {
  console.log("🔍 Querystring recibido:", req.query); // <-- Aquí imprime todo el query recibido

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

