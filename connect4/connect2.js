const ROWS = 6;
const COLS = 7;
const board = []
let currentPlayer = 1;   //1 = red, 2 = yellow

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

drawboard();

// function instructions(){  //TODO Make the instructions work, not line broken
//     graphics.beginPath();
//     graphics.roundRect(10,200,300,200,10);
//     graphics.fillStyle = '#dce7edcf';
//     graphics.fill();
//     graphics.strokeStyle = '#575c5f1a';
//     graphics.lineWidth = 5;

//     graphics.stroke();


//     graphics.fillStyle = "black";
//     graphics.strokeStyle = "black";
//     let message = "Instructions:" + "\nPlayers choose yellow or red disks" + "\nThen, take turns and drop the discs into the grid.\n" +
//     "Use strategy to block opponents while aiming to" + "\nbe the first player to get 4 in a row." 
//     graphics.fillText(message,25,225);
// }




function drawboard(){
    graphics.beginPath();
    graphics.roundRect(370,5,530,430,10);
    graphics.fillStyle = '#94d5fdff';
    graphics.fill();
    graphics.strokeStyle = '#2da6f1ff';
    graphics.lineWidth = 5;

    graphics.stroke();
}

function initBoard(){
    gameBoard.innerHTML = '';
    for (let r=0; r<ROWS; r++){
        board[r] = [];
        for (let c = 0; c < COLS; c++){
            board[r][c] = 0

            const cell = document.createElement("div");
            cell.classList.add("cell","empty");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", handleClick);
            gameBoard.appendChild(cell);
        }
    }
}
//draws yellow circle
function drawblocky(){
    graphics.fillStyle = "yellow";
    graphics.beginPath();
    graphics.arc(x,y,20,0,Math.PI*2);
    graphics.fill();
    graphics.closePath();
}

//Draws red circle
function drawblockr(){
    graphics.fillStyle = "red";
    graphics.beginPath();
    graphics.arc(x,y,20,0,Math.PI*2);
    graphics.fill();
    graphics.closePath();
}

function checkwin(){
    console.log("Checks to see if there is four in a row")
}

