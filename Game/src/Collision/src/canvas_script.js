
function draw() {
	clear(); //clear the screen
	
	//Redraw stuff
	drawBouncingBall();
	drawPole();
	drawShield(MOUSEX, MOUSEY);

	//Check collisions
	checkWallCollision(ci);
  	checkPoleCollision(ci, rc);

  	checkWallCollision(ci2);
  	checkPoleCollision(ci2, rc);

  	checkBallCollision(ci, ci2);

  	//Move ball around
  	ci.move();
  	ci2.move();
}

//Draws the ball
function drawBouncingBall(){
  ci.draw();
  ci2.draw();
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

	//Collision ball to pole:
	//The collision of the ball is calculated from the centre. Because of this there is not square around the ball, and
	//it looks like the ball 'bounces' of the pole as it partially goes through it, which gives a nice effect

	var speedX = _obj.getXSpeed();
	var speedY = _obj.getYSpeed();
	var oX = _obj.getXPosition() + speedX;
	var oY = _obj.getYPosition() + speedY;
	var pX = _pole.getXPosition();
	var pY = _pole.getYPosition();
	var pW = pX + _pole.getWidth();
	var pH = pY + _pole.getHeight();

	//If object hits top or bottom of pole
	if ( ( (oX >= pX) && (oX <= pW) ) && ( (oY >= pY && oY <= pY + speedY) || (oY >= pH && oY <= pH - speedY ) ) ){
		_obj.revertYSpeed();
	} 

	//If object hits left or right side of pole
	else if ( ( (oX >= pX && oX <= pX + speedX) || (oX >= pW && oX <= pW - speedX) ) && ( (oY >= pY) && (oY <= pH) ) ){
		_obj.revertXSpeed();
	}

/* OLD
	//If object hits top or bottom of pole
	if ( ( (_obj.x + _obj.dx >= _pole.x) && (_obj.x + _obj.dx <= _pole.x + _pole.width) ) && ( (_obj.y + _obj.dy >= _pole.y && _obj.y + _obj.dy <= _pole.y + _obj.dy) || (_obj.y + _obj.dy >= _pole.y + _pole.height && _obj.y + _obj.dy <= _pole.y + _pole.height - _obj.dy ) ) ){
		_obj.dy = -_obj.dy;
	} 

	//If object hits left or right side of pole
	else if ( ( (_obj.x + _obj.dx >= _pole.x && _obj.x + _obj.dx <= _pole.x + _obj.dx) || (_obj.x + _obj.dx >= _pole.x + _pole.width && _obj.x + _obj.dx <= _pole.x + _pole.width - _obj.dx) ) && ( (_obj.y + _obj.dy >= _pole.y) && (_obj.y + _obj.dy <= _pole.y + _pole.height) ) ){
		_obj.dx = -_obj.dx;
	}
*/
}

//Checks whether two balls collide
function checkBallCollision(_ball1, _ball2){
	var x1 = _ball1.getXPosition();
	var y1 = _ball1.getYPosition();
	var x2 = _ball2.getXPosition();
	var y2 = _ball2.getYPosition();
	var radius1 = _ball1.getRadius();
	var radius2 = _ball2.getRadius();
	 
	//compare the distance to combined radii
	var dx = x2 - x1;
	var dy = y2 - y1;
	var radii = radius1 + radius2;
	if ( ( dx * dx )  + ( dy * dy ) < radii * radii ) 
	{
		_ball1.revertXSpeed();
		_ball1.revertYSpeed();
		_ball2.revertXSpeed();
		_ball2.revertYSpeed();
	}
}



