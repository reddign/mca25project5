let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
const segmentSize = 20;
const foodSize = 15;
const updatesPerSecond = 10;
const growAmount = 1;

let snakeSegments = [{ x: 50, y: 50 }];
let direction = "NONE";
let lives = 3;
let pauseFrames = 0;
let food = { x: 0, y: 0, isEaten: true };

spawnFood();
setInterval(runFrame, 1000 / updatesPerSecond);

function runFrame() {
  if (pauseFrames > 0) {
    pauseFrames--;
    return;
  }

  let head = { ...snakeSegments[0] };
  switch (direction) {
    case "UP": head.y -= segmentSize; break;
    case "DOWN": head.y += segmentSize; break;
    case "LEFT": head.x -= segmentSize; break;
    case "RIGHT": head.x += segmentSize; break;
  }
  snakeSegments.unshift(head);

  if (isOverlap(
        head.x, head.y, segmentSize, segmentSize,
        food.x, food.y, foodSize, foodSize
      )) {
    food.isEaten = true;
    for (let i = 0; i < growAmount; i++) {
      let last = snakeSegments[snakeSegments.length - 1];
      snakeSegments.push({ x: last.x, y: last.y });
    }
  } else {
    snakeSegments.pop();
  }

  if (food.isEaten) {
    spawnFood();
  }

  clearScreen();
  drawFood();
  drawSnake();

  if (hitWall(head) || hitSelf(head)) {
    loseLife();
  }
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "white";
  ctx.fillRect(
    snakeSegments[0].x,
    snakeSegments[0].y,
    segmentSize,
    segmentSize
  );

  ctx.fillStyle = "blue";
  for (let i = 1; i < snakeSegments.length; i++) {
    ctx.fillRect(
      snakeSegments[i].x,
      snakeSegments[i].y,
      segmentSize,
      segmentSize
    );
  }
}

function spawnFood() {
  food.x = Math.floor(10 + Math.random() * (canvas.width - 20));
  food.y = Math.floor(10 + Math.random() * (canvas.height - 20));
  food.isEaten = false;
}

function drawFood() {
  if (!food.isEaten) {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, foodSize, foodSize);
  }
}

function isOverlap(x1,y1,w1,h1, x2,y2,w2,h2) {
  return !(
    x2 >  x1 + w1 ||
    x2 + w2 < x1 ||
    y2 >  y1 + h1 ||
    y2 + h2 < y1
  );
}

function hitWall(head) {
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x + segmentSize > canvas.width ||
    head.y + segmentSize > canvas.height
  );
}

function hitSelf(head) {
  for (let i = 1; i < snakeSegments.length; i++) {
    if (
      head.x === snakeSegments[i].x &&
      head.y === snakeSegments[i].y
    ) {
      return true;
    }
  }
  return false;
}

function loseLife() {
  lives--;
  snakeSegments = [{ x: 50, y: 50 }];
  direction = "NONE";
  pauseFrames = updatesPerSecond * 2;
  food.isEaten = true;
}

const oppositeDirections = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
  NONE: ""
};

document.addEventListener("keydown", e => {
  const keyToDir = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT"
  };
  let newDir = keyToDir[e.key];
  if (newDir && newDir !== oppositeDirections[direction]) {
    direction = newDir;
  }
});