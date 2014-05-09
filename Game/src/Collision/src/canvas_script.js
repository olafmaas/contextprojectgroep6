
function draw() {
	clear();
	
	//Redraw stuff
	drawBouncingBall();
	drawPole();

	//Check collisions
	checkWallCollision(ci);
  	checkPoleCollision(ci, rc);

  	//Move ball around
  	ci.move();
}

function drawBouncingBall(){
  ci.draw();
}

function drawPole(){
  rc.draw();
}

function checkWallCollision(_obj){
  if (_obj.x + _obj.dx > WIDTH || _obj.x + _obj.dx < 0 )
    _obj.dx = -_obj.dx;

  if (_obj.y + _obj.dy > HEIGHT || _obj.y + _obj.dy < 0 )
    _obj.dy = -_obj.dy;
}

function checkPoleCollision(_obj, _pole){
	
	//If ball hits top or bottom of pole
	if ( (_obj.x + _obj.dx >= _pole.x && _obj.x + _obj.dx <= _pole.x + _pole.width) && (_obj.y + _obj.dy == _pole.y || _obj.y + _obj.dy == _pole.y + _pole.height) ){
		_obj.dy = -_obj.dy;
	}

	//If ball hits left or right side of pole
	else if ( (_obj.x + _obj.dx == _pole.x || _obj.x + _obj.dx == _pole.x + _pole.width) && (_obj.y + _obj.dy >= _pole.y && _obj.y + _obj.dy <= _pole.y + _pole.height) ){
		_obj.dx = -_obj.dx;
	}
}