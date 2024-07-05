const characters = [
    "harry", "hermione", "ron", "dumbledore", "snape", "voldemort", "draco", "luna"
];

const gameBoard = document.getElementById("game-board");
const popup = document.getElementById("popup");
const heartsContainer = document.getElementById("hearts");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

let cardArray = [...characters, ...characters];
cardArray.sort(() => 0.5 - Math.random());

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back" style="background-image: url('images/${character}.jpg');"></div>
        </div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
}

cardArray.forEach(character => createCard(character));

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedPairs++;

    if (matchedPairs === characters.length) {
        setTimeout(() => {
            showPopup();
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showPopup() {
    popup.classList.add("show");
    generateHearts();
}

function generateHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.animationDuration = `${2 + Math.random() * 2}s`;
        heartsContainer.appendChild(heart);
    }
}

yesButton.addEventListener("click", () => {
    const phoneNumber = "3521381578"; // Reemplaza con tu número de teléfono
    const message = "¡Hola! Dije que SI!!!!! jajajaj (Remplaza por lo que quieras)";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
});

noButton.addEventListener("click", () => {
    noButton.style.display = "none";
});
