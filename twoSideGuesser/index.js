"use strict";
const A = 0;
const B = 100;
var computerGuess = null;
var currentA = A;
var currentB = B;
var currentUserA = A;
var currentUserB = B;
var NUM = Math.floor(Math.random() * (B - A + 1)) + A;
var userInput = null;
var userInputParsed = null;
var computerWon = false;
var userWon = false;
var counter = 0;

console.log(A, B, "Computer's number: ", NUM);

document.getElementById("A").innerText = currentA;
document.getElementById("B").innerText = currentB;
toggleComputerButtons(true);

function less() {
  if (userWon) {
    currentUserB = Math.max(computerGuess - 1, currentUserB);
    computerGuess =
      Math.floor(Math.random() * (currentUserB - currentUserA + 1)) +
      currentUserA;
    document.getElementById("computerGuess").innerText =
      "IS IT: " + String(computerGuess) + "?";
  } else {
    currentUserB = Math.min(computerGuess - 1, currentUserB);
    document.getElementById("makeGuess").disabled = false;
    toggleComputerButtons(true);
    document.getElementById("computerGuess").innerText = "Hmmmmm...";
  }
}
function win() {
  document.getElementById(
    "computerGuess"
  ).innerText = `MAN, IT FEELS GOOD TO WIN IN ${counter} TRIES :)`;
  toggleComputerButtons(true);
  if (!userWon) document.getElementById("makeGuess").disabled = false;
  computerWon = true;
}

function more() {
  if (userWon) {
    currentUserA = Math.max(computerGuess + 1, currentUserA);
    computerGuess =
      Math.floor(Math.random() * (currentUserB - currentUserA + 1)) +
      currentUserA;
    document.getElementById("computerGuess").innerText =
      "IS IT: " + String(computerGuess) + "?";
  } else {
    currentUserA = Math.max(computerGuess + 1, currentUserA);
    document.getElementById("makeGuess").disabled = false;
    toggleComputerButtons(true);
    document.getElementById("computerGuess").innerText = "Hmmmmm...";
  }
}

function toggleComputerButtons(param) {
  document.getElementById("less").disabled = param;
  document.getElementById("yes").disabled = param;
  document.getElementById("more").disabled = param;
}
function makeGuess() {
  counter++;
  try {
    userInput = document.getElementById("userGuess").value;
    userInputParsed = parseInt(userInput);
    console.log("userInputParsed", userInputParsed);

    if (userInput === null) {
      document.getElementById("computerAnswer").innerText =
        "Please make a guess.";
    } else if (isNaN(userInputParsed)) {
      document.getElementById("computerAnswer").innerText =
        "Input must be a number.";
    } else if (userInputParsed < NUM) {
      document.getElementById("computerAnswer").innerText =
        "No, it's bigger then " + userInputParsed;
      currentA = Math.max(userInputParsed + 1, currentA);
    } else if (userInputParsed > NUM) {
      document.getElementById("computerAnswer").innerText =
        "No, it's less then " + userInputParsed;
      currentB = Math.min(userInputParsed - 1, currentB);
    } else if (userInputParsed === NUM) {
      document.getElementById("computerAnswer").innerText = `CONGRATULATIONS! \
          \nYOU'VE GOT IT! \
            \nIT TOOK YOU ${counter} TRIES `;
      document.getElementById("userGuess").disabled = true;
      document.getElementById("makeGuess").disabled = true;
      if (!computerWon) toggleComputerButtons(false);
      userWon = true;
      // if (computerWon && prompt(`DO YOU WANT TO PLAY MORE?`)) {
      //   document.getElementById("makeGuess").disabled = true;
      //   NUM = Math.floor(Math.random() * (B - A + 1)) + A;
      //   currentA = A;
      //   currentB = B;
      //   currentUserA = A;
      //   currentUserB = B;
      //   counter = 0;
      //   computerWon = false;
      //   console.log("Computer's number: ", NUM);
      // } else if (!prompt(`DO YOU WANT TO PLAY MORE?`)) {
      //   alert("Bye.");
      // }
    } else {
      alert("Error");
    }
  } catch (e) {
    alert(e);
  }
  if (!computerWon) {
    computerGuess =
      Math.floor(Math.random() * (currentUserB - currentUserA + 1)) +
      currentUserA;
    document.getElementById("computerGuess").innerText =
      "IS IT: " + String(computerGuess) + "?";
    toggleComputerButtons(false);
    document.getElementById("makeGuess").disabled = true;
  }
  document.getElementById("A").innerText = currentA;
  document.getElementById("B").innerText = currentB;
  document.getElementById("userGuess").value = "";
  document.getElementById("userGuess").focus();
}
