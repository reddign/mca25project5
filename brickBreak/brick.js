// Brick Breaker 
// By H. 7/22/2025

let canvas= document.querySelector("canvas")
let graphics = canvas.getContext("2d")
let xList =[10]
let yList = [50]
let currentDirection="none"
let padX=200
let padY=380
let key="None"
let ballX=225
let ballY=370
let ballState="float"
let ballDx=1
let ballDy=0
let speedMulti=2
let blockRow=1
let blocksRemaining=0
let lives=3
let score=0
//Block List. P1= Left, P2= Top, P3=State (0=Ded, 1 = Alive)
let blockList=[
    [-500,-500,1]


]



document.addEventListener("keydown", function keyCheck(event){
    // console.log(event.key)
    key=event.key
})

document.addEventListener("keyup", function keyCheck(event){
    // console.log(event.key)
    key="none"
})


spawnBlocks()
window.setInterval(animate, 60/1000)


spawnBlocks()
function animate(){
    clear()
    if (lives>0){
    spawnBlocks()
    drawBlocks()
    movePaddle()
    drawPaddle(padX,padY)
    moveBall()
    drawBall(ballX,ballY)
    drawScoreboard()
    }
    else{
        if (ballState!="gameOver"){
            gameOverText()
            movePaddle()
            drawPaddle(padX,padY)
            moveBall()
            drawBall(ballX,ballY)
        }
        else{
            graphics.fillStyle="rgb(255,131,131)"
            graphics.font="arial"
            graphics.fillText("GAME OVER ",125,220)
        }
    }
    
}


function clear(){
    graphics.fillStyle="black"
    graphics.fillRect(0,0,canvas.width,canvas.height)
}


function drawPaddle(x,y){
    graphics.fillStyle="white"
    graphics.fillRect(x,y,50,5)

    
}

function movePaddle(){
    if ( (key=="a"||key=="ArrowLeft") && padX-4>=0){
     padX-=2
    }
    if (  (key=="d" || key=="ArrowRight" )&& padX+4<=250){
     padX+=2
    }
}

function drawBall(x,y){
    graphics.fillStyle="white"
    graphics.beginPath()
    graphics.arc(x,y,5,0,6.28)
    graphics.fill()
    graphics.closePath()
}
function moveBall(){
    //If ball not launched, follow pad center
    if (ballY>450){
        if (ballX>5 && ballX<295){
            lives-=1
        }
        
        resetBall()
    }
    if (ballState=="float" || lives==0){
        ballX=padX+25
        if ((key=="a"||key=="ArrowLeft")){
            ballDx=-1
        }
        if ((key=="d"||key=="ArrowRight")){
            ballDx=1
        }
        
    }
    //Move ball if launch
    else{
        //Horizontal movement/wall bounce
        if (ballX+5>=300 || ballX-5<=0){
            ballDx*=-1
        }
        

        //Vertical movement/ ceiling bounce
        if (ballY-5<=0){
            ballDy*=-1
        }

        //Paddle Contact
        if ( (ballY>=padY) && (ballY-5<padY)&& (ballX>=padX) && (ballX<=padX+50)){
            //Some calculations that allow the user to control where the ball goes
            ballDx=( (padX+25 )-ballX)/25
            ballDx*=-1
            ballDx*=speedMulti
            //The closer to BallX+25, the higher the ballDy
            ballDy= 1- Math.abs( ballX - (padX+25) )/25
            // console.log(Math.abs(ballDy) )
            if (Math.abs(ballDy)<0.3){
                ballDy=0.3
            }
            ballDy*=-1
            ballDy*=speedMulti
        }

        //Block Contact

        for (let i = 0;i<35;i+=1){
            
            if (blockList[i][2]!=0){
                //Horizontal Contact
                if ((ballX+5 >= blockList[i][0] && ballX-5 <= blockList[i][0]+30)
                && (ballY>blockList[i][1] && ballY<blockList[i][1]+20) ){
                    ballDx*=-1
                    blockList[i][2]=0
                    blocksRemaining-=1
                    score+=100
                }
                //Vertical Contact
                else if ((ballY+5 >= blockList[i][1] && ballY-5 <= blockList[i][1]+20)
                && (ballX>blockList[i][0] && ballX<blockList[i][0]+30) ){
                    ballDy*=-1
                    blockList[i][2]=0
                    blocksRemaining-=1
                    score+=100
                }
                if (blocksRemaining==0){
                    score+=3000
                }
            }        
        }

        ballX+=ballDx
        ballY+=ballDy
    }
    //Ball Launch
    if ( (key=="w" || key=="ArrowUp") && ballState=="float" || lives==0){
        if (lives==0){
            ballDx=0
        }
        else{
        ballState="launch"
        ballDy=-1
        }
    }
}

function spawnBlocks(){
    // console.log(blocksRemaining, ballDy)
    if (blocksRemaining==0 && ballY>200){
        i=0
        v=1
        blockRow=0
        for (let i= 0;i<35;i+=1){
            blockList[i]=[(35*v),30+(25*blockRow),1]
            if ( v %7==0){
                blockRow+=1
                v=0
            }
            v+=1
        }
        blocksRemaining=35
    }
}

function drawBlocks(){
    for (let i = 0;i<35;i+=1){
        if (blockList[i][2]!=0){
            graphics.fillStyle="red"
            graphics.fillRect(blockList[i][0],blockList[i][1],30,20)
        }
    }
}

function drawScoreboard(){
    graphics.fillStyle="lime"
    graphics.font="arial"
    graphics.fillText("Score: " + score,10,10)
    graphics.fillText("Lives: " + lives,200,10)
}
function gameOverText(){
    console.log(ballX, ballState)
    graphics.fillStyle="rgb(255,131,131)"
    graphics.font="arial"
    graphics.fillText("Your final score: " + score,100,200)
    graphics.fillText("Play again? ",125,220)
    graphics.strokeStyle="rgb(255,131,131)"
    graphics.strokeRect(35,260,50,500)
    graphics.strokeRect(185,260,50,500)
    graphics.fillText("YES",50,300)
    graphics.fillText("NO",200,300)
    graphics.strokeStyle="black"
    if ( (key=="w" || key=="ArrowUp") && ((ballX>30 && ballX<100)) &&
    ballState!="gameOver"){
        initialize()
        
    }
    if ( (key=="w" || key=="ArrowUp") && (ballX>180 && ballX<250)){
        ballState="gameOver"
    }
}


function resetBall(){
    ballX=padX+25
    ballY=370
    ballDx=0
    ballDy=0
    ballState="float"
}
function initialize(){
    lives=3
    score=0
    padX=200
    padY=380
    key="None"
    ballX=225
    ballY=370
    ballState="float"
    ballDx=1
    ballDy=0
    blocksRemaining=0
}
