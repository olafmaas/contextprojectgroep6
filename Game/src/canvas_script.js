
function draw() {
	clear(); //clear the screen
	
	//Redraw stuff
	drawBouncingBall();
	drawPole();
	drawShield(MOUSEX, MOUSEY);

	balls.checkCollisions();

	//Alleen ball to ball collision werkt niet via de groep,
	//want de functie neemt 2 ballen als parameter en als je het
	//in de groep stopt, krijg je zowel 1 collide met 2 als 2 collide met 1 
	//en dat geeft problemen ;p
	//Dus voor nu gewoon zo:
	var members = balls.getMembers();
	for(var i = 0; i < members.length; i++){
		for(var j = i+1; j < members.length; j++){
			checkBallCollision(members[i], members[j]);
		}
	}

  	//Move balls around
	balls.move();
}

//Draws the ball
function drawBouncingBall(){
  balls.draw();
}

//Draws the poles
function drawPole(){
  pole.draw();
}

//Draws the shield
function drawShield(_mouseX, _mouseY){
  shield.draw(_mouseX, _mouseY);
}

//Checks the collision of a ball with the wall
function checkWallCollision(_ball){

  //If object hits one of the walls on the sides
  if (_ball.x + _ball.dx > WIDTH || _ball.x + _ball.dx < 0 )
  	_ball.revertXSpeed(); 

  //If object hits one of the walls on the top or bottom
  if (_ball.y + _ball.dy > HEIGHT || _ball.y + _ball.dy < 0 )
    _ball.revertYSpeed();

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
	//TODO: in phaser code kijken hoe zij dit afhandelen in arcade ?
	
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

//Deflects the balls by calculating their new angle on impact
function ballsCollided(_ball1, _ball2, _tangent){
	var speed1 = _ball1.velocity;
	var speed2 = _ball2.velocity;

	_ball1.setAngleVelocity(speed2, (2 * _tangent - _ball1.angle));
	_ball2.setAngleVelocity(speed1, (2 * _tangent - _ball2.angle));


	var angle = 0.5 * Math.PI + _tangent;

	_ball1.x += Math.sin(angle);
	_ball1.y -= Math.cos(angle);
	_ball2.x -= Math.sin(angle);
	_ball2.y += Math.cos(angle);

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



