const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

let ultimoDato = {
  dispositivo: null,
  timestamp: null,
  datos: [0,0,0,0,0,0],
  categoria: 1
};

function calcularCategoria(datos) {
  // data6 es la categoría recibida (0,1,2,3,4)
  const cat = datos[5];
  switch(cat){
    case 0: return {texto:"Correcta", color:"green"};
    case 1: return {texto:"Leve", color:"yellow"};
    case 2: return {texto:"Media", color:"orange"};
    case 3: return {texto:"Incorrecta", color:"orangered"};
    case 4: return {texto:"Inadecuada", color:"red"};
    default: return {texto:"Desconocida", color:"gray"};
  }
}

// Endpoint donde Sigfox manda los datos
app.get('/sigfox', (req, res) => {
  const dispositivo = req.query.id;
  const timestamp = req.query.time;
  const datos = [
    parseInt(req.query.data1),
    parseInt(req.query.data2),
    parseInt(req.query.data3),
    parseInt(req.query.data4),
    parseInt(req.query.data5),
    parseInt(req.query.data6)  // categoría
  ];

  ultimoDato = { dispositivo, timestamp, datos, categoria: datos[5] };

  console.log("📩 Datos recibidos:", ultimoDato);
  res.send('OK');
});

// Interfaz gráfica
app.get('/monitor', (req, res) => {
  const {texto, color} = calcularCategoria(ultimoDato.datos);
  const html = `
  <html>
    <head>
      <title>Monitor Ergo</title>
      <style>
        body { font-family: Arial; background:#f0f0f0; text-align:center; }
        h1 { margin-top:20px; }
        .card { background:white; padding:10px; margin:10px auto; width:300px; border-radius:10px; box-shadow:0 2px 5px #999; }
        .categoria { font-size:20px; font-weight:bold; background:${color}; color:white; padding:10px; border-radius:10px; }
      </style>
    </head>
    <body>
      <h1>Posturas ergonómicas</h1>
      <div class="card">Angulo_Cabeza: ${ultimoDato.datos[0]}</div>
      <div class="card">Angulo_Hombros: ${ultimoDato.datos[1]}</div>
      <div class="card">Angulo_Antebrazo_Izq: ${ultimoDato.datos[2]}</div>
      <div class="card">Angulo_Antebrazo_Der: ${ultimoDato.datos[3]}</div>
      <div class="card">Angulo_Espalda: ${ultimoDato.datos[4]}</div>
      <div class="categoria">Categoría: ${texto}</div>

      ${ultimoDato.categoria == 4 ? `
        <script>
          var audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
          audio.loop = true;
          audio.play();
        </script>
      ` : ""}
    </body>
  </html>
  `;
  res.send(html);
});

// Ruta test
app.get('/', (req, res) => res.send('Servidor Monitor Ergo activo ✅'));

app.listen(PORT, () => console.log(`🚀 Escuchando en puerto ${PORT}`));

