
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

//Checks the collision of a ball with the wall
function checkWallCollision(_ball){
/*
  //If object hits one of the walls on the sides
  if (_obj.x + _obj.dx > WIDTH || _obj.x + _obj.dx < 0 )
    _obj.dx = -_obj.dx;

  //If object hits one of the walls on the top or bottom
  if (_obj.y + _obj.dy > HEIGHT || _obj.y + _obj.dy < 0 )
    _obj.dy = -_obj.dy;
*/
	if(_ball.getXPosition() > WIDTH - _ball.getRadius()){
		_ball.x = 2*(WIDTH-_ball.getRadius()) - _ball.getXPosition();
		_ball.angle = -_ball.angle;
	}
	else if (_ball.getXPosition() < _ball.getRadius()){
		_ball.x = 2*_ball.getRadius() - _ball.getXPosition();
		_ball.angle = -_ball.angle;
	}

	if (_ball.getYPosition() > HEIGHT - _ball.getRadius()){
		_ball.y = 2*(HEIGHT - _ball.getRadius()) - _ball.getYPosition();
		_ball.angle = Math.PI - _ball.angle;
	}
	else if (_ball.getYPosition() < _ball.getRadius()){
		_ball.y = 2*_ball.getRadius() - _ball.getYPosition();
		_ball.angle = Math.PI - _ball.angle;
	}

}

//Checks the collision of an ball with a pole
function checkPoleCollision(_obj, _pole){

/*
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
		//_obj.revertYSpeed();
		console.log("TOP / BOTTOM");
		_obj.angle = Math.PI - _obj.angle;
		_obj.dy = _obj.speed * Math.cos(_obj.angle);

	} 

	//If object hits left or right side of pole
	else if ( ( (oX >= pX && oX <= pX + speedX) || (oX >= pW && oX <= pW - speedX) ) && ( (oY >= pY) && (oY <= pH) ) ){
		//_obj.revertXSpeed();
		console.log("LEFT / RIGHT");
		_obj.angle = - _obj.angle;
		_obj.dx = _obj.speed * Math.sin(_obj.angle);
	}
	*/

}

//Checks whether two balls collide and bounces them off
function checkBallCollision(_ball1, _ball2){
	//TODO: optimization: eerst box check doen en daarna pas de intensievere check of de rondjes daadwerkelijk colliden

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
		//If balls collided, calculate their new angles
		var tangent = Math.atan2(dy, dx);
		ballsCollided(_ball1, _ball2, tangent);
	}	
}

//
function ballsCollided(_ball1, _ball2, _tangent){

	var speed1 = _ball1.getSpeed();
	var speed2 = _ball2.getSpeed();

	_ball1.setAngle(speed2, (2 * _tangent - _ball1.angle));
	_ball2.setAngle(speed1, (2 * _tangent - _ball2.angle));
	
	var angle = 0.5 * Math.PI + _tangent;
}



