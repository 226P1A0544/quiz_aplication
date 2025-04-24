document.getElementById('startGameButton').addEventListener('click', startGame);

const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let timer;
let flippedCards = [];
let matchedCards = [];
let timeLeft = 25;

function startGame() {
    timeLeft = 25;
    flippedCards = [];
    matchedCards = [];
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('message').textContent = '';
    document.getElementById('game-board').innerHTML = '';
    const shuffledCards = shuffle(cardsArray);
    createBoard(shuffledCards);
    startTimer();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard(cards) {
    const gameBoard = document.getElementById('game-board');
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.textContent = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
        clearInterval(timer);
        document.getElementById('message').textContent = 'Congratulations! You have completed the task!';
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('message').textContent = 'Time is up!';
            document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', flipCard));
        }
    }, 1000);
}
