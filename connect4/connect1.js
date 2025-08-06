const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 1;  //1 = red, 2 = AI

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

//Initialize board array and render
function initBoard(){
    gameBoard.innerHTML = '';
    for (let r=0; r< ROWS; r++){
        board[r] = [];
        for (let c = 0; c < COLS; c++){
            board[r][c] = 0

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            gameBoard.appendChild(cell);
        }
    }

    gameBoard.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
}

function handleClick(e){
    if (currentPlayer !==1) return;

    const col = parseInt(e.target.dataset.col);
    for (let r=ROWS -1; r>=0; r--){
        if(board[r][c] ===0){
            board[r][c] = currentPlayer;
            updateDell(r, col);

            if (checkWin(r, col)){
                
            }
        }
    }
}
