let canvas = document.querySelector("canvas");
let graphics = canvas.getContext('2d');
let x=20;
let y=100;
let snakex = 50;
let snakey = 50;
let snakeWidth = 20, snakeHeight = 20;
let FPS = 500;


function animate(){
    snake();
    moveSnake();
}
function snake(){
    graphics.fillStyle = "white"
    graphics.fillRect(snakex,snakey,snakeWidth,snakeHeight);
}
function moveSnake(){
    
}

window.setInterval(animate,FPS/1000)