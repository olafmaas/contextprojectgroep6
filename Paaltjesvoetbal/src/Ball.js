//A simple ball class

/** 
* Ball Class
* @class Ball
* @classdesc Ball class with constructor and methods.
* @constructor
* @param {number} The radius of the ball.
*/
var Ball = Base.extend({
  
	//Ball properties
	radius: 1, //radius of the bal
	color: "#000000", //The color of the ball
	body: false,

	constructor: function(_radius){
		this.radius = _radius;

		//Stuff to execute when constructing
		this.enableBody();
	},
	/**
	* Draws the ball on the canvas
	*
	* @method Ball#draw
	* @param {CanvasContext} _canvasContext - The canvas context on which the ball will be drawn.
	*/
	draw: function (_canvasContext){
		_canvasContext.beginPath();
		_canvasContext.arc(this.getBody().position.x, this.getBody().position.y, this.radius, 0, Math.PI*2, true);
		_canvasContext.closePath();

		_canvasContext.fillStyle = this.color;
		_canvasContext.fill();
	},

	/**
	* Updates the position of the ball
	*
	* @method Ball#update
	*/
	update: function(){
		if(this.body instanceof CircularBody) this.body.Update();
	},

	/**
	* Creates the body of the ball
	*
	* @method Ball#enableBody
	*/
	enableBody: function(){
		this.body = new CircularBody(this);
	},

	/**
	* Collision handler for the ball
	* It calls the collision function in the body class which takes care of the rest
	*
	* @method Ball#collidesWith
	* @param {Object} _other - The other object with which the ball collides
	*/
	collidesWith: function(_other){
		return this.body.CollidesWith(_other);
	},

	//=============================
	//SECTION: Get & sets

	/**
	* Sets the position of the ball in the canvas.
	*
	* @method Ball#setPosition
	* @param {number} _x - The x coordinate of the center of the ball.
	* @param {number} _y - The y coordinate of the center of the ball.
	*/
	setPosition: function (_x, _y){
		this.body.position = {x: _x, y: _y};
	},

	/**
	* Sets the radius of the ball.
	*
	* @method Ball#setRadius
	* @param {number} _radius - The radius of the ball in pixels.
	*/
	setRadius: function (_radius) {
		this.radius = _radius;
		this.body.radius = _radius;
	},

	/**
	* Sets the color of the ball.
	*
	* @method Ball#setColor
	* @param {Hex value} _color - The hex value of the color.
	*/
	setColor: function(_color){
		this.color = _color;
	},

	/**
	* Retrieves both x and y coordinate of the middle of the ball.
	*
	* @method Ball#getPosition
	* @return {number, number} The x and y coordinate of the middle of the ball.
	*/
	getPosition: function(){
		return this.getBody().getPosition();
	},

	/**
	* Retrieves the radius of the ball.
	*
	* @method Ball#getRadius
	* @return {number} The radius of the ball.
	*/
	getRadius: function (){
		return this.radius;
	},

	/**
	* Retrieves the color of the ball.
	*
	* @method Ball#getColor
	* @return {Hex} The color of the ball in hex value.
	*/
	getColor: function(){
		return this.color;
	},

	/**
	* Retrieves the body of the ball.
	*
	* @method Ball#getBody
	* @return {Body} The body of the ball.
	*/
	getBody: function(){
		return this.body;
	}
});