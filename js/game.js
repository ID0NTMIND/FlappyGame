var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var background = new Image();
var foreground = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "image/bird.png";
background.src = "image/bg2.png";
foreground.src = "image/fg3.png";
pipeUp.src = "image/pipeUp.png";
pipeBottom.src = "image/pipeBottom.png";

var gap = 90;

// any keydown 
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
}

// creation blocks
var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}


var score = 0;
// position of a bird
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(background, 0, 0, 288, 512);

    for (var i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height +
                gap) || yPos + bird.height >= canvas.height - foreground.height) {
            alert("You lose,ha-ha!");
            location.reload(); // refresh page
        }

        if (pipe[i].x == 5) {
            score++;
        }

    }
    foreground.height = 118;
    ctx.drawImage(foreground, 0, canvas.height - foreground.height, 306, 118);
    ctx.drawImage(bird, xPos, yPos); // еще 2 обхекта ширина и высота

    yPos += grav;
    ctx.fillstyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score " + score, 10, canvas.height - 20);
    requestAnimationFrame(draw);
}


pipeBottom.onload = draw;