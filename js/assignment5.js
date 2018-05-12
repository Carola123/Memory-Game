// Card data
const cardsArray = [{
    'name': 'chik',
    'img': './img/chik.jpg',
}, {
    'name': 'dexter',
    'img': './img/dexter.jpg',
}, {
    'name': 'dog',
    'img': './img/dog.jpg',
}, {
    'name': 'flower',
    'img': './img/flower.jpg',
}, {
    'name': 'poo',
    'img': './img/poo.jpg',
}, {
    'name': 'tweety',
    'img': './img/tweety.jpg',
}, ];
// Grab the div with an id of root
const game = document.getElementById('game');
// Create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
// Append the grid section to the game div
game.appendChild(grid);
let gameGrid = cardsArray.concat(cardsArray);
// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random());
// For each item in the cardsArray array...
for (var i = 0; i < gameGrid.length; i++) {
    // Create a div
    const card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name;
    // Apply the background image of the div to the cardsArray image
    card.style.backgroundImage = 'url(' + gameGrid[i].img + ')';

    // Create front of card
    const front = document.createElement('div');
    front.classList.add('front');

    // Create back of card, which contains 
    const back = document.createElement('div');
    back.classList.add('back');
    card.style.backgroundImage = 'url(' + gameGrid[i].img + ')';

    // Append card to grid, and front and back to each card
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
};

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1000;
// Add event listener to grid
grid.addEventListener('click', function(event) {
    // The event target is our clicked item
    let clicked = event.target;
    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
        return;
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            // Assign first guess
            firstGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        } else {
            // Assign second guess
            secondGuess = clicked.dataset.name;
            clicked.classList.add('selected');
        }
        // If both guesses are not empty...
        if (firstGuess !== '' && secondGuess !== '') {
            // and the first guess matches the second match...
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
    }
    previousTarget = clicked;

});
// Add match CSS
function match() {
    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    };
};

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;

    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};