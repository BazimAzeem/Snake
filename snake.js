class Snake {
  constructor() {
    this.body = [];
    this.len = 3;
    this.xDir = 0;
    this.yDir = 0;
    this.food = createVector(floor(random(width - res) / res) * res, floor(random(height - res - scoreSpace) / res) * res);
    this.dead = false;
  }

  setDir(xDir, yDir) {
    this.xDir = xDir * res;
    this.yDir = yDir * res;
  }

  initializeSnake() {
    for (let i = 0; i < this.len; i++) {
      this.body[i] = createVector(floor((width / res / 2)) * res, floor(((height - scoreSpace) / res / 2)) * res);
    }
  }

  moveSnake() {
    let head = this.body[this.len - 1].copy();
    this.body.shift();

    head.x += this.xDir;
    head.y += this.yDir;

    this.body.push(head);

    this.teleport(head);
  }

  showSnake() {
    for (var i = 0; i < this.len; i++) {
      fill(255);
      stroke(40);

      rect(this.body[i].x, this.body[i].y, res, res);
    }
  }

  showFood() {
    stroke(40);
    fill(200, 255, 0);
    rect(this.food.x, this.food.y, res, res);
  }

  eatFood() {
    let head = this.body[this.len - 1];

    if (head.x === this.food.x && head.y === this.food.y) {
      this.food.x = floor(random(width - res) / res) * res;
      this.food.y = floor(random(height - res - scoreSpace) / res) * res;

      this.len++;
      this.body.push(head);

      score++;
    }
  }

  teleport(head) {
    if (head.x >= width) {
      head.x = 0;
    } else if (head.x <= -res) {
      head.x = width - res;
    } else if (head.y <= -res) {
      head.y = height - res - scoreSpace;
    } else if (head.y >= height - scoreSpace) {
      head.y = 0;
    }
  }

  death() {
    let head = this.body[this.len - 1];

    for (let i = 0; i < (this.len - 1); i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y && this.len > 3) {
        this.dead = true;
      }
    }

    return this.dead;
  }
}