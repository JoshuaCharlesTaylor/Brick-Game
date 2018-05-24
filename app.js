var canvas = $("#myCanvas")[0];
var ctx = canvas.getContext("2d");
var x = canvas.width/2 - 5;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var paddleMove = 440;
var brickRowCount = 5;
var brickColumnCount = 34;
var brickWidth = 15;
var brickHeight = 15;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var fourball = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}  
function drawVoid(){
    ctx.beginPath();
    ctx.rect(0, 490, 900, 10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleMove, 480, 20, 10);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "gray";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    fourball++;
                    if(fourball == 10){
                    lives++;
                    fourball=0;
                }
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
} 
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawVoid();
    drawScore();
    drawLives();
    collisionDetection();
    
    if(x + dx > canvas.width-10 || x + dx < 10) {
        dx = -dx;
    }
    if(y + dy < 10) {
        dy = -dy;
    } else if(y + dy > canvas.height-10) {
        if(x > paddleMove && x < paddleMove + 20) {
            dy = -dy;
        }else{
            lives--;
            if(!lives) {
                alert("Game Over");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
            }
         }
    }
    if(rightPressed && paddleMove < canvas.width-20){
        paddleMove +=3
    }else if(leftPressed && paddleMove > 0){
        paddleMove -=3
    }
    
    
    
    x += dx;
    y += dy;
}
    
    setInterval(draw, 10);