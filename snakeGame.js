
function init() {
    canvas = document.getElementById('mycanvas');
     H = canvas.height = 1000;
     W = canvas.width = 2000;
    pen = canvas.getContext('2d');
    cs = 67;
    food = getRandomFood();
    game_over = false;
    score = 5;

    food_img = new Image();
    food_img.src ="Assets/apple.png";

    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }

        },

        updateSnake: function () {


            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                food = getRandomFood();
                score++;
            }
            else {
                this.cells.pop();
            }

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            // according to changing the direction
            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextX = headX;
                nextY = headY - 1;
            }
            // var X = headX +1;
            // var Y = headY;

            this.cells.unshift({ x: nextX, y: nextY });

            // Checking boundary
            var lastX = Math.round(W / cs);
            var lastY = Math.round(H / cs);

            if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY) {
                game_over = true;
            }

        }
    };

    snake.createSnake();

    function keyPressed(e) {
        //change direction
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowUp") {
            snake.direction = "up";
        }
        else {
            snake.direction = "down";
        }
    }
    // Add a Event listner to a document
    document.addEventListener('keydown', keyPressed);



}
function update() {

    snake.updateSnake();
}
function draw() {
    //erase the old one
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x * cs, food.y * cs, cs, cs);

    pen.drawImage(trophy , 25 , 20 ,cs ,cs);
    pen.font = "30px Roboto";
    pen.fillText(score,50,50);


}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }

    return food;
}
function Gameloop() {
    if (game_over == true) {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();

}

init();

var f = setInterval(Gameloop, 100);