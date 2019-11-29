const player1 = 1;
const player2 = 2;
let activePlayer = player1;

// create backgrounds array
let backgrounds = [];
for (let i = 0; i < 9; i++) {
    backgrounds.push("url('img/vogel" + (i + 1) + ".jpeg')");
}
// scores for players
let score1 = 0;
let score2 = 0;

// keep track of which background is used n times
// if 2 remove from arrays so they can't be used anymore
let nBackgroundsUsed = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//array with 18 random backgrounds for 18 divs
let randomBackgrounds = [];
for (let i = 0; i < 18; i++) {
    randomBackgrounds[i] = getRandomBackground();
}
// get a random background for the div, if two times used remove the background
function getRandomBackground() {
    const random = Math.floor(Math.random() * backgrounds.length);
    const background = backgrounds[random];
    nBackgroundsUsed[random]++;
    //with splice you can remove an element from an array
    //https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    if (nBackgroundsUsed[random] > 1) {
        backgrounds.splice(random, 1);
        nBackgroundsUsed.splice(random, 1);
    }
    return background;
}

let divs = [];
let gameState = [];
for (let i = 0; i < 18; i++) {
    gameState[i] = 0;
}
let firstDiv = null;
let secondDiv = null;
// remember the id of first clicked image
let idFirstDiv;

// add divs to wrapper
const imgWrapper = document.getElementById("imgWrapper");
for (let i = 0; i < 18; i++) {
    const div = document.createElement("DIV");
    div.id = "" + i;
    imgWrapper.appendChild(div);
    div.addEventListener('click', function () {
        const id = this.id;
        if (gameState[id] < 1) {
            // first image is clicked
            if (firstDiv === null) {
                executeFirstClick(id);
            // second image is clicked
            } else if (secondDiv === null) {
                executeSecondClick(id);
            }
        }
    });
    divs[i] = div;
}

function executeFirstClick(id) {
    firstDiv = divs[id];
    divs[id].style.backgroundImage = randomBackgrounds[id];
    gameState[id] = 1;
    idFirstDiv = id;
}

function executeSecondClick(id) {
    secondDiv = divs[id];
    gameState[id] = activePlayer;
    divs[id].style.backgroundImage = randomBackgrounds[id];
    if (firstDiv.style.backgroundImage === secondDiv.style.backgroundImage) {
        upScore();
        firstDiv = null;
        secondDiv = null;
    } else {
        // show pic for 1 second
        setTimeout(function () {
            changePlayer(id);
        }, 1000);
    }
}

function changePlayer(id) {
    // set back images
    firstDiv.style.backgroundImage = "url('img/qmark.png')";
    secondDiv.style.backgroundImage = "url('img/qmark.png')";
    // make two divs null again
    firstDiv = null;
    secondDiv = null;
    // set back game state
    gameState[id] = 0;
    gameState[idFirstDiv] = 0;
    if (activePlayer === player1) {
        activePlayer = player2;
    } else {
        activePlayer = player1;
    }
    document.getElementById("active-player").innerText = activePlayer;
}

function upScore() {
    if (activePlayer !== player1) {
        score2++;
    } else {
        score1++;
    }
    // noinspection JSValidateTypes
    document.getElementById("punten1").innerText = score1;
    // noinspection JSValidateTypes
    document.getElementById("punten2").innerText = score2;
}






