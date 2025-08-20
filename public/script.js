async function fetchData() {
  try {
    const res = await fetch("/sigfox-data.json"); 
    const data = await res.json();

    // valores
    const [cabeza, hombros, anteIzq, anteDer, espalda, categoria] = data.datos;

    // actualizar labels
    document.getElementById("lbl-cabeza").innerText = `Cabeza: ${cabeza}°`;
    document.getElementById("lbl-hombros").innerText = `Hombros: ${hombros}°`;
    document.getElementById("lbl-anteIzq").innerText = `Antebrazo Izq: ${anteIzq}°`;
    document.getElementById("lbl-anteDer").innerText = `Antebrazo Der: ${anteDer}°`;
    document.getElementById("lbl-espalda").innerText = `Espalda: ${espalda}°`;

    // OWAS Gauge
    drawGauge(categoria);

    // Bombillo
    let bombillo = "bombillo_verde.png";
    if (categoria === 2) bombillo = "bombillo_naranja.png";
    if (categoria >= 3) bombillo = "bombillo_rojo.png";

    document.getElementById("bombillo").src = `Templates/Imagen/${bombillo}`;
  } catch (err) {
    console.error("Error cargando datos:", err);
  }
}

function drawGauge(value) {
  const canvas = document.getElementById("gauge");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // arco base
  ctx.beginPath();
  ctx.arc(125, 125, 100, Math.PI, 2 * Math.PI);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 15;
  ctx.stroke();

  // arco OWAS (4 → rojo)
  const colors = ["#4caf50", "#ff9800", "#f44336", "#b71c1c"];
  const step = Math.PI / 4;

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(125, 125, 100, Math.PI + step * i, Math.PI + step * (i + 1));
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 15;
    ctx.stroke();
  }

  // indicador
  const angle = Math.PI + (value - 1) * (Math.PI / 4);
  const x = 125 + 80 * Math.cos(angle);
  const y = 125 + 80 * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = "16px Arial";
  ctx.fillText("OWAS: " + value, 100, 140);
}

// refrescar cada 3s
setInterval(fetchData, 3000);
fetchData();

