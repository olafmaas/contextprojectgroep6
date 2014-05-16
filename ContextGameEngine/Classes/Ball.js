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

	/**
	* Updates the ball (position, etc)
	*
	* @method Ball#update
	*/
	this.update = function(){
		if(body instanceof CircularBody) body.Update();
	}

	/**
	* Instantiates the body of the ball
	* 
	* @method Ball#enableBody
	*/
	this.enableBody = function(){
		body = new CircularBody(this);
	}

	/**
	* Checks for collision with the ball
	*
	* @method Ball#collidesWith
	* @param {Object} _other - The other object where it collides with.
	*/
	this.collidesWith = function(_other){
		return body.CollidesWith(other.getBody());
	}

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


	//=============================
	//SECTION: Get & sets

	/**
	* Sets the position of the ball in the canvas.
	*
	* @method Ball#setPosition
	* @param {number} _x - The x coordinate of the center of the ball.
	* @param {number} _y - The y coordinate of the center of the ball.
	*/
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

	/**
	* Sets the velocity and angle of the ball. 
	* It also calculates the corresponding speed values for the x and y axis.
	*
	* @param Ball#setAngleVelocity
	* @param {number} _velocity - The velocity of the ball.
	* @param {number} _angle - The angle of the ball in radians.
	*/
	this.setAngleVelocity = function (_velocity, _angle){
		body.velocity = _velocity;
		body.velocityDirection = _angle;
	}


	this.setVelocityDirection = function(_direction){
		body.velocityDirection = _direction;
	}

	/**
	* Sets the speed by using x and y values
	* It also calculates the corresponding angle and velocity.
	* Note: The given speed can also be negative, it then moves in the opposite direction.
	*
	* @method Ball#setSpeed
	* @param {number} _dx - The speed on the x axis (pixels per redraw).
	* @param {number} _dy - The speed on the y axis (pixels per redraw).
	*/
	this.setSpeed = function (_dx, _dy){
		body.velocity = this.distanceBetween(dx, dy);
		body.velocityDirection = this.angleBetween(dx, dy);
	}

	/**
	* Sets the radius of the ball.
	*
	* @method Ball#setRadius
	* @param {number} _radius - The radius of the ball in pixels.
	*/
	this.setRadius = function (_radius) {
		radius = _radius;
		body.radius = _radius;
	}

//TODO: documentation
	this.setColor = function(_color){
		color = _color;
	}

	/**
	* Retrieves both x and y coordinate of the middle of the ball.
	*
	* @method Ball#getPosition
	* @return {number, number} The x and y coordinate of the middle of the ball.
	*/
	this.getPosition = function(){
		return position;
	}

//------- get x en y position kunnen ook wel weg straks. gewoon position ophalen en dan daaruit x en y coordinaten halen)
	/**
	* Retrieves the x coordinate of the middle of the ball.
	*
	* @method Ball#getXPosition
	* @return {number} The x coordinate of the middle of the ball.
	*/
	this.getXPosition = function (){
		return position.x;
	}

	/**
	* Retrieves the y coordinate of the middle of the ball.
	*
	* @method Ball#getYPosition
	* @return {number} The y coordinate of the middle of the ball.
	*/
	this.getYPosition = function (){
		return position.y;
	}
//---------------
	/**
	* Retrieves the velocity of the ball.
	*
	* @method Ball#getVelocity
	* @return {number} The current velocity of the ball.
	*/
	this.getVelocity = function (){
		return body.velocity;
	}

	/**
	* Retrieves the angle of the ball.
	*
	* @method Ball#getAngle
	* @return {number} The current angle of the ball in radians.
	*/
	this.getAngle = function(){
		return body.velocityDirection;
	}

	/**
	* Retrieves the radius of the ball.
	*
	* @method Ball#getRadius
	* @return {number} The radius of the ball.
	*/
	this.getRadius = function (){
		return radius;
	}

	//TODO: documentation
	this.getColor = function(){
		return color;
	}

	//TODO: documentation
	this.getBody = function(){
		return body;
	}

	/**
	* Retrieves the speed at which the ball travels across the x-axis.
	*
	* @method Ball#getXSpeed
	* @return {number} The speed at which the ball travels across the x-axis.
	*/
	this.getXSpeed = function (){
		return body.velocity * Math.cos(body.velocityDirection);
	}

	/**
	* Retrieves the speed at which the ball travels across the y-axis.
	*
	* @method Ball#getYSpeed
	* @return {number} The speed at which the ball travels across the y-axis.
	*/
	this.getYSpeed = function (){
		return -body.velocity * Math.sin(body.velocityDirection);
	}

	//Stuff to execute when constructing
	this.EnableBody();
}