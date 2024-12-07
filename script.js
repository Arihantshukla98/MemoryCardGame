const cards = [
    'A', 'A', 'B', 'B', 
    'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 
    'G', 'G', 'H', 'H'
];

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(cardValue => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

resetButton.addEventListener('click', createBoard);

// Initialize the game
createBoard();
// Enhanced shuffle animation
function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(cardValue => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.addEventListener('click', flipCard);
        // Add flip animation delay for staggered reveal
        card.style.animation = `fadeIn 0.5s ease ${Math.random() * 0.5}s`;
        gameBoard.appendChild(card);
    });
}

