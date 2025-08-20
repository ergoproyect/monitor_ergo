const express = require("express");
const path = require("path");

const app = express();

// Middleware para parsear JSON en caso de que lo uses
app.use(express.json());

// Rutas de archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "public")));
app.use("/Imagen", express.static(path.join(__dirname, "Templates/Imagen")));

// Variable en memoria para guardar último dato recibido
let ultimoDato = {};

// Ruta para recibir datos desde Sigfox
// Ejemplo de prueba:
// curl "https://monitor-ergo.onrender.com/sigfox?id=DEVICE414402&time=1691760023&data1=10&data2=20&data3=30&data4=40&data5=20&data6=1"
app.get("/sigfox", (req, res) => {
  const { id, time, data1, data2, data3, data4, data5, data6 } = req.query;

  ultimoDato = {
    id,
    time,
    data1: Number(data1),
    data2: Number(data2),
    data3: Number(data3),
    data4: Number(data4),
    data5: Number(data5),
    data6: Number(data6),
  };

  console.log("Dato recibido desde Sigfox:", ultimoDato);

  res.json({ status: "ok", recibido: ultimoDato });
});

// Ruta para consultar el último dato
app.get("/api/ultimo", (req, res) => {
  if (Object.keys(ultimoDato).length === 0) {
    return res.json({ status: "sin_datos" });
  }
  res.json(ultimoDato);
});

// Render necesita usar process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

