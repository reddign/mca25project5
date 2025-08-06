let canvas = document.querySelector("canvas");
let graphics = canvas.getContext('2d');
let x=20;
let y=100;
let snakex = 50;
let snakey = 50;
let snakeWidth = 20, snakeHeight = 20;
let FPS = 500;
let direction = "NONE";
let lastDirection = "";
let lives = 3;
let pauseFrames= 0;
//Defines food. P0:X, P1: Y, P2: State
let food=[50,50,0]
console.log(food)
console.log(Math.floor(10+Math.random()*370))
function animate(){
    // If pauseFrames are not active, run animation.
    if (pauseFrames==0){
        clear();
        snake();
        // console.log(snakex,snakey);
        if(lives>0){
            moveSnake();
            checkSnake();
            makeFood();
            drawFood()
        }
    }
    // Otherwise, reduce pauseFrames. It will eventually go back to 0.
    else{
        pauseFrames-=1
    }
    
}
function snake(){
    graphics.fillStyle = "white"
    graphics.fillRect(snakex,snakey,snakeWidth,snakeHeight);
}
function clear(){
    graphics.fillStyle = "black"
    graphics.fillRect(0,0,canvas.width,canvas.height);
}
//Snake Functions
function moveSnake(){
    if(direction=="UP"){
        moveSnakeUp()
    }else if(direction=="DOWN"){
        moveSnakeDown()
    }else if(direction=="LEFT"){
        moveSnakeLeft()
    }else if(direction=="RIGHT"){
        moveSnakeRight()
    }
}
function moveSnakeDown(){
    snakey += 1;
}
function moveSnakeUp(){
    snakey -= 1;
}
function moveSnakeRight(){
    snakex += 1;
}
function moveSnakeLeft(){
    snakex -= 1;
}
function checkSnake(){
    if(snakex < 0 || snakey < 0 || snakex+snakeWidth > canvas.width || snakey+snakeHeight > canvas.height){
        resetSnake();

    }
}
function resetSnake(){
    lives-=1;
    direction="";
    snakex=50;
    snakey=50;
    // Pauses the game for a bit.
    pauseFrames=200;
}

function pause(){
    let x=1;
}

function makeFood(){
    if (food[2]==0){
        rngX=Math.floor(10+Math.random()*370)
        rngY=Math.floor(10+Math.random()*370)
        food=[rngX,rngY,1]
        console.log(food)
    }
}
function drawFood(){
    graphics.fillStyle="red"
    graphics.fillRect(food[0],food[1],15,15)
}

document.addEventListener("keydown",function(event){
    const key = event.key;
    const code = event.code;
    console.log(`Key pressed: ${key}, Code:${code}`);

    if(key==="ArrowDown"){
        direction = "DOWN";
    }
    if(key==="ArrowUp"){
         direction = "UP";
    }
    if(key==="ArrowLeft"){
        direction = "LEFT";
    }
    if(key==="ArrowRight"){
         direction = "RIGHT";
    }
});

window.setInterval(animate,FPS/1000);