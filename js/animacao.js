// Obtém a referência para o elemento "ball"
const ball = document.getElementById('ball');

// Obtém as referências para os elementos "score1" e "score2"
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');

// Obtém a referência para o elemento "goleiro"
const goleiroElement = document.getElementById('goleiro');



// Define as dimensões do campo de futebol
const fieldWidth = 750;
const fieldHeight = 355;

// Define a velocidade da bola
const speed = 10;

// Define a direção inicial da bola
let xDirection = 1;
let yDirection = 1;

// Define a posição inicial da bola
let xPos = 375;
let yPos = 172;

// Define as pontuações iniciais
let score1 = 0;
let score2 = 0;

function animateBall() {
  // Atualiza a posição da bola
  xPos += speed * xDirection;
  yPos += speed * yDirection;

  // Verifica se a bola atingiu os limites do campo de futebol
  if (xPos < 0 || xPos > fieldWidth) {
    // Altera a direção da bola no eixo X
    xDirection *= -1;

    // Verifica se a bola atingiu o meio das laterais
    if (yPos > fieldHeight / 2 - 100 && yPos < fieldHeight / 2 + 100) {

      // Verifica de qual lado da tela a bola atingiu o meio das laterais
      if (xPos < 0) {
        // Adiciona pontos para o jogador 2
        score2++;

        // Atualiza a posição da bola para a posição inicial
        xPos = Math.random() * fieldWidth;
        yPos = Math.random() * fieldHeight;


        // Atualiza o placar do jogador 2
        score2Element.textContent = score2;
      } else {
        // Adiciona pontos para o jogador 1
        score1++;

        // Atualiza a posição da bola para a posição inicial
        xPos = Math.random() * fieldWidth;
        yPos = Math.random() * fieldHeight;

        // Atualiza o placar do jogador 1
        score1Element.textContent = score1;
      }
    }
  }
  if (yPos < 0 || yPos > fieldHeight) {
    // Altera a direção da bola no eixo Y
    yDirection *= -1;
  }


  // Obtém as dimensões da bola
  const ballWidth = ball.offsetWidth;
  const ballHeight = ball.offsetHeight;

  // Obtém as dimensões do goleiro
  const goleiroWidth = goleiroElement.offsetWidth;
  const goleiroHeight = goleiroElement.offsetHeight;

  // Obtém a posição da bola
  const ballX = xPos;
  const ballY = yPos;

  // Obtém a posição do goleiro



  const goleiroX = goleiroElement.offsetLeft;
  const goleiroY = goleiroElement.offsetTop;

  if (ballX + ballWidth > goleiroX && ballX < goleiroX + goleiroWidth && ballY + ballHeight > goleiroY && ballY < goleiroY + goleiroHeight) {
    // Inverte a direção da bola nos eixos X e Y
    xDirection *= -1;
    yDirection *= +1;
  }

  // Atualiza a posição da bola
  ball.style.left = xPos + 'px';
  ball.style.top = yPos + 'px';

  // Chama a função novamente para continuar a animação
  requestAnimationFrame(animateBall);
}

// Inicia a animação da bola
animateBall();

function moverGoleiro(event) {
  // Obtém a posição do mouse no eixo Y
  const y = event.clientY;

  // Calcula a nova posição do goleiro baseada na posição do mouse
  const novaPosicao = y - goleiroElement.offsetHeight / 2;

  // Atualiza a posição do goleiro
  goleiroElement.style.top = novaPosicao + 'px';
}



// Adiciona um evento de "mousemove" ao documento para que a função seja chamada sempre que o mouse for movimentado
document.addEventListener('mousemove', moverGoleiro);




const goleiroOponenteElement = document.getElementById('goleiro-oponente');
const bolaElement = document.getElementById('ball');

function moverGoleiroOponente() {
  // Obtém a posição da bola no eixo Y
  const yBola = bolaElement.offsetTop;

  // Calcula a nova posição do goleiro baseada na posição da bola
  const novaPosicao = yBola - goleiroOponenteElement.offsetHeight / 2;

  // Atualiza a posição do goleiro
  goleiroOponenteElement.style.top = novaPosicao + 'px';
}

// Chama a função a cada 10 milissegundos para atualizar a posição do goleiro oponente
setInterval(moverGoleiroOponente, 10);



function detectarColisao() {
  // Obtém as propriedades de posição e tamanho do goleiro oponente
  const xGoleiro = goleiroOponenteElement.offsetLeft;
  const yGoleiro = goleiroOponenteElement.offsetTop;
  const larguraGoleiro = goleiroOponenteElement.offsetWidth;
  const alturaGoleiro = goleiroOponenteElement.offsetHeight;

  // Obtém as propriedades de posição e tamanho da bola
  const xBola = bolaElement.offsetLeft;
  const yBola = bolaElement.offsetTop;
  const larguraBola = bolaElement.offsetWidth;
  const alturaBola = bolaElement.offsetHeight;

  // Verifica se as caixas de colisão (bounding boxes) dos dois objetos se intersectam
  if (xBola < xGoleiro + larguraGoleiro &&
    xBola + larguraBola > xGoleiro &&
    yBola < yGoleiro + alturaGoleiro &&
    yBola + alturaBola > yGoleiro) {
    // Se houver uma colisão, execute alguma ação (por exemplo, exiba uma mensagem)
    xDirection *= -1;
    yDirection *= +1;
  }
}

// Chama a função a cada 10 milissegundos para verificar por colisões
setInterval(detectarColisao, 10);


