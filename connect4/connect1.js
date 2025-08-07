const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 1;  //1 = red, 2 = AI

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

//Initialize board array and render
function inBoard(){
    gameBoard.innerHTML = "";
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
        if(board[r][col] ===0){
            board[r][col] = currentPlayer;
            updateCell(r, col);

            if (checkWin(r,col)){
                message.textContent = `You Won!`;
                disableBoard();
            }else if (isBoardFull()){
                message.textContent = "It's a tie!";
                disableBoard();
            }else{
                currentPlayer = 2;
                message.textContent = "Computer's turn...";
                setTimeout (computerMove, 500);
            }
            break;
        }
    }
}

function computerMove(){
    const validCols = [];
    for(let c=0; c<COLS; c++){
        if (board[0][c]===0) validCols.push(c);
    }
    if (validCols.length === 0) return;

    const col = validCols[Math.floor(Math.random() * validCols.length)];
    for (let r=ROWS - 1; r>=0; r--){
        if (board[r][col] === 0){
            board[r][col] = currentPlayer;
            updateCell(r,col);

            if(checkWin(r,col)){
                message.textContent = "Computer wins! You lost..";
                disableBoard();
            }else if(isBoardFull()){
                message.textContent = "It's a tie!";
                disableBoard();
            }else{
                currentPlayer = 1;
                message.textContent = "Player 1's turn (Red)";
            }
            break;
        }
    }
}
function updateCell(row, col){
    const index = row * COLS + col;
    const cell = gameBoard.children[index];
    const disc = document.createElement("div");
    disc.classList.add(currentPlayer === 1 ? "red" : "yellow");
    cell.appendChild(disc);
}

function checkWin(row,col){
    const player = board[row][col];
    const directions = [
        [0,1],
        [1,0],
        [1,1],
        [1,-1]
    ];

    for (let [dr,dc] of directions){
        let count = 1;
        count += countDiscs(row, col, dr, dc, player);
        count += countDiscs (row, col, -dr, -dc, player);
        if (count >=4) return true;
    }

    return false;
}

function countDiscs(row, col, dr, dc, player){
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

function isBoardFull(){
    for (let c=0; c < COLS; c++){
        if (board[0][c] === 0) return false;
    }
    return true;
}

function disableBoard(){
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => cell.removeEventListener("click", handleClick));
}

inBoard();

