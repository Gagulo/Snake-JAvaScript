var snake;
var grid = 20;
var food;

function setup() {
    createCanvas (600, 600);
    snake = new Snake();
    frameRate(10);
    randomLocation();
}

function randomLocation() {
    let cols = floor(width/grid);
    let rows = floor(height/grid);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(grid);
}

function draw() {
    background(51)
    snake.update();
    snake.show();

    if (snake.eat(food)) {
        randomLocation();
    };

    fill(255, 100, 100);
    rect(food.x, food.y, grid, grid);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    }
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;

    this.eat = function (pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if ( d < 1) {
            return true;
        } else {
            return false;
        }
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    this.update = function () {
        this.x = this.x + this.xspeed*grid;        
        this.y = this.y + this.yspeed*grid;

        this.x = constrain(this.x, 0, width-grid);
        this.y = constrain(this.y, 0, height-grid);
    }

    this.show = function() {
        fill(255);
        rect(this.x, this.y, grid, grid);
    }
}