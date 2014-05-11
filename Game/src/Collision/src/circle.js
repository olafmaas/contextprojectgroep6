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
	//
	//@Param _y
	//
	this.setPosition = function (_x, _y){
		this.x = _x;
		this.y = _y;
	}

	//Sets the radius of the circle
	//@Param _radius
	//
	this.setRadius = function (_radius) {
		this.radius = _radius;
	}

	//Sets the speed of the circle
	//@Param _dx
	//
	//@Param _dy
	this.setSpeed = function (_dx, _dy){
		this.dx = _dx;
		this.dy = _dy;
	}

}