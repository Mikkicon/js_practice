"use strict";

const A = 0;
const B = 100;
var counter = 0;
var currentA = A;
var currentB = B;
var currentUserA = A;
var currentUserB = B;
var NUM = Math.floor(Math.random() * (B - A + 1)) + A;

var userInput = null;
var computerGuess = null;
var userInputParsed = null;

var userWon = false;
var computerWon = false;

var AElem = window.document.getElementById("A");
var BElem = document.getElementById("B");
var makeGuessBtnElem = document.getElementById("makeGuessBtn");
var initialPhraseElem = document.getElementById("initialPhrase");
var userGuessInptElem = document.getElementById("userGuessInpt");
var computerGuessElem = document.getElementById("computerGuessH1");
var computerAnswerElem = document.getElementById("computerAnswerH1");

console.log(A, B, "Computer's number: ", NUM);

AElem.innerText = currentA;
BElem.innerText = currentB;
setLessYesMoreBtnsDisabledTo(false);
userGuessInptElem.focus();

function usersNumIsSmaller() {
  if (computerGuess === 0) {
    currentUserB = Math.min(computerGuess, currentUserB);
  } else {
    currentUserB = Math.min(computerGuess - 1, currentUserB);
  }
  if (userWon) {
    computerMakesAGuess();
  } else {
    passGuessToUser();
  }
}

function onComputerWin() {
  document.getElementById(
    "computerGuessH1"
  ).innerText = `MAN, IT FEELS GOOD TO WIN IN ${counter} TRIES :)`;
  setLessYesMoreBtnsDisabledTo(false);
  if (!userWon) makeGuessBtnElem.disabled = false;
  computerWon = true;
  if (userWon && computerWon && confirm("Would you like to play more?")) {
    reSetupGame();
  } else {
    alert("Bye.");
  }
}

function reSetupGame() {
  reInitializeVariables();
  userGuessInptElem.disabled = false;
  makeGuessBtnElem.disabled = false;
  computerAnswerElem.innerText = "";
  computerGuessElem.innerText = "";
  userGuessInptElem.value = "";
  userGuessInptElem.focus();
  initialPhraseElem.style.display = "block";
}

function reInitializeVariables() {
  NUM = Math.floor(Math.random() * (B - A + 1)) + A;
  currentA = A;
  currentB = B;
  currentUserA = A;
  currentUserB = B;
  counter = 0;
  computerWon = false;
  userWon = false;
  userInput = null;
  userInputParsed = null;
  computerGuess = null;
  console.log("Computer's number: ", NUM);
}

function usersNumIsBigger() {
  if (computerGuess === 100) {
    currentUserA = Math.max(computerGuess, currentUserA);
  } else {
    currentUserA = Math.max(computerGuess + 1, currentUserA);
  }
  if (userWon) {
    computerMakesAGuess();
  } else {
    passGuessToUser();
  }
}

function computerMakesAGuess() {
  computerGuess =
    Math.floor(Math.random() * (currentUserB - currentUserA + 1)) +
    currentUserA;
  computerGuessElem.innerText =
    "Is your number: " + String(computerGuess) + "?";
}

function passGuessToUser() {
  setLessYesMoreBtnsDisabledTo(false);
  makeGuessBtnElem.disabled = false;
  computerGuessElem.innerText = "Hmmmmm... \n Your turn";
}

function setLessYesMoreBtnsDisabledTo(param) {
  document.getElementById("lessBtn").disabled = !param;
  document.getElementById("yesBtn").disabled = !param;
  document.getElementById("moreBtn").disabled = !param;
}

function parseUserInput() {
  userInput = userGuessInptElem.value;
  userInputParsed = parseInt(userInput);
  console.log("userInputParsed", userInputParsed);
}

function userMakesGuess() {
  initialPhraseElem.style.display = "none";
  counter++;
  try {
    parseUserInput();
    if (userInput === null) {
      computerAnswerElem.innerText = "Please make a guess.";
    } else if (isNaN(userInputParsed)) {
      computerAnswerElem.innerText = "Input must be a number.";
    } else if (userInputParsed < NUM) {
      computerAnswerElem.innerText = "No, it's bigger then " + userInputParsed;
      currentA = Math.max(userInputParsed + 1, currentA);
    } else if (userInputParsed > NUM) {
      computerAnswerElem.innerText = "No, it's less then " + userInputParsed;
      currentB = Math.min(userInputParsed - 1, currentB);
    } else if (userInputParsed === NUM) {
      computerAnswerElem.innerText = `CONGRATULATIONS! \nYOU'VE GOT IT! \nIT TOOK YOU ${counter} TRIES `;
      userGuessInptElem.disabled = true;
      makeGuessBtnElem.disabled = true;
      if (!computerWon) setLessYesMoreBtnsDisabledTo(true);
      userWon = true;
      if (userWon && computerWon && confirm("Would you like to play more?")) {
        reSetupGame();
      }
    } else {
      alert("Error");
    }
  } catch (e) {
    alert(e);
  }
  if (!computerWon) {
    computerMakesAGuess();
    setLessYesMoreBtnsDisabledTo(true);
    makeGuessBtnElem.disabled = true;
  }
  AElem.innerText = currentA;
  BElem.innerText = currentB;
  userGuessInptElem.value = "";
  userGuessInptElem.focus();
}
