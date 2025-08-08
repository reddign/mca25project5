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
let snakeColor="white";
let changeKeyCount=0;
let tail = [];
//Defines food. P0:X, P1: Y, P2: State
let food=[50,50,0]
console.log(food)
console.log(Math.floor(10+Math.random()*370))
 makeFood();
function animate(){
    // If pauseFrames are not active, run animation.
    if (pauseFrames==0){
        clear();
        snake();
        changeKeyCount++;
        // console.log(snakex,snakey);
        if(lives>0){
            moveSnake();
            moveTail();
            checkSnake();
            drawFood();
            if(checkSnakeEatsFood()){
                console.log("Snake ate food.")
                collectFood();
            }
            adjustTail();
            
        }
    }
    // Otherwise, reduce pauseFrames. It will eventually go back to 0.
    else{
        pauseFrames-=1
    }
    
}
function snake(){
    graphics.fillStyle = snakeColor
    graphics.fillRect(snakex,snakey,snakeWidth,snakeHeight);
    //draw tail
    for(let i=0; i<tail.length;i++){
        graphics.fillStyle = "blue";
        graphics.fillRect(tail[i][0],tail[i][1],snakeWidth,snakeHeight);
    }
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
function moveTail(){
    console.log(tail);
    for(let i=0; i<tail.length;i++){
        if(tail[i][2]=="UP")
        {
            // tail[i][0] += 1
             tail[i][1] -= 1 
        }
        if(tail[i][2]=="DOWN")
        {
            // tail[i][0] += 1
             tail[i][1] += 1 
        }
        if(tail[i][2]=="LEFT")
        {
            // tail[i][0] += 1
             tail[i][0] -= 1 
        }
        if(tail[i][2]=="RIGHT")
        {
            // tail[i][0] += 1
             tail[i][0] += 1 
        }
       //check if directions are different
       if(tail[i][2]!=tail[i][3] && tail[i][4]!=0){
            tail[i][4] -= 1
       }else if(tail[i][2]!=tail[i][3] && tail[i][4]==0){
            tail[i][2]=tail[i][3]
            tail[i][4] = snakeWidth;
       }
    }
}
function adjustTail(){
    let changed = false;
    for(let i=0; i<tail.length;i++){
       if(i==0 && tail[i][2]!=direction && tail[i][4]==0){
        if(changed){
            console.log(tail);
        }
         tail[i][3]=direction;
         tail[i][4]=snakeWidth;
         changed = true;
       }else if(i!=0 && changed){
         tail[i][3]=tail[i-1][3];
         tail[i][4]=snakeWidth;
       }
       
    
    }
    if(changed){
        console.log(tail);
    }
    
}
function moveSnakeUp(){
    snakey -= 1;
}
function moveSnakeDown(){
    snakey += 1;
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
    tail = [];
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
        //console.log(food)
    }
}
function drawFood(){
    graphics.fillStyle="red"
    graphics.fillRect(food[0],food[1],15,15)
}
function checkSnakeEatsFood(){
    
    var rectSnake = {
        left: snakex,
        top: snakey,
        right: snakex + snakeWidth,
        bottom: snakey + snakeHeight,
        };

    var rectFood = {
        left: food[0],
        top: food[1],
        right: food[0] + 15,
        bottom: food[1] + 15,
        };
    let ateFood = intersectRect(rectSnake, rectFood);
    if(ateFood){
        snakeColor="yellow";
        return true;
    }else{
        return false;
    }
}
function intersectRect(r1, r2) {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}
function collectFood(){
    food[2]=0
    makeFood();
    growSnake();
    
}
function growSnake(){

    let newx = snakex;
    let newy = snakey;
    if(direction=="UP"){
        newy += snakeHeight
    }
    if(direction=="DOWN"){
        newy -= snakeHeight
    }
    if(direction=="LEFT"){
        newx += snakeWidth
    }
    if(direction=="RIGHT"){
        newx -= snakeWidth
    }
    let segment = [newx,newy,direction,direction,0];
    tail.push(segment);
    console.log(segment)
    console.log(tail)
    
}

document.addEventListener("keydown",function(event){
    const key = event.key;
    const code = event.code;
    //console.log(`Key pressed: ${key}, Code:${code}`);
    if(changeKeyCount>=snakeWidth){
        if(key==="ArrowDown"){
            direction = "DOWN";
            changeKeyCount=0;
        }
        if(key==="ArrowUp"){
            direction = "UP";
            changeKeyCount=0;
        }
        if(key==="ArrowLeft"){
            direction = "LEFT";
            changeKeyCount=0;
        }
        if(key==="ArrowRight"){
            direction = "RIGHT";
            changeKeyCount=0;
        }
    }
});



window.setInterval(animate,FPS/1000);