document.getElementById('startGameButton').addEventListener('click', startGame);

let timer;
let timeLeft = 30;
let emptyTile = { row: 3, col: 3 }; // Empty tile starts at bottom-right corner

function startGame() {
    timeLeft = 30;
    emptyTile = { row: 3, col: 3 };
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('message').textContent = '';
    document.getElementById('game-board').innerHTML = '';
    const tiles = shuffle([...Array(15).keys()].map(n => n + 1)); // Create shuffled tiles 1-15
    tiles.push(null); // Add empty space at the end
    createBoard(tiles);
    startTimer();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard(tiles) {
    const gameBoard = document.getElementById('game-board');
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        if (tile === null) {
            tileElement.classList.add('empty');
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener('click', () => moveTile(tileElement, index));
        }
        tileElement.dataset.index = index;
        gameBoard.appendChild(tileElement);
    });
}

function moveTile(tileElement, index) {
    const row = Math.floor(index / 4);
    const col = index % 4;

    if (isAdjacent(row, col)) {
        const emptyIndex = emptyTile.row * 4 + emptyTile.col;
        swapTiles(index, emptyIndex);
        emptyTile = { row, col };
        checkWinCondition();
    }
}

function isAdjacent(row, col) {
    const rowDiff = Math.abs(row - emptyTile.row);
    const colDiff = Math.abs(col - emptyTile.col);
    return (rowDiff + colDiff) === 1;
}

function swapTiles(index1, index2) {
    const gameBoard = document.getElementById('game-board');
    const tiles = gameBoard.children;
    [tiles[index1].textContent, tiles[index2].textContent] = [tiles[index2].textContent, tiles[index1].textContent];
    tiles[index1].classList.toggle('empty');
    tiles[index2].classList.toggle('empty');
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('message').textContent = 'Time is up! Better Luck Next Time !';
            disableTiles();
        }
    }, 1000);
}

function disableTiles() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.removeEventListener('click', () => moveTile(tile, tile.dataset.index)));
}

function checkWinCondition() {
    const gameBoard = document.getElementById('game-board');
    const tiles = Array.from(gameBoard.children);
    const correctOrder = [...Array(15).keys()].map(n => n + 1).concat(null);
    const currentOrder = tiles.map(tile => tile.textContent ? parseInt(tile.textContent, 10) : null);

    if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
        clearInterval(timer);
        document.getElementById('message').textContent = 'Congratulations! You have completed the task!';
    }
}
