
function draw() {
	clear(); //clear the screen
	
	//Redraw stuff
	drawBouncingBall();

	//Check collisions
	checkWallCollision(ci);

  	//Move ball around
  	ci.move();
}

//Draws the ball
function drawBouncingBall(){
  ci.draw();
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
