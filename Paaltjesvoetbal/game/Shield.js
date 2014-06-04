//A simple shield class
if(typeof module != 'undefined'){
    var ShieldBody = require('./ShieldBody.js');
    var input = require('./Input.js');
	var IDDistributor = require('./util/IDDistributor.js');
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
	var ID = IDDistributor.getNewId();
	var length = 2;

	/**
	* Updates the position of the shield
	* @method Shield#update
	*/
	this.update = function(){
		if(body instanceof ShieldBody) body.update();

		//on the server and mainscreen this is done on emit from a client!
		if(typeof module == 'undefined'){
			this.setAngle(this.calculateAngle());
		}
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
	* Checks whether two objects are the same by comparing ID's
	*
	* @method CircularBody#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	this.equals = function(_other){
		return (ID == _other.getID());
	},

	/**
	* Calculates the angle of the shield (in radians) depending on the current mouse input
	*
	* @method Shield#calculateAngle
	* @return {Float} The angle between the shield and the current mousepointer.
	*/
	this.calculateAngle = function(){
		if(!scale){
			scale = 1;
		}
		return Math.atan2(mouseY - scale*this.getPosition().y, mouseX - scale*this.getPosition().x);
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

	//TODO
	this.setShieldLength = function (_length){
		length = _length;
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

	//TODO
	this.getShieldLength = function(){
		return length;
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
	},

	/**
	* Retrieves the ID of the shield
	*
	* @method Shield#getID
	* @return {number} The unique ID of the shield
	*/
	this.getID = function(){
		return ID;
	}	

	//Stuff to execute when constructing
	this.enableBody();
}


if(typeof module != 'undefined'){
    module.exports = Shield;
}  
