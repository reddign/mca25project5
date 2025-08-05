// MINESWEEPER [UNFINISHED]
// By H. 7/28/2025. Last update: 8/5/25
// TO DO:
// Implement a more proper way to set board size.
// Implement board clear.
let canvas= document.querySelector("canvas")
let graphics = canvas.getContext("2d")
graphics.strokeRect(0,0,canvas.width,canvas.height)
let boardSize=1
let rowColCount=100
let squareSize = 30
let currentMineCount=10
let squareColor1="gray"
let squareColor2="dimGray"
let clearColor="sienna"
let firstSweep=true
let mouseX=-900
let mouseY=-900
let gameOver=false
//Board is 300x300.
//List of squares. Position 0: x, P1: y, P2: mine, P3: adjac. mines P4: RowIndex P5: ColIndex
// P6: Hidden/Revealed 
let squareList=[[0,0,0,0,0,0,0]]

function mousePress(event){
    let canvasrect = canvas.getBoundingClientRect()
    mouseX = event.clientX-canvasrect.left
    mouseY = event.clientY-canvasrect.top
    console.log(mouseX,mouseY)
    adjacencyCheck(mouseX,mouseY)
    }


function adjacencyCheck(x,y){
    
    selectedSquare=""
    checkSquare=""
    c = 0
    //Loops through all squares.
    for (let i = 0; i<rowColCount;){
        for (let v = 0; v<rowColCount;){
            // Checks if the square contains the user's click.
            if ( x>squareList[c][0]&&
                x<squareSize+squareList[c][0] &&
                y>squareList[c][1]&&
                y<squareSize+squareList[c][1]){
                    selectedSquare=squareList[c]
                    
            }
            
            v+=1
            c+=1
        }
        i+=1
    }
    c=0
    if (selectedSquare!=""){
        // Checks for if user clicks a mine and hasn't game overed.
        selectedSquare[6]=1
        if (selectedSquare[2]==1 && gameOver==false){
        gameOver=true
        graphics.fillStyle="red"
        graphics.fillText("You triggered a mine! You lose!",50,350)
        console.log(selectedSquare)
        }
        

        else{
            selectedSquare[3]=0
            // Loops through every row and column.
            for (let i = 0; i<rowColCount;){
                for (let v = 0; v<rowColCount;){
                    selectedX = selectedSquare[4]
                    selectedY = selectedSquare[5]
                    //Left Check
                    
                    if (squareList[c][4]==selectedX-1 && squareList[c][5]==selectedY && selectedX!=0){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //UpLeft Check
                    if (squareList[c][4]==selectedX-1 && squareList[c][5]==selectedY-1 && selectedX!=0 && selectedY!=0){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //Up Check
                    if (squareList[c][4]==selectedX && squareList[c][5]==selectedY-1 && selectedY!=0){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //UpRight Check
                    if (squareList[c][4]==selectedX+1 && squareList[c][5]==selectedY-1 && selectedX!=rowColCount && selectedY!=0){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //Right Check
                    if (squareList[c][4]==selectedX+1 && squareList[c][5]==selectedY && selectedX!=rowColCount){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //DownRight Check
                    if (squareList[c][4]==selectedX+1 && squareList[c][5]==selectedY+1 && selectedX!=rowColCount && selectedY!=rowColCount){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //Down Check
                    if (squareList[c][4]==selectedX && squareList[c][5]==selectedY+1 && selectedY!=rowColCount){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                    //DownLeft Check
                    if (squareList[c][4]==selectedX-1 && squareList[c][5]==selectedY+1 && selectedX!=0 && selectedY!=rowColCount){
                        if (squareList[c][2]==1){
                            selectedSquare[3]+=1
                        }
                            
                    }
                v+=1
                c+=1
                }
            
        i+=1
            }
            
        }
            
        
    }
   
}

function showSafeSquare(){
    for (let e = 0; e<squareList.length;){
        
        if (squareList[e][2]==0 && squareList[e][3]==0)
            
            squareList[e][6]=1
        
        e+=1
    }
    
}
function hideMines(){
    // Loops until variable c is greater than currentMineCount.
    for (let c = 0;c<currentMineCount;){
        // Selects a random number.
        rng = Math.floor(Math.random()*squareList.length)
        // If the number has not already been selected, place a mine and increase c.
        if (squareList[rng][2]!=1){
            squareList[rng][2]=1
            c+=1
            
        }
    }
}

function initialize(){
    let i=0
    let v=0
    let c = 0
    boardSize=prompt("What board size do you want? 1 - 10x10 2 - 15x15 3 - 20x20")
    
    if (boardSize==1){
        console.log("1")
        squareSize=30
        rowColCount=10
        currentMineCount=20
       
    }
    if (boardSize==2){
        squareSize=20
        rowColCount=15
        currentMineCount=45
        
    }
    if (boardSize==3){
        squareSize=15
        rowColCount=20
        currentMineCount=80
        
    }

    // Defines every square. 
    for (let i = 0; i<rowColCount; i++){
            for (let v = 0; v<rowColCount; v++){
            squareList.push([squareSize*(i),squareSize*(v),0,0,i,v])
            c+=1
            
            }
        }
    hideMines()
    
    // Sets up the numbers that display the amount of adjacent mines..
    gameOver="intiializing"
    c=0
    for (let i = 0; i<rowColCount; i++){
            for (let v = 0; v<rowColCount; v++){
            adjacencyCheck(squareList[c][0]+(squareSize/2),squareList[c][1]+(squareSize/2))
            squareList[c][6]=0
            c+=1
            
            }
        }
    gameOver=false
    showSafeSquare()
}

function drawBoard(){
    let c = 1
    for (let i = 0; i<rowColCount;){
        for (let v = 0; v<rowColCount;){
            
            // Colors squares.
            
            if (squareList[c][6]==1){
                graphics.fillStyle=clearColor
                graphics.fillRect(squareList[c][0],squareList[c][1],squareSize,squareSize)
            }  
            else if (i%2!=v%2){
                graphics.fillStyle=squareColor1
                graphics.fillRect(squareList[c][0],squareList[c][1],squareSize,squareSize)
                
            }
            else {
                graphics.fillStyle=squareColor2
                graphics.fillRect(squareList[c][0],squareList[c][1],squareSize,squareSize)
                
            }

            // How many mines are adjacent?
            if (squareList[c][6]==1){
                graphics.fillStyle="white"
                graphics.fillText(squareList[c][3],squareList[c][0]+(squareSize/2),squareList[c][1]+(squareSize/2))
            }
            //Box Borders
            graphics.strokeStyle="black"
            // FOR TESTING PURPOSES. REMOVE LATER. Highlights squares with mines.
            // if (squareList[c][2]==1){
            //     graphics.strokeStyle="red"
            // }
            graphics.strokeRect(squareList[c][0],squareList[c][1],squareSize,squareSize)
            c+=1
            v+=1
        }
        i+=1
    }
}

function drawScoreboard(){
    graphics.fillStyle="white"
    graphics.fillRect(0,canvas.height-100,canvas.width,100)
    graphics.strokeRect(0,canvas.height-100,canvas.width,100)
    graphics.fillStyle="red"
    graphics.fillText("Remaining Mines: " + currentMineCount,200,350)
}

function animate(){
    drawBoard()
    drawScoreboard()
}

initialize()
window.setInterval(animate, 60/1000)
console.log(rowColCount)