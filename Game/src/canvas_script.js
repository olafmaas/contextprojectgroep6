
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

  //If object hits one of the walls on the sides
  if (_ball.x + _ball.dx > WIDTH || _ball.x + _ball.dx < 0 )
    _ball.dx = -_ball.dx;

  //If object hits one of the walls on the top or bottom
  if (_ball.y + _ball.dy > HEIGHT || _ball.y + _ball.dy < 0 )
    _ball.dy = -_ball.dy;


}

//Checks the collision of an ball with a pole
function checkPoleCollision(_obj, _pole){

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
	//TODO: balletjes wegkaatsen

}

//Should later bounce of collided balls
function handleShieldCollision(){
	console.log("Collision detected");
}

//Checks whether a ball collides with the area where the shield actually is
function checkPreciseShieldCollision(delta, _shield){
	var phaseShield = {start:_shield.getAngle(), end:_shield.getYPosition()};
	var phaseCollision = Math.atan2(delta.dy, delta.dx);
	
	return (phaseShield.start < phaseCollision && phaseCollision < phaseShield.end);
}

//Checks whether a ball collides with the area of the whole shield
function checkShieldCollision(_ball, _shield){
	var posBall = {x:_ball.getXPosition(), y:_ball.getYPosition()};
	var posShield = {x:_shield.getXPosition(), y:_shield.getYPosition()};
	var distance = _ball.getRadius() + _shield.getRadius();
	var delta = {dx:posBall.x - posShield.x, dy:-(posBall.y - posShield.y)};
	
	if (( delta.dx*delta.dx )  + ( delta.dy*delta.dy ) < distance*distance ) 
	{		
		return checkPreciseShieldCollision(delta, _shield);
	}
}



