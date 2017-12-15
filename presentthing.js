//canvas variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let canvasH= 600;
let canvasW= 600;

// game variables
var startingScore = 0;
var continueAnimating = false;
var score;

//bg image
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bgImage2.png";

let bgImage2 = new Image();
bgImage2.onload = function () {
	bgReady = true;
};
bgImage2.src = "images/rudolphBarn.png";

//santa image
var santaImage = new Image();
santaImage.onload = function () {
	santaReady = true;
};
santaImage.src = "images/santaactual.png";

var presentImg2 = new Image();
presentImg2.src = "images/Minepie.png";


// santa variables
let blockHeight = 64;
let blockWidth = 64;
let blockSpeed = 10;
let santa = {
    x : canvasW/2,
    y : canvasH-100,
    width: blockWidth,
    height: blockHeight,
    blockSpeed: blockSpeed
}
let presentImg = new Image();
presentImg.src = "images/RedGreen.png";
// present variables
var rockWidth = 32;
var rockHeight = 32;
var totalRocks = 20;
var rocks = [];
for (var i = 0; i < totalRocks; i++) {
    addRock();
}

let badImg = new Image();
badImg.src = "images/turd.png";


function addRock() {
    var rock = {
        width: rockWidth,
        height: rockHeight,
        type : Math.floor(Math.random() * (3-1) + 1 -0.3),
        subtype : Math.random()
    }
    resetRock(rock);
    rocks.push(rock);
}

// move the rock to a random position near the top-of-canvas
// assign the rock a random speed
function resetRock(rock){
    rock.x = Math.random() * (canvas.width - rockWidth);
    rock.y = 15 + Math.random() * 30;
    rock.speed = (0.2 + Math.random() * 0.5) * 2;
}


//left and right keypush event handlers
document.onkeydown = function (event) {
    if (event.keyCode == 39) {
        santa.x += santa.blockSpeed;
        if (santa.x >= canvas.width - santa.width) {
           santa.x =canvas.width - santa.width;
        }
    } else if (event.keyCode == 37) {
        santa.x -= santa.blockSpeed;
        if (santa.x <= 0) {
            santa.x = 0;
        }
    }
}


function animate() {

    // request another animation frame

    if (continueAnimating) {
        requestAnimationFrame(animate);
    }

    // for each rock
    // (1) check for collisions
    // (2) advance the rock
    // (3) if the rock falls below the canvas, reset that rock

    for (var i = 0; i < rocks.length; i++) {

        var rock = rocks[i];

        // test for rock-block collision
        if (isColliding(rock, santa)) {
            if(rock.type===2){
                score -= 10;
                if(score===-100){
                    continueAnimating=false;
                    window.alert("You suck, Christmas cancelled!");
                }
            }
            else{
                score += 10;
                if(score === 200){
                    continueAnimating=false;
                    window.alert("Game Finished, You saved Christmas!");
                }
            }
            resetRock(rock);
        }

        // advance the rocks
        rock.y += rock.speed;

        // if the rock is below the canvas,
        if (rock.y > canvas.height) {
            resetRock(rock);
        }
    }

    // redraw everything
    drawAll();

}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

function drawAll() {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the background
    // (optionally drawImage an image)
    if(score <=100){
        ctx.drawImage(bgImage,0, 0);
    }
    else{
        ctx.drawImage(bgImage2, 0,0);
    }
    
    // draw the block
    ctx.drawImage(santaImage, santa.x, santa.y);

    // draw all rocks
    for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        // optionally, drawImage(rocksImg,rock.x,rock.y)
        if(rock.type===2){
            ctx.drawImage(badImg, rock.x, rock.y);
        }
        else{
            if (rock.subtype > 0.5){
                ctx.drawImage(presentImg, rock.x, rock.y);
            }
            else {
                ctx.drawImage(presentImg2, rock.x, rock.y);
            }
            
        }
    }

    // draw the score
    ctx.font = "14px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 15);
}

// button to start the game
let main = function() {
    score = startingScore;
    santa.x = 0;
    for (var i = 0; i < rocks.length; i++) 
    {
        resetRock(rocks[i]);
    }
    if (!continueAnimating) {
        continueAnimating = true;
        animate();
    };
};

main();