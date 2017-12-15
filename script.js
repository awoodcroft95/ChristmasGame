let canvas = document.getElementById("myCanvas");
let canvasH= 600;
let canvasW= 600;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
//ctx.fillStyle = "#FF0000";
//ctx.fillRect(0, 0, canvasH, canvasW);

// Santa image
var santaReady = false;
var santaImage = new Image();
santaImage.onload = function () {
	santaReady = true;
};
santaImage.src = "images/au_puch.png";

let santa={
    x : canvasW/2,
    y :canvasH-32,
    speed : 100
}

let presents={
}

let evil={
}

let powerups={
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
var update = function (modifier) {
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

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var render = function () {
	if (santaReady) {
		ctx.drawImage(santaImage, santa.x, santa.y);
	}
};
var then = Date.now();
main();
