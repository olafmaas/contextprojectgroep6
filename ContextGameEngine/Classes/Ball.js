//A simple ball class

/** 
* Ball constructor
*
* @class Ball
* @classdesc Ball constructor.
* @constructor
* @param {number} _radius - The radius of the ball.
*/
function Ball(_radius){
  
	//Ball properties
	var position = {x: 0, y: 0}; //position of the ball
	var radius = radius; //radius of the bal
	var color = "#000000"; //The color of the ball
	var body;

	/**
	* Draws the ball on the canvas
	*
	* @method Ball#draw
	* @param {CanvasContext} _canvasContext - The canvas context on which the ball will be drawn.
	*/
	this.draw = function (_canvasContext){
		canvasContext.beginPath();
		canvasContext.arc(position.x, position.y, radius, 0, Math.PI*2, true);
		canvasContext.closePath();

		canvasContext.fillStyle = color;
		canvasContext.fill();
	}

	//Function to update
	this.update = function(){
		if(body instanceof CircularBody) body.Update();
	}

	this.enableBody = function(){
		body = new CircularBody(this);
	}

	//Check for collision
	this.collidesWith = function(_other){
		return body.CollidesWith(other.getBody());
	}

<<<<<<< HEAD
	/**
	* Calculates the angle in which the ball is moving, by using the current x and y speed of the ball.
	* 
	* @method Ball#angleBetween
	* @return {number} The angle in radians.
	*/
	this.angleBetween = function (_dx, _dy){
		return Math.atan2(_dx, _dy);
	}

	/**
	* Calculates the velocity at which the ball is moving, by using the current x and y speed of the ball.
	*
	* @method Ball#distanceBetween
	* @return {number} The velocity of the ball.
	*/
	this.distanceBetween = function(_dx, _dy)
	{
	  return Math.sqrt( _dx * _dx + _dy * _dy );
	}

	/**
	* Reverts the y speed (positive to negative and vice versa).
	* It also calculates the new angle (speed remains the same).
	*
	* @method Ball#revertYSpeed
	*/
	this.revertYSpeed = function (){
		var dx = body.velocity * Math.cos(body.velocityDirection);
		var dy = -body.velocity * Math.sin(body.velocityDirection);
		dy = -dy;
		body.velocityDirection = this.angleBetween(dx, dy);
	}

	/**
	* Reverts the x speed (positive to negative and vice versa).
	* It also calculates the new angle (speed remains the same).
	*
	* @method Ball#revertXSpeed
	*/
	this.revertXSpeed = function (){
		var dx = body.velocity * Math.cos(body.velocityDirection);
		var dy = -body.velocity * Math.sin(body.velocityDirection);

		dx = -dx;
		angle = this.angleBetween();
	}


=======
>>>>>>> parent of 2b49fbd... Added functions from game/ball.js to the engine
	//=============================
	//SECTION: Get & sets

	//Sets the position of the circle on the canvas
	//@Param _x
	//	The x coordinate of the middle of the circle
	//@Param _y
	//	The y coordinate of the middle of the circle
	this.setPosition = function (_x, _y){
		position.x = _x;
		position.y = _y;

		body.position = {x: _x, y: _y};
	}

	//Sets the speed of the circle
	//@Param _dx
	//	The speed of the circle from left to right in pixels per redraw. Negative number is right to left.
	//@Param _dy
	//	The speed of the circle from top to bottom in pixels per redraw. Negative number is bottom to top.
	this.setVelocity = function (_vel){
		body.velocity = _vel;
	}

	this.setVelocityDirection = function(_direction){
		body.velocityDirection = _direction;
	}

	//Sets the radius of the circle
	//@Param _radius
	//	The radius of the circle in pixels
	this.setRadius = function (_radius) {
		radius = _radius;
		body.radius = _radius;
	}

	this.setColor = function(_color){
		color = _color;
	}

	this.getPosition = function(){
		return position;
	}

	//Get the velocity of the circle
	this.getVelocity = function (){
		return body.velocity;
	}

	//Get the radius of the circle
	this.getRadius = function (){
		return radius;
	}

	this.getColor = function(){
		return color;
	}

	this.getBody = function(){
		return body;
	}

	//Stuff to execute when constructing
	this.EnableBody();
}