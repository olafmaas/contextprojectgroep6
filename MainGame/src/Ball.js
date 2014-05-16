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
	var radius = _radius; //radius of the bal
	var color = "#000000"; //The color of the ball
	var body;

	/**
	* Draws the ball on the canvas
	*
	* @method Ball#draw
	* @param {CanvasContext} _canvasContext - The canvas context on which the ball will be drawn.
	*/
	this.draw = function (_canvasContext){
		_canvasContext.beginPath();
		_canvasContext.arc(position.x, position.y, radius, 0, Math.PI*2, true);
		_canvasContext.closePath();

		_canvasContext.fillStyle = color;
		_canvasContext.fill();
	}

	//TODO: documentation
	//Function to update
	this.update = function(){
		if(body instanceof CircularBody) body.Update();
	}

	//TODO: documentation
	this.enableBody = function(){
		body = new CircularBody(this);
	}

	//TODO: documentation
	//Check for collision
	this.collidesWith = function(_other){
		return body.CollidesWith(_other.getBody());
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

	/**
	* Sets the color of the ball.
	*
	* @method Ball#setColor
	* @param {RGB value} _color - The RGB value of the color.
	*/
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

	/**
	* Retrieves the radius of the ball.
	*
	* @method Ball#getRadius
	* @return {number} The radius of the ball.
	*/
	this.getRadius = function (){
		return radius;
	}

	/**
	* Retrieves the color of the ball.
	*
	* @method Ball#getColor
	* @return {RGB} The color of the ball in RGB value.
	*/
	this.getColor = function(){
		return color;
	}

	/**
	* Retrieves the body of the ball.
	*
	* @method Ball#getBody
	* @return {Body} The body of the ball.
	*/
	this.getBody = function(){
		return body;
	}

	//Stuff to execute when constructing
	this.enableBody();
}