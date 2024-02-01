document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const overlay = document.getElementById('overlay');
    const popupMessage = document.getElementById('popupMessage');
    const newGameBtn = document.getElementById('newGameBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            cellElement.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(index) {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            checkGameResult();
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            updateTurnIndicator();
        }
    }

    function checkGameResult() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                popupMessage.textContent = `Player ${gameBoard[a]} wins!`;
                showPopup();
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            popupMessage.textContent = 'It\'s a tie!';
            showPopup();
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        message.textContent = '';
        renderBoard();
        hidePopup();
        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        message.textContent = `Player ${currentPlayer === 'X' ? 'X' : 'O'}'s Turn (${currentPlayer})`;
    }

    function showPopup() {
        overlay.style.display = 'flex';
    }

    function hidePopup() {
        overlay.style.display = 'none';
    }

    renderBoard();
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);
    updateTurnIndicator();
});
