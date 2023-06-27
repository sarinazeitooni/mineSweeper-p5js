let grid;
let cols;
let rows;
let options = new Set();
let mines;

function setup() {
  startButton = document.getElementById("startButton");
  startButton.addEventListener("click", generateGameCanvas);
  resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", generateGameCanvas);
}
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) arr[i] = new Array(rows);
  return arr;
}
function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) grid[i][j].revealed = true;
  }
  setTimeout(function () {
    alert("HAHAHA you lost the game!");
  }, 500);
}
function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        if (grid[i][j].isMine) gameOver();
      }
    }
  }
}
function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) grid[i][j].show();
  }
}
function generateGameCanvas() {
  createCanvas(800, 800);
  colInput = prompt("Enter number of columns");
  rowInput = prompt("Enter number of rows");
  mines = prompt("Enter number of mines");
  cols = Number(colInput);
  rows = Number(rowInput);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
      options.add(`${i},${j}`);
    }
  }
  for (let n = 0; n < mines; n++) {
    let index = floor(random(options.size));
    let choice = Array.from(options)[index].split(",");
    let i = parseInt(choice[0]);
    let j = parseInt(choice[1]);
    options.delete(`${i},${j}`);
    grid[i][j].isMine = true;
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
}
