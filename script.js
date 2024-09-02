document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset');
    const winnerMessage = document.getElementById('winner-message');
    let currentPlayer = 'player1';
    const rows = 6;
    const cols = 7;
    const board = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Event listener for clicking on cells
    gameBoard.addEventListener('click', (e) => {
        const col = e.target.dataset.col;
        if (col !== undefined) {
            const row = getEmptyRow(col);
            if (row !== -1) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`.row[data-row="${row}"] .cell[data-col="${col}"]`);
                cell.classList.add(currentPlayer);
                if (checkWin(row, col)) {
                    const winnerColor = currentPlayer === 'player1' ? 'Red' : 'Yellow';
                    winnerMessage.textContent = `${winnerColor} wins!`;
                    gameBoard.style.pointerEvents = 'none'; // Disable further clicks
                } else {
                    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
                }
            }
        }
    });

    // Reset the game
    resetButton.addEventListener('click', () => {
        board.forEach(row => row.fill(null));
        document.querySelectorAll('.cell').forEach(cell => cell.className = 'cell');
        currentPlayer = 'player1';
        winnerMessage.textContent = '';
        gameBoard.style.pointerEvents = 'auto'; // Re-enable clicks
    });

    // Get the lowest empty row in a column
    function getEmptyRow(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                return row;
            }
        }
        return -1;
    }

    // Check for a win
    function checkWin(row, col) {
        return checkDirection(row, col, 1, 0) || // horizontal
               checkDirection(row, col, 0, 1) || // vertical
               checkDirection(row, col, 1, 1) || // diagonal /
               checkDirection(row, col, 1, -1);  // diagonal \
    }

    // Check a direction for four in a row
    function checkDirection(row, col, rowDelta, colDelta) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i * rowDelta;
            const c = col + i * colDelta;
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
});
