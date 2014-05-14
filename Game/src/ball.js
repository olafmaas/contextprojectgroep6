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
  
	//Circle properties
	this.x = 0; //x position in the canvas (center of ball)
	this.y = 0; //y position in the canvas (center of ball)
	this.radius = _radius; //radius of the ball
	this.velocity = 0; //velocity of ball
	this.angle = 0; //angle in which the ball is moving
	this.dx = 0; //speed of ball in x direction (pixels per redraw)
	this.dy = 0; //speed of ball in y direction (pixels per redraw)


	/**
	* Draws the ball on the canvas
	*
	* @method Ball#draw
	* @param {CanvasContext} _canvasContext - The canvas context on which the ball will be drawn.
	*/
	this.draw = function (_canvasContext){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

	/**
	* Moves the ball by the current speed in x and y direction.
	*
	* @method Ball#move
	*/
	this.move = function (){
		this.x += this.dx;
		this.y += this.dy;
	}

	/**
	* Sets the position of the ball in the canvas.
	*
	* @method Ball#setPosition
	* @param {number} _x - The x coordinate of the center of the ball.
	* @param {number} _y - The y coordinate of the center of the ball.
	*/
	this.setPosition = function (_x, _y){
		this.x = _x;
		this.y = _y;
	}

	/**
	* Sets the radius of the ball.
	*
	* @method Ball#setRadius
	* @param {number} _radius - The radius of the ball in pixels.
	*/
	this.setRadius = function (_radius) {
		this.radius = _radius;
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
		this.velocity = _velocity;
		this.angle = _angle;

		this.dx = _velocity * Math.sin(_angle);
		this.dy = _velocity * Math.cos(_angle);
	}

	/**
	* Sets the x and y speed values of the ball.
	* It also calculates the corresponding angle and velocity.
	* Note: The given speed can also be negative, it then moves in the opposite direction.
	*
	* @method Ball#setSpeed
	* @param {number} _dx - The speed on the x axis (pixels per redraw).
	* @param {number} _dy - The speed on the y axis (pixels per redraw).
	*/
	this.setSpeed = function (_dx, _dy){
		this.dx = _dx;
		this.dy = _dy;

		this.velocity = this.distanceBetween();
		this.angle = this.angleBetween();
	}

	/**
	* Calculates the angle in which the ball is moving, by using the current x and y speed of the ball.
	* 
	* @method Ball#angleBetween
	* @return {number} The angle in radians.
	*/
	this.angleBetween = function (){
		return Math.atan2(this.dy, this.dx);
	}

	/**
	* Calculates the velocity at which the ball is moving, by using the current x and y speed of the ball.
	*
	* @method Ball#distanceBetween
	* @return {number} The velocity of the ball.
	*/
	this.distanceBetween = function()
	{
	  var xs = this.dx * this.dx;
	  var ys = this.dy * this.dy;
	 
	  return Math.sqrt( xs + ys );
	}

	/**
	* Reverts the y speed (positive to negative and vice versa).
	* It also calculates the new angle (speed remains the same).
	*
	* @method Ball#revertYSpeed
	*/
	this.revertYSpeed = function (){
		this.dy = -this.dy;
		this.angle = this.angleBetween();
	}

	/**
	* Reverts the x speed (positive to negative and vice versa).
	* It also calculates the new angle (speed remains the same).
	*
	* @method Ball#revertXSpeed
	*/
	this.revertXSpeed = function (){
		this.dx = -this.dx;
		this.angle = this.angleBetween();
	}

	/**
	* Retrieves the x coordinate of the middle of the ball.
	*
	* @method Ball#getXPosition
	* @return {number} The x coordinate of the middle of the ball.
	*/
	this.getXPosition = function (){
		return this.x;
	}

	/**
	* Retrieves the y coordinate of the middle of the ball.
	*
	* @method Ball#getYPosition
	* @return {number} The y coordinate of the middle of the ball.
	*/
	this.getYPosition = function (){
		return this.y;
	}

	/**
	* Retrieves the velocity of the ball.
	*
	* @method Ball#getVelocity
	* @return {number} The current velocity of the ball.
	*/
	this.getVelocity = function (){
		return this.velocity;
	}

	/**
	* Retrieves the radius of the ball.
	*
	* @method Ball#getRadius
	* @return {number} The radius of the ball.
	*/
	this.getRadius = function (){
		return this.radius;
	}

	/**
	* Retrieves the speed at which the ball travels across the x-axis.
	*
	* @method Ball#getXSpeed
	* @return {number} The speed at which the ball travels across the x-axis.
	*/
	this.getXSpeed = function (){
		return this.dx;
	}

	/**
	* Retrieves the speed at which the ball travels across the y-axis.
	*
	* @method Ball#getYSpeed
	* @return {number} The speed at which the ball travels across the y-axis.
	*/
	this.getYSpeed = function (){
		return this.dy;
	}

}