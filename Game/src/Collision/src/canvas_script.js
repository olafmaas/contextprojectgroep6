window.onload = function(){
	init();
}

//Circle
var x = 320;
var y = 100;
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
	
	//If ball hits top of pole
	if ( (x + dx >= rx && x + dx <= rx+width) && (y + dy == ry) ){
		dy = -dy;
	}

	//If ball hits left side of pole
	else if ( (x + dx == rx) && (y + dy >= ry && y + dy <= ry + height) ){
		dx = -dx;
	}
	
	//If ball hits right side of pole
	else if ( (x + dx == rx + width) && (y + dy >= ry && y + dy <= ry + height) ){
		dx = -dx;
	}

	//If ball hits bottom of pole	
	else if ( (x + dx >= rx && x + dx <= rx+width) && (y + dy == ry + height) ){
		dy = -dy;
	}
	

}