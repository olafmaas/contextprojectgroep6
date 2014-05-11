
function draw() {
	clear(); //clear the screen
	
	//Redraw stuff
	drawBouncingBall();
	drawPole();
	drawShield(MOUSEX, MOUSEY);

	//Check collisions
	checkWallCollision(ci);
  	checkPoleCollision(ci, rc);

  	//Move ball around
  	ci.move();
}

//Draws the ball
function drawBouncingBall(){
  ci.draw();
}

//Draws the poles
function drawPole(){
  rc.draw();
}

//Draws the shield
function drawShield(_mouseX, _mouseY){
  sh.draw(_mouseX, _mouseY);
}

//Checks the collision of an object with the wall
function checkWallCollision(_obj){

  //If object hits one of the walls on the sides
  if (_obj.x + _obj.dx > WIDTH || _obj.x + _obj.dx < 0 )
    _obj.dx = -_obj.dx;

  //If object hits one of the walls on the top or bottom
  if (_obj.y + _obj.dy > HEIGHT || _obj.y + _obj.dy < 0 )
    _obj.dy = -_obj.dy;
}

//Checks the collision of an object with a pole
function checkPoleCollision(_obj, _pole){
	
	//If object hits top or bottom of pole
	if ( ( (_obj.x + _obj.dx >= _pole.x) && (_obj.x + _obj.dx <= _pole.x + _pole.width) ) && ( _obj.y + _obj.dy == _pole.y ) ){
		_obj.dy = -_obj.dy;
	} 
	else if ( ( (_obj.x + _obj.dx >= _pole.x) && (_obj.x + _obj.dx <= _pole.x + _pole.width) ) && ( _obj.y + _obj.dy == _pole.y + _pole.height ) ){
		_obj.dy = -_obj.dy;
	}

	//If object hits left or right side of pole
	else if ( ( (_obj.x + _obj.dx == _pole.x) || (_obj.x + _obj.dx == _pole.x + _pole.width) ) && ( (_obj.y + _obj.dy >= _pole.y) && (_obj.y + _obj.dy <= _pole.y + _pole.height) ) ){
		_obj.dx = -_obj.dx;
	}
}