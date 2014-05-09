
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
	checkWallCollision(ci);
  	checkPoleCollision(ci);

  	//Move ball around
  	ci.move();
}

function drawBouncingBall(){
  ci.draw();
  //circle(x, y, 10);
}

function drawPole(){
  rect(rx, ry, width, height);
}

function checkWallCollision(_obj){
  if (_obj.x + _obj.dx > WIDTH || _obj.x + _obj.dx < 0 )
    _obj.dx = -_obj.dx;

  if (_obj.y + _obj.dy > HEIGHT || _obj.y + _obj.dy < 0 )
    _obj.dy = -_obj.dy;
}

function checkPoleCollision(_obj){
	
	//If ball hits top or bottom of pole
	if ( (_obj.x + _obj.dx >= rx && _obj.x + _obj.dx <= rx + width) && (_obj.y + _obj.dy == ry || _obj.y + _obj.dy == ry + height) ){
		_obj.dy = -_obj.dy;
	}

	//If ball hits left or right side of pole
	else if ( (_obj.x + _obj.dx == rx || _obj.x + _obj.dx == rx + width) && (_obj.y + _obj.dy >= ry && _obj.y + _obj.dy <= ry + height) ){
		_obj.dx = -_obj.dx;
	}
}