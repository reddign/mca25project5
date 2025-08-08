let canvas = document.querySelector("canvas");
let graphics = canvas.getContext('2d');

let snakex = 50;
let snakey = 50;
let snakeWidth = 20, snakeHeight = 20;
let FPS = 60;
let direction = "NONE";
let lastDirection = "";
let lives = 3;
let pauseFrames = 0;
let snakeColor = "white";
let changeKeyCount = 0;
let tail = [];
let tailLength = 0; // Tracks how long the tail should be

// Defines food: [X, Y, State]
let food = [50, 50, 0];
makeFood();

function animate() {
    if (pauseFrames === 0) {
        clear();
        snake();
        changeKeyCount++;

        if (lives > 0) {
            moveSnake();
            moveTail();
            checkSnake();
            drawFood();

            if (checkSnakeEatsFood()) {
                collectFood();
            }
        }
    } else {
        pauseFrames -= 1;
    }
}

function snake() {
    graphics.fillStyle = snakeColor;
    graphics.fillRect(snakex, snakey, snakeWidth, snakeHeight);

    graphics.fillStyle = "blue";
    for (let i = 0; i < tail.length; i++) {
        graphics.fillRect(tail[i][0], tail[i][1], snakeWidth, snakeHeight);
    }
}

function clear() {
    graphics.fillStyle = "black";
    graphics.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    if (direction === "UP") snakey -= snakeHeight;
    else if (direction === "DOWN") snakey += snakeHeight;
    else if (direction === "LEFT") snakex -= snakeWidth;
    else if (direction === "RIGHT") snakex += snakeWidth;
}

function moveTail() {
    tail.unshift([snakex, snakey]);
    while (tail.length > tailLength) {
        tail.pop();
    }
}

function checkSnake() {
    if (
        snakex < 0 || snakey < 0 ||
        snakex + snakeWidth > canvas.width ||
        snakey + snakeHeight > canvas.height
    ) {
        resetSnake();
    }
}

function resetSnake() {
    lives -= 1;
    direction = "NONE";
    snakex = 50;
    snakey = 50;
    tail = [];
    tailLength = 0;
    pauseFrames = 60;
}

function makeFood() {
    if (food[2] === 0) {
        let rngX = Math.floor(10 + Math.random() * (canvas.width - 25));
        let rngY = Math.floor(10 + Math.random() * (canvas.height - 25));
        food = [rngX, rngY, 1];
    }
}

function drawFood() {
    graphics.fillStyle = "red";
    graphics.fillRect(food[0], food[1], 15, 15);
}

function checkSnakeEatsFood() {
    let rectSnake = {
        left: snakex,
        top: snakey,
        right: snakex + snakeWidth,
        bottom: snakey + snakeHeight,
    };

    let rectFood = {
        left: food[0],
        top: food[1],
        right: food[0] + 15,
        bottom: food[1] + 15,
    };

    return intersectRect(rectSnake, rectFood);
}

function intersectRect(r1, r2) {
    return !(
        r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top
    );
}

function collectFood() {
    food[2] = 0;
    makeFood();
    growSnake();
    snakeColor = "yellow";
}

function growSnake() {
    tailLength += 1;
}

document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (changeKeyCount >= snakeWidth) {
        if (key === "ArrowDown" && direction !== "UP") {
            direction = "DOWN";
            changeKeyCount = 0;
        }
        if (key === "ArrowUp" && direction !== "DOWN") {
            direction = "UP";
            changeKeyCount = 0;
        }
        if (key === "ArrowLeft" && direction !== "RIGHT") {
            direction = "LEFT";
            changeKeyCount = 0;
        }
        if (key === "ArrowRight" && direction !== "LEFT") {
            direction = "RIGHT";
            changeKeyCount = 0;
        }
    }
});

window.setInterval(animate, 1000 / FPS);