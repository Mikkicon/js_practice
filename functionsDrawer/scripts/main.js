"use strict";

function xEqY(x) {
  return x;
}

function squareX(x) {
  return x * x;
}

function rootX(x) {
  return Math.sqrt(x);
}

function main() {
  var canvas = document.getElementById("root");
  let yAxisOffset = ~~(canvas.getBoundingClientRect().width / 2);
  let verticalInterval = 500;
  let functionsList = [xEqY, squareX, rootX];
  let functionsLength = functionsList.length;
  canvas.height = functionsLength * verticalInterval;
  let ctx = canvas.getContext("2d");
  let originsList = drawGraphs({
    ctx,
    yAxisOffset,
    verticalInterval,
    functionsLength
  });
  let gen = drawPoints({ ctx, originsList, yAxisOffset, functionsList });
  setInterval(() => gen.next(), 1000);
}

function drawGraphs({ ctx, yAxisOffset, verticalInterval, functionsLength }) {
  let originsList = [];
  for (let i = 0; i < functionsLength; i++) {
    // vertical axis
    ctx.moveTo(yAxisOffset, i * verticalInterval + 25);
    ctx.lineTo(yAxisOffset, i * verticalInterval + verticalInterval - 25);
    console.log(i * verticalInterval, i * verticalInterval + verticalInterval);
    // horisontal axis
    ctx.moveTo(0, i * ~~verticalInterval + ~~verticalInterval / 2);
    ctx.lineTo(
      yAxisOffset * 2,
      i * ~~verticalInterval + ~~verticalInterval / 2
    );
    console.log(i * ~~(verticalInterval / 2));

    ctx.stroke();
    originsList.push(i * verticalInterval + verticalInterval / 2);
  }
  return originsList;
}
main();

function* drawPoints({ ctx, originsList, yAxisOffset, functionsList }) {
  console.log("Iteration");

  var x = 0;
  while (true) {
    x = x + 1;
    functionsList.forEach((func, index) => {
      var y = func(x);
      console.log(x, y);

      ctx.moveTo(x + yAxisOffset, y + originsList[index]);
      ctx.lineTo(x + 1 + yAxisOffset, func(x + 1) + originsList[index]);
      ctx.stroke();
    });
    yield;
  }
}
