//A simple circle class

//Creates a circle object
//@Param _canv 
//  The canvas on which the circle will reside
function Circle(_canv){
  
	//Circle properties
	this.x = 0; //x position in the canvas (middle of circle)
	this.y = 0; //y position in the canvas (middle of circle)
	this.radius = 0; //radius of the circle
	this.velocity = 0; //speed of circle
	this.angle = 0; //ADDED
	this.dx = 0; //speed of circle in x direction
	this.dy = 0; //speed of circle in y direction


	//Draws the circle on the 
	this.draw = function (){
		var ctx = _canv.getContext("2d");
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

	//Moves the circle by the current speed in x and y direction
	this.move = function (){
		this.x += this.dx;
		this.y += this.dy;
	}

	//Sets the position of the circle on the canvas
	//@Param _x
	//	The x coordinate of the middle of the circle
	//@Param _y
	//	The y coordinate of the middle of the circle
	this.setPosition = function (_x, _y){
		this.x = _x;
		this.y = _y;
	}

	//Sets the radius of the circle
	//@Param _radius
	//	The radius of the circle in pixels
	this.setRadius = function (_radius) {
		this.radius = _radius;
	}

	//ADDED
	this.setAngle = function (_speed, _angle){
		this.velocity = _speed;
		this.angle = _angle;
		this.dx = _speed * Math.sin(_angle);
		this.dy = _speed * Math.cos(_angle);
	}

	//Sets the speed of the circle
	//@Param _dx
	//	The speed of the circle from left to right in pixels per redraw. Negative number is right to left.
	//@Param _dy
	//	The speed of the circle from top to bottom in pixels per redraw. Negative number is bottom to top.
	this.setSpeed = function (_dx, _dy){
		this.dx = _dx;
		this.dy = _dy;

		//ADDED
		this.velocity = this.lineDistance();
		this.angle = this.angleBetweenLines();
	}

	//ADDED
	this.angleBetweenLines = function (){
		return Math.atan2(this.dy, this.dx);
	}

	//ADDED
	this.lineDistance = function()
	{
	  var xs = this.dx * this.dx;
	  var ys = this.dy * this.dy;
	 
	  return Math.sqrt( xs + ys );
	}

	//Revers the y speed
	this.revertYSpeed = function (){
		this.dy = -this.dy;
		this.angle = this.angleBetweenLines();
	}

	//Revers the x speed 
	this.revertXSpeed = function (){
		this.dx = -this.dx;
		this.angle = this.angleBetweenLines();
	}

	//Get the x coordinate of the middle of the circle
	this.getXPosition = function (){
		return this.x;
	}

	//Get the y coordinate of the middle of the circle
	this.getYPosition = function (){
		return this.y;
	}

	//Get the velocity of the circle
	this.getVelocity = function (){
		return this.velocity;
	}

	//Get the radius of the circle
	this.getRadius = function (){
		return this.radius;
	}

	//Get the left-to-right speed of the circle
	this.getXSpeed = function (){
		return this.dx;
	}

	//Get the top-to-bottom speed of the circle
	this.getYSpeed = function (){
		return this.dy;
	}

}