const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Empate';
    }

    return null;
}

function makeMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        board.children[cellIndex].innerText = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        const winner = checkWin();
        if (winner) {
            if (winner === 'Empate') {
                message.innerText = '¡Es un empate!';
            } else {
                message.innerText = `¡${winner} ha ganado!`;
            }
        }
    }
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    board.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    message.innerText = '';
}

resetButton.addEventListener('click', resetBoard);
