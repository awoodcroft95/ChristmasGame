let canvasH= 600;
let canvasW= 600;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//game variables
let startingScore= 0;
let continueGame= false;
let score;

// Santa image
var santaReady = false;
var santaImage = new Image();
santaImage.onload = function () {
	santaReady = true;
};
santaImage.src = "images/santa_small.png";

//Present Image to drop
//var presentReady = false;
//var presentImage = new Image();
//presentImage.onload = function () {
//	presentReady = true;
//};

//present vars
// let presents = [];
// for(let i=0; i< totalPresents;i++){
//     addPresent();
// }

//  function addPresent(){
//     let present= new Image();
//     present.src = "images/RedGreeen.png"
//     resetPresent(present);
//     presents.push(present);
//     }
    
// //move present to random pos at top of canvas with random speed.
// function resetPresent(present){
//     present.x = Math.random() * (canvasW - 32);
//     present.y = 15 + Math.random() * 30;
//     present.speed = 0.2 + Math.random() * 0.5;
// }

//BG Image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bgImage2.png";

let santa={
    x : canvasW/2,
    y :canvasH-100,
    speed : 100
}

let keysDown = {};

//Keyboard Input Listeners
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


//Update & Movement
let update = function (modifier) {
    if (37 in keysDown) { // Player holding left
        if(santa.x===0){
            santa.x=0;
        }
        else{
            santa.x -= santa.speed * modifier;
        }
	}
    if (39 in keysDown) { // Player holding right
        if(santa.x===(canvasW-64)){
            santa.x=canvasW-64;
        }
        else{
            santa.x += santa.speed * modifier;
        }
    }
}

let main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

let render = function () {
    if (bgReady) {
		ctx.drawImage(bgImage,0, 0);
	}    

    if (santaReady) {
		ctx.drawImage(santaImage, santa.x, santa.y);
    }
    
};
let then = Date.now();
main();
