//Global variables 
const deck = document.querySelector(".deck");
const reset = document.querySelector(".restart");
const moveCount = document.querySelector(".moves");
const starsArray = document.querySelectorAll(".fa-star");
const timer = document.querySelector(".timer");
let moveCounter;
let allCardsMatched;
let openCards = new Array();
//Modal Variables
let modal = document.querySelector(".modal");
let modalStars = document.querySelector(".modalStars");
let modalTime = document.querySelector(".modalTime");
let noBtn = document.querySelector(".noBtn");
let yesBtn = document.querySelector(".yesBtn");
let mStars = 3;
//Time Calculation Variables
let hrs = 0;
let mins = 0;
let secs = 0;
let t; //TimeOut function

// List that holds all cards
const cards = [
  'fa fa-diamond',
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-cube',
  'fa fa-bomb',
  'fa fa-bomb',
  'fa fa-leaf',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-bicycle',
];

//Function to set counter
function setCounter() {
  moveCounter = 0;
  moveCount.textContent = moveCounter;
}

//Function to add moves to counter and display it
function incrementCounter() {
  moveCounter++;
  moveCount.textContent = moveCounter;
  changeStarColor();
}

//Function to initialize cards matched counter
function setCardsMatched() {
  allCardsMatched = 0;
}

//Function to initialize stars color to black
function setInitialStars() {
  for (let i = 0; i < starsArray.length; i++) {
    starsArray[i].style.color = "black";
  }
}

//Function to check if all cards have been flipped
function allCardsFlipped() {
  allCardsMatched = allCardsMatched + 2;
  

  if (allCardsMatched === 16) {
    gameEndMessage();
  }
}

//Function to change stars color to red based on the number of moves
function changeStarColor() {
  if (moveCounter >= 20 && moveCounter < 35) {
    starsArray[2].style.color = "red";
    mStars = 2;
  } else if (moveCounter >= 35) {
    starsArray[1].style.color = "red";
    mStars = 1;
  }
}

//Function to restart timer, help from https://www.w35chools.com/jsref/met_win_;leartimeout.asp
function setTimer() {
  if (t !== null) { //clear time out so that multiple timers dont start  
    clearTimeout(t);
  }
  secs = 0;
  mins = 0;
  hrs = 0;
}

//Function to calculate elapsed time, help from https://www.ostraining.com/blog/coding/stopwatch/
function calcTime() {
  secs++;
  if (secs === 60) {
    mins++;
    secs = 0;
  } else if (mins === 60) {
    hrs++;
    mins = 0;
  }
  if (mins < 10 && secs < 10) {
    timer.innerHTML = `Time elapsed: ${hrs}:0${mins}:0${secs}`;
  } else if (secs < 10) {
    timer.innerHTML = `Time elapsed: ${hrs}:${mins}:0${secs}`;
  } else if (mins < 10) {
    timer.innerHTML = `Time elapsed: ${hrs}:0${mins}:${secs}`;
  } else {
    timer.innerHTML = `Time elapsed: ${hrs}:${mins}:${secs}`;

  }
  t = setTimeout(calcTime, 1000);
}

//Function for displaying end of game message
function gameEndMessage() {
  console.log(mStars);
  modalStars.innerHTML = ` Stars : ${mStars} `;
  modalTime.textContent = timer.textContent;
  modal.style.display = "block";
  clearTimeout(t);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Function to rename elements based on the shuffled array
function addCardHTML(cards) {
  const liElements = deck.getElementsByTagName("li");
  const iElements = deck.getElementsByTagName("i");

  for (let i = 0; i < liElements.length; i++) {
    liElements[i].className = "card";
    iElements[i].className = cards[i];
  }
}

//Function to start/restart game and set parameters
function startGame() {
  shuffle(cards);
  addCardHTML(cards);
  setTimer();
  calcTime();
  setCounter();
  setCardsMatched();
  setInitialStars();
}

//Function to flip cards and push them in array
function flipCard(e) {
  console.log(e.target.className);
  console.log(e.target.tagName);
  if (e.target.tagName === "LI") {
    if (e.target.className !== "card match" && e.target.className !== "card open show") {
      e.target.className = "card open show";
      openCards.push(e.target);
      setTimeout(function () {
        matchCards()
      }, 900);
      incrementCounter();
    }
  }
}

//Function to check if cards match or not. If they match, keep them open. If they don't, flip them again
function matchCards() {
  if (openCards.length === 2) {    
    let oneCard = openCards.pop();
    let secondCard = openCards.pop();


    if (oneCard.childNodes[1].className === secondCard.childNodes[1].className) {

      oneCard.className = "card match";
      secondCard.className = "card match";
      allCardsFlipped();
    } else {
      oneCard.className = "card";
      secondCard.className = "card";
    }
  }
}

// Function call to start game
startGame();

//Event listener for opening a card
deck.addEventListener("click", function (e) {
  if (openCards.length < 2) {
    flipCard(e);
  } else {
    return false;
  }
  if (e.target.className !== "deck") {
    flipCard(e);
  }
})

//Event Listener for resetting the game
reset.addEventListener("click", function () {
  startGame();
})

//If the user does not want to play the game, close the popup dialog box
noBtn.addEventListener("click", function () {
  modal.style.display = "none";
})

//If the user wants to play the game, close the dialog box and restart game
yesBtn.addEventListener("click", function () {
  modal.style.display = "none";
  startGame();
})