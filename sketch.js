var res;
var scoreSpace;
var xDir;
var yDir;
let snake;
var score;

function setup() {
  res = 20;
  scoreSpace = 2.5 * res;
  xDir = 0;
  yDir = 0;
  score = 0;

  var cnv = createCanvas(25 * res, 25 * res + scoreSpace);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  frameRate(10);

  snake = new Snake();
  snake.initializeSnake();
}

function draw() {
  background(40);
  scoreBoard();

  snake.showFood();
  snake.eatFood();

  snake.moveSnake();
  snake.showSnake();

  endGame();
}

function keyPressed() {
  if (keyCode === UP_ARROW && yDir == 0) {
    xDir = 0;
    yDir = -1;
  } else if (keyCode === DOWN_ARROW && yDir == 0) {
    xDir = 0;
    yDir = 1;
  } else if (keyCode === RIGHT_ARROW && xDir == 0) {
    xDir = 1;
    yDir = 0;
  } else if (keyCode === LEFT_ARROW && xDir == 0) {
    xDir = -1;
    yDir = 0;
  } else if (key === " " && endGame()) {
    setup();
  }

  snake.setDir(xDir, yDir);
}

function scoreBoard() {
  stroke(200);
  strokeWeight(2);
  line(0, 25 * res + 2, width, 25 * res + 2);

  textSize(20);
  text('Score: ' + score, width / 2, height - scoreSpace / 2 + 4);
  textAlign(CENTER, CENTER);
}

function endGame() {
  if (snake.death()) {
    background(40);

    textSize(20);
    text('Your score was ' + score, width / 2, height / 2 + 70);
    text('Hit [ SPACE ] to restart', width / 2, height / 2 + 100);

    textSize(75);
    fill(255, 0 , 0)
    text('GAME OVER', width / 2, height / 2);

    return true;
  } else {
    return false;
  }
}
