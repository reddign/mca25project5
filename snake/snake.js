let canvas = document.querySelector("canvas");
let graphics = canvas.getContext('2d');
let x=20;
let y=100;
let snakex = 50;
let snakey = 50;
let snakeWidth = 20, snakeHeight = 20;
let FPS = 500;
let direction = "NONE";
let lives = 3;
function animate(){
    clear();
    snake();
    console.log(snakex,snakey);
    if(lives>0){
        moveSnake();
        checkSnake();   
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
        lives--;
        pause();
        snakex=30;
        snakey=50;

    }
}
function pause(){
    let x=1;
    while(x<1000000000){
        x++;
    }
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

window.setInterval(animate,FPS/1000)