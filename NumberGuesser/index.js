"use strict";
const A = 0;
const B = 100;
var currentA = A;
var currentB = B;
var NUM = Math.floor(Math.random() * (B - A + 1)) + A;
let userInput = null;
let userInputParsed = null;
console.log(A, B, "Computer's number: ", NUM);

while (1) {
  try {
    userInput = prompt(
      "Guess number in range " + currentA + " and " + currentB
    );
    userInputParsed = parseInt(userInput);
    if (userInput === null) {
      break;
    } else if (isNaN(userInputParsed)) {
      alert("Input must be a number.");
    } else if (userInputParsed < NUM) {
      alert("No, it's bigger then " + userInputParsed);

      currentA = Math.max(userInputParsed + 1, currentA);
    } else if (userInputParsed > NUM) {
      alert("No, it's less then " + userInputParsed);
      currentB = Math.min(userInputParsed - 1, currentB);
    } else {
      if (
        confirm(
          "CONGRATULATIONS! \
          \nYOU'VE GOT IT! \
          \nDO YOU WANT TO PLAY MORE?"
        )
      ) {
        NUM = Math.floor(Math.random() * (B - A + 1)) + A;
        currentA = A;
        currentB = B;
        console.log("Computer's number: ", NUM);
      } else {
        break;
      }
    }
  } catch (e) {
    alert(e);
  }
}
