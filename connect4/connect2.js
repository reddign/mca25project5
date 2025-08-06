const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 1;  //1 = red, 2 = y

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
            cell.classList.add("cell","empty");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", handleClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleClick(e){
    const col = parseInt(e.target.dataset.col);
    for (let r=ROWS - 1; r>=0; r--){
        if(board[r][col] ===0){
            board[r][col] = currentPlayer;
            updateCell(r,col);
            if (checkWin(r,col)){
                message.textContent = `Player ${currentPlayer} wins!`;
                disableBoard();
            }else if (isBoardFull()){
                message.textContent = "It's a tie!";
                disableBoard();
            }else{
                currentPlayer = currentPlayer ===1 ? 2 : 1;
                message.textContent = `Player ${currentPlayer}'s turn (${currentPlayer ===1 ? "Red" : "Yellow"})`;
            }
            break;
        }
    }
}

function isBoardFull(){
    for (let c=0; c < COLS; c++){
        if (board[0][c] === 0){
            return false;
        }
    }
    return true;
}

function updateCell(row,col){
    const cellIndex = row*COLS + col;
    const cell = gameBoard.children[cellIndex];
    cell.classList.remove("empty");
    const disc = document.createElement("div");
    disc.classList.add("disc", currentPlayer ===1 ? "red": "yellow");
    cell.appendChild(disc);
}

function disableBoard(){
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function checkWin(row,col){
    const directions = [
        [0,1],
        [1,0],
        [1,1],
        [1,-1]
    ];

    for (const [dr,dc] of directions){
        let count = 1;
        count += countDiscs(row, col, dr, dc);
        count += countDiscs (row, col, -dr, -dc);
        if (count >=4) return true;
    }

    return false;
}

function countDiscs(row, col, dr, dc){
    const player = board[row][col];
    let r = row +dr;
    let c = col +dc;
    let count = 0;

    while (
        r >= 0 && r < ROWS &&
        c >= 0 && c < COLS &&
        board[r][c] === player
    ) {
        count++;
        r += dr;
        c += dc;
    }
    return count;
}

initBoard();