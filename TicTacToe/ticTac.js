//Tic-Tac-Toe
// By H. 
// Completed August 5th 2025

const canvas= document.querySelector("canvas")
const graphics = canvas.getContext("2d")
graphics.strokeRect(0,0,canvas.width,canvas.height)
//TODO: Implement diagonal crosses, game resetting.

// Squares of the game.
// Pos. 0: X val, P1: Y val, P2: X index, P3: Y index, P4: Value
squares=[]
phase = "initializing"
player= ""
bot=""
action=0
function mousePress(event){
    let canvasrect = canvas.getBoundingClientRect()
    mouseX = event.clientX-canvasrect.left
    mouseY = event.clientY-canvasrect.top
    clickHandler(mouseX,mouseY)
}
function clickHandler(x,y){
    
    console.log(mouseX,mouseY, phase)
    if (phase == "gameOver"){
        if (x>30 && x<110 && y>300 && y<340){
            //Sets the game back to the original state if player selects Yes when prompted.
            resetBoard()
            phase = "initializing"
            x=0
            y=0
            action=0

            graphics.fillStyle="white"
            graphics.fillRect(20,280,260,80)
            graphics.strokeRect(30,300,80,40)
            graphics.strokeRect(190,300,80,40)
            graphics.fillStyle="black"
            graphics.font="30px arial"
            graphics.fillText("X",60,330)
            graphics.fillText("O",220,330)
        }
        if (x>190 && x<270 && y>300 && y<340){
            
        }
    }
    if (phase =="initializing"){
        player=""
        // Checks which box the player picks when the game initially boots, if any
        if (x>30 && x<110 && y>300 && y<340){
            player="X"
            bot="O"
            phase ="player"
            console.log(player)
            graphics.fillStyle="white"
            graphics.fillRect(20,280,260,80)
            graphics.strokeRect(125,300,50,50)
            graphics.fillStyle="black"
            graphics.fillText(player,140,335)
        }
        if (x>190 && x<270 && y>300 && y<340){
            player="O"
            bot="X"
            phase="bot"
            console.log(player)
            graphics.fillStyle="white"
            graphics.fillRect(20,280,260,80)
            graphics.strokeRect(125,300,50,50)
            graphics.fillStyle="black"
            graphics.fillText(bot,140,335)
            
        }
        
    }
    if (action!=12){
    playerAction(x,y)
    setTimeout(botAction,100)
    }
    
    
}
function playerAction(x,y){
    if (phase=="player" && action <9){
        c=0
        for (let i = 0; i<3;){
            for (let v = 0;v<3;){
                if (squares[c][0]<x&&squares[c][0]+80>x && squares[c][1]<y && squares[c][1]+80>y){
                    if (squares[c][4]==""){
                        graphics.fillText(player,squares[c][0]+30, squares[c][1]+50)
                        squares[c][4]=player
                        console.log(c)
                        phase="bot"
                        graphics.fillStyle="white"
                        graphics.fillRect(20,280,260,80)
                        graphics.strokeRect(125,300,50,50)
                        graphics.fillStyle="black"
                        graphics.fillText(bot,140,335)
                        action+=1
                        winCheck()
                    }
                }
                v+=1
                c+=1
                
            }
            i+=1
        }
    }
}
function botAction(){
    if (phase=="bot" && action<9){
        for (let c = 0;c<1;){
            // Selects a random number.
            rng = Math.floor(Math.random()*squares.length)

            // If the number has not already been selected, place there.
            if (squares[rng][4]==""){
                squares[rng][4]=bot
                c+=1
                graphics.fillText(bot,squares[rng][0]+30, squares[rng][1]+50)
                phase="player"
                graphics.fillStyle="white"
                graphics.fillRect(20,280,260,80)
                graphics.strokeRect(125,300,50,50)
                graphics.fillStyle="black"
                graphics.fillText(player,140,335)
                action+=1
                winCheck()
            }
        }
    }   
}
function winCheck(){
    //RowChecks
    if (squares[0][4]==squares[3][4]&& squares[3][4] == squares[6][4] && squares[0][4]!=""){
        console.log("Tic tac toe on the top row.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(30,59)
        graphics.lineTo(270,59)
        graphics.lineTo(270,61)
        graphics.lineTo(30,61)
        graphics.fill()
        graphics.closePath()
        action=12
    }
    if (squares[1][4]==squares[4][4]&& squares[4][4] == squares[7][4] && squares[1][4]!=""){
        console.log("Tic tac toe on the middle row.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(30,139)
        graphics.lineTo(270,139)
        graphics.lineTo(270,141)
        graphics.lineTo(30,141)
        graphics.fill()
        graphics.closePath()
        action=12
    }
    if (squares[2][4]==squares[5][4]&& squares[5][4] == squares[8][4] && squares[2][4]!=""){
        console.log("Tic tac toe on the bottom row.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(30,219)
        graphics.lineTo(270,219)
        graphics.lineTo(270,221)
        graphics.lineTo(30,221)
        graphics.fill()
        graphics.closePath()
        action=12
    }

    //ColChecks
    if (squares[0][4]==squares[1][4]&& squares[1][4] == squares[2][4] && squares[0][4]!=""){
        console.log("Tic tac toe on the left column.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(69,20)
        graphics.lineTo(69,260)
        graphics.lineTo(71,260)
        graphics.lineTo(71,20)
        graphics.fill()
        graphics.closePath()
        action=12
    }
    if (squares[3][4]==squares[4][4]&& squares[4][4] == squares[5][4] && squares[3][4]!=""){
        console.log("Tic tac toe on the middle column.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(149,20)
        graphics.lineTo(149,260)
        graphics.lineTo(151,260)
        graphics.lineTo(151,20)
        graphics.fill()
        graphics.closePath()
        action=12
    }
    if (squares[6][4]==squares[7][4]&& squares[7][4] == squares[8][4] && squares[6][4]!=""){
        console.log("Tic tac toe on the right column.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(229,20)
        graphics.lineTo(229,260)
        graphics.lineTo(231,260)
        graphics.lineTo(231,20)
        graphics.fill()
        graphics.closePath()
        action=12
    }
    //DiagonalChecks
    if (squares[0][4]==squares[4][4]&& squares[4][4] == squares[8][4] && squares[4][4]!=""){
        console.log("Tic tac toe on the top left diagonal.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(30,21)
        graphics.lineTo(269,260)
        graphics.lineTo(270,259)
        graphics.lineTo(31,20)
        graphics.fill()
        graphics.closePath()
        action=12
    }
    if (squares[2][4]==squares[4][4]&& squares[4][4] == squares[6][4] && squares[4][4]!=""){
        console.log("Tic tac toe on the bottom left diagonal.")
        //Line.
        graphics.fillStyle="black"
        graphics.beginPath()
        graphics.moveTo(31,260)
        graphics.lineTo(270,21)
        graphics.lineTo(269,20)
        graphics.lineTo(30,259)
        graphics.fill()
        graphics.closePath()
        action=12
    }

    // If a win has been achieved, ask to play again, disable player/bot actions.
    if (action==12){

        playAgain()
        action=10
    }
    
}
function playAgain(){
    phase="gameOver"
    graphics.fillStyle="white"
    graphics.fillRect(20,280,260,80)
    graphics.strokeRect(30,300,80,40)
    graphics.strokeRect(190,300,80,40)
    graphics.fillStyle="black"
    graphics.font="30px arial"
    graphics.fillText("Play Again?",70,290)
    graphics.fillText("YES",40,330)
    graphics.fillText("NO",210,330)

}
function resetBoard(){
    player=""
    bot=""
    console.log("reset")
    graphics.fillStyle="white"
    graphics.fillRect(1,1,298,398)
    c=0
    for (let i = 0; i <3;){
        for (let v = 0; v <3;){ 
            squares[c][4]=""
            graphics.strokeRect(30+(i*80),20+(v*80),80,80)
            v+=1
            c+=1
        }
        i+=1
    }
}
function initialize(){
    
    // Defines all squares.
    c=0
    for (let i = 0; i <3;){
        for (let v = 0; v <3;){ 
            squares[c]=[30+(i*80),20+(v*80),i,v,""]
            graphics.strokeRect(30+(i*80),20+(v*80),80,80)
            v+=1
            c+=1
        }
        i+=1
    }
    graphics.fillStyle="white"
    graphics.fillRect(20,280,260,80)
    graphics.strokeRect(30,300,80,40)
    graphics.strokeRect(190,300,80,40)
    graphics.fillStyle="black"
    graphics.font="30px arial"
    graphics.fillText("X",60,330)
    graphics.fillText("O",220,330)

}


initialize()