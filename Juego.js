// Guardo el canvas en una constante
//const canvas = document.getElementById("canvas");
var canvas = document.getElementById("canvas");

// Guardo el gameBoard
//const gameBoard = canvas.getContext("2d");
var gameBoard = canvas.getContext("2d");
// No usar 'var', ¿por qué comentaste lo mío?

// Guardo en una constante el tamaño de cada cuadrado
const SIZEX = 50;
const SIZEY = 15;
const SIZEBALL = 10;
const MOVEPC = 20;

//contadores
let contWin = 0;
let contLose = 0;

//tiempo para el interval
const TIME = 10;

//html id de contadores
const wonElement = document.getElementById("scorePlayer");
const loseElement = document.getElementById("scorePC");

//ball
const ballp = {
  x: canvas.width / 2, // donde inicia la pelota
  y: canvas.height - 30, // donde inicia la pelota
};

let dx = 4; // variable para ir sumando al movimiento
let dy = -4; // variable para ir sumando al movimiento
let ballRadius = 10; //radio del circulo

const Player = {
  positionX: 175,
  positionY: 445,
};

const PC = {
  positionX: 350,
  positionY: 0,
};

// Posiciónes futuras
let futureX = 0; // No se usa
let futureY = 0; // No se usa
let pcposition = 0;

setInterval(main, TIME); // 1000ms === 1s

// GAME LOOP o MAIN LOOP
function main() {
  // Podría comentar 'update()' y el juego funcionaría igual.
  // Todo pasa en draw()

  update(); // Actualiza las variables del juego
  draw(); // Representa las nuevas variables
}

// No hace nada
function update() {
  const isBlockMovePlayer = checkWallPlayer();
  const isBlockMovePc = checkWallPc();

  if (isBlockMovePc) {
    return;
  }

  if (isBlockMovePlayer) {
    return;
  }

  // Actualizar las coordenadas
  Player.positionX += futureX;
  Player.positionY += futureY;
}

function checkWallPc() {
  // Si las coordenadas se salen de los límites
  const leftCollisionPC = PC.positionX < 0;
  const rightCollisionPC = PC.positionX > 350;
  if (leftCollisionPC) {
    PC.positionX = 0;
  } else if (rightCollisionPC) {
    PC.positionX = 350;
  }
}

function checkWallPlayer() {
  // Si las coordenadas se salen de los límites
  const leftCollision = Player.positionX < 0;
  const rightCollision = Player.positionX > 350;

  if (leftCollision) {
    Player.positionX = 0;
  } else if (rightCollision) {
    Player.positionX = 350;
  }
}

function draw() {
  // Dibujar el fondo verde
  gameBoard.fillStyle = "grey";
  gameBoard.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar al jugador
  drawThingPlayer(Player, "blue");

  //Dibujar al pc
  drawThingPC(PC, "blue");

  // Dibujar el alimento
  drawThingBall(ballp, "yellow");
  reboundBall();

  ballp.x += dx; //cada vez q se dibuja el draw se le suma dx a x
  ballp.y += dy;

  PC.positionX += dx;
  if (pcposition == 0) {
    pcposition += dx;
  } else if (pcposition == 350) {
    pcposition += dy;
  }
}

function drawThingPC(obj, color) {
  gameBoard.fillStyle = color;
  gameBoard.fillRect(obj.positionX, obj.positionY, SIZEX, SIZEY);
}

function drawThingPlayer(obj, color) {
  gameBoard.fillStyle = color;
  gameBoard.fillRect(obj.positionX, obj.positionY, SIZEX, SIZEY);
}

function drawThingBall(ballp, color) {
  gameBoard.fillStyle = color;
  gameBoard.fillRect(ballp.x, ballp.y, ballRadius, ballRadius);
  //gameBoard.arc(30,10,10,0,Math.PI*2);//no me crea el circulo
}

function reboundBall() {
  ///rebote en las paredes de los costados
  if (ballp.x + dx > canvas.width - ballRadius || ballp.x + dx < ballRadius) {
    dx = -dx;
  }

  // REBOTE EN LA PALETA DEL JUGADOR
  if (ballp.y + dy < ballRadius) {
    dy = -dy;
    musicBall();
  } else if (ballp.y + dy > canvas.height - ballRadius) {
    if (ballp.x > Player.positionX && ballp.x < Player.positionX + SIZEX) {
      dy = -dy;
      musicBall();
    } else {
      lose();
      musicfailed();
      dy = -dy;
    }
  }

  // REBOTE EN LA PALETA DE LA PC
  if (ballp.y + dy > ballRadius) {
    dy = +dy;
  } else if (ballp.y - dy < canvas.height - ballRadius) {
    if (ballp.x > PC.positionX && ballp.x < PC.positionX + SIZEX) {
      dy = +dy;
    } else {
      win();
      dy = +dy;
    }
  }
}

function musicfailed() {
  const failed = document.getElementById("failed");

  failed.pause();
  failed.currentTime = 0;
  failed.play();
}

function musicBall() {
  const noteBall = document.getElementById("ballplayer");

  noteBall.pause();
  noteBall.currentTime = 0;
  noteBall.play();
}

function musicPallette() {
  const noteSound = document.getElementById("paleta");

  noteSound.pause();
  noteSound.currentTime = 0;
  noteSound.play();
}

function win() {
  contWin++;
  wonElement.textContent = `You Have Won : ${contWin}`;
}

function lose() {
  contLose++;
  loseElement.textContent = `You Have Lost :  ${contLose}`;
}

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
  switch (event.key) {
    case "ArrowRight":
      console.log("Move right"); // Borrar log
      if (futureX === 0 || Player.positionX === 350) {
        Player.positionX += SIZEX;
      }
      break;
    case "ArrowLeft":
      console.log("Move left"); // Borrar log
      if (futureX === 0 || Player.positionX === 0) {
        Player.positionX -= SIZEX;
      }
      break;
    default:
      console.log("the key pressed is not a left or right arrow");
  }
}
