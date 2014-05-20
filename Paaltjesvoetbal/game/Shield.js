//A simple shield class
if(typeof module != 'undefined'){
    var ShieldBody = require('./ShieldBody.js');
}  

/** 
* Shield constructor
*
* @class Shield
* @classdesc Shield constructor.
* @constructor
* @param {pole} _pole - The pole which the shield protects
*/
function Shield(_pole){

	//Shield properties
	var pole = _pole; //the pole which the shield protects
	var angle = 0; //the angle of the shield
	var position = {x: _pole.getPosition().x, y: _pole.getPosition().y};
	var radius = 70; //the radius of the shield
	var size = 0.5 * Math.PI; //The size of the shield
	var color = "#000000"; //Color of the shield
	var body;

	/**
	* Draws the shield on the canvas
	* @method Shield#draw
	* @param {CanvasContext} _canvasContext - The canvas context on which the shield will be drawn.
	*/
	this.draw = function (_canvasContext){
		_canvasContext.beginPath();
  		_canvasContext.arc(position.x, position.y, radius, angle - (size / 2), angle + (size / 2));
  		_canvasContext.strokeStyle = color;
  		_canvasContext.stroke();
	}

	/**
	* Updates the position of the shield
	* @method Shield#update
	*/
	this.update = function(){
		if(body instanceof ShieldBody) body.update();
		//angle = body.calculateAngle();
	}

	/**
	* Creates the body of the shield
	*
	* @method Shield#enableBody
	*/
	this.enableBody = function(){
		body = new ShieldBody(this);
	}

	/**
	* Collision handler for the shield
	* It calls the collision function in the body class which takes care of the rest
	* @method Shield#collidesWith
	* @param {object} _other - The object with which the shield collides
	*/
	this.collidesWith = function(_other){
		return body.collidesWith(_other);
	}

	/**
	* Sets the angle of the shield.
	* @method Shield#setAngle
	* @param {number} _angle - The angle of the shield in radians.
	*/
	this.setAngle = function (_angle){
		angle = _angle;
		body.angle = _angle;
	}

	/**
	* Sets the radius of the shield.
	* @method Shield#setRadius
	* @param {number} _radius - The radius of the shield
	*/
	this.setRadius = function (_radius){
		radius = _radius;
		body.radius = _radius;
	}

	/**
	* Sets the color of the shield.
	* @method Shield#setColor
	* @param {hex} _color - The color of the shield in hex value.
	*/
	this.setColor = function(_color){
		color = _color;
	}

	/**
	* Sets the size of the shield.
	* @method Shield#setSize
	* @param {number} _size - The size of the shield.
	*/
	this.setSize = function(_size){
		size = _size;
	}

	/**
	* Sets the position of the shield in the canvas.
	*
	* @method Shield#setPosition
	* @param {pole} _pole - The pole to which the shield will be assigned
	*/
	this.setPosition = function (_pole){
		position.x = _pole.getPosition().x;
		position.y = _pole.getPosition().y;

		body.position = {x: position.x, y: position.y};
	}

	/**
	* Retrieves both x and y coordinate of the middle of the shield.
	*
	* @method Shield#getPosition
	* @return {number, number} The x and y coordinate of the middle of the shield.
	*/
	this.getPosition = function(){
		return position;
	}

	/**
	* Retrieves the pole belonging to the shield.
	*
	* @method Shield#getPole
	* @return {pole} The pole the shield protects.
	*/
	this.getPole = function (){
		return pole;
	}

	/**
	* Retrieves the current angle of the shield.
	*
	* @method Shield#getAngle
	* @return {number} The angle of the shield in radians.
	*/
	this.getAngle = function (){
		return angle;
	}

	/**
	* Retrieves the size of the radius of the shield.
	*
	* @method Shield#getRadius
	* @return {number} Radius of the shield.
	*/
	this.getRadius = function (){
		return radius;
	}

	/**
	* Retrieves the color of the shield.
	*
	* @method Shield#getColor
	* @return {hex} The color of the shield in hex value
	*/
	this.getColor = function(){
		return color;
	}

	/**
	* Retrieves the size of the shield (circle)
	*
	* @method Shield#getSize
	* @return {number} Size of the shield.
	*/
	this.getSize = function(){
		return size;
	}

	/**
	* Retrieves the body of the shield.
	*
	* @method Shield#getBody
	* @return {body} The body of the shield.
	*/
	this.getBody = function(){
		return body;
	}	

	//Stuff to execute when constructing
	this.enableBody();
}

if(typeof module != 'undefined'){
    module.exports = Shield;
}  

