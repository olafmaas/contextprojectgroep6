//A simple circle class

//Creates a circle object
//@Param _canv 
//  The canvas on which the circle will reside
function Ball(radius){
  
	//Circle properties
	var position = {x: 0, y: 0}; //position of the circle
	var radius = radius; //radius of the circle
	var color = "#000000"; //The color of the ball
	var body;

	//Draws the circle on the canvas
	this.Draw = function (canvasContext){
		canvasContext.beginPath();
		canvasContext.arc(position.x, position.y, radius, 0, Math.PI*2, true);
		canvasContext.closePath();

		canvasContext.fillStyle = color;
		canvasContext.fill();
	}

	//Function to update
	this.Update = function(){
		if(body instanceof CircularBody) body.Update();
	}

	this.EnableBody = function(){
		body = new CircularBody(this);
	}

	//Check for collision
	this.CollidesWith = function(other){
		return body.CollidesWith(other.getBody());
	}

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