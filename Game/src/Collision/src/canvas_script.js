window.onload = function(){
	init();
}

//Circle
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;

//Rectangle
var rx = 400;
var ry = 300;
var width = 50;
var height = 100;

function draw() {
	clear();
	
	//Redraw stuff
	drawBouncingBall();
	drawPole();

	//Check collisions
	checkWallCollision();
  	checkPoleCollision();

  	//Move ball around
  	x += dx;
  	y += dy;
}

function drawBouncingBall(){
  circle(x, y, 10);
}

function drawPole(){
  rect(rx, ry, width, height);
}

function checkWallCollision(){
  if (x + dx > WIDTH || x + dx < 0 )
    dx = -dx;

  if (y + dy > HEIGHT || y + dx < 0 )
    dy = -dy;
}

function checkPoleCollision(){
	if (x + dx > rx && x + dx < rx+width && y + dx > ry && y + dx < ry+height){
		dx = -dx;
		dy = -dy;
	}
	//TODO: checken welke kant je raakt, aan de hand van dat het weerkaatsen goed zetten.
}