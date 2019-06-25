'use strict';

var answer = confirm("Backward fibonacci: 'OK'; \nUsual: 'Cancel' \nFirst 10 numbers will be printed by default");
var amount = 10;

function* fibo({ back }) {
    let nMin1 = 1;
    let nMin2 = 0;
    let tempResult = 0;
    if (back) {
        while (1) {
            yield tempResult;
            tempResult = nMin2 - nMin1
            nMin2 = nMin1;
            nMin1 = tempResult;
        }
    } else {
        // I understand that dublicate code is a bad tone, 
        // however in this case it is better then 
        // conditional on every iteration of while true
        while (1) {
            yield tempResult;
            tempResult = nMin2 + nMin1
            nMin2 = nMin1;
            nMin1 = tempResult;
        }
    }
}
const gen = fibo({ back: answer });
while (amount) {
    for (let i = 0; i < amount; i++) {
        console.log(gen.next().value);
    }
    amount = Number(prompt("How many more numbers?\nOr 'Cancel' to stop"));
}