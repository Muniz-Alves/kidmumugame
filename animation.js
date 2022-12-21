
const bola = document.getElementById("#ball");
const campo = document.getElementById("campo");

let x = 0;
let y = 0;
let dx = 1;
let dy = 1;

function atualizarPosicaoBola() {
  x += dx;
  y += dy;

  if (x + bola.offsetWidth > campo.offsetWidth || x < 0) {
    dx = -dx;
  }
  if (y + bola.offsetHeight > campo.offsetHeight || y < 0) {
    dy = -dy;
  }

  bola.style.left = x + "px";
  bola.style.top = y + "px";
}

setInterval(atualizarPosicaoBola, 10);
