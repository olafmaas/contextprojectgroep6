//A simple ball class
if(typeof module != 'undefined'){
	var CircularBody = require('./CircularBody.js');
	var Base = require('./util/Base.js');
	var IDDistributor = require('./util/IDDistributor.js');
}

/** 
* Ball constructor
* @class Ball
* @classdesc Ball constructor.
* @constructor
* @param {number} _radius - The radius of the ball.
*/
var Ball = Base.extend({
  
	//Ball properties
	radius: 1, //radius of the bal
	color: "#000000", //The color of the ball
	body: false,
	ID: -1,
	globalID: -1,

	constructor: function(_radius){
		this.radius = _radius;
		this.ID = IDDistributor.getNewId();

		//Stuff to execute when constructing
		this.enableBody();
	},

	/**
	* Updates the position of the ball
	* @method Ball#update
	*/
	update: function(){
		
		if(this.body instanceof CircularBody) this.body.update();
	},

	/**
	* Checks whether two objects are equals by comparing their ID's
	*
	* @method Ball#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){
		return (this.ID == _other.getID());
	},

	/**
	* Creates the body of the ball
	* @method Ball#enableBody
	*/
	enableBody: function(){
		this.body = new CircularBody(this);
	},

	/**
	* Collision handler for the ball
	* It calls the collision function in the body class which takes care of the rest
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
	* @method Ball#setPosition
	* @param {number} _x - The x coordinate of the center of the ball.
	* @param {number} _y - The y coordinate of the center of the ball.
	*/
	setPosition: function (_x, _y){
		this.body.position = {x: _x, y: _y};
	},

	/**
	* Sets the radius of the ball.
	* @method Ball#setRadius
	* @param {number} _radius - The radius of the ball in pixels.
	*/
	setRadius: function (_radius) {
		this.radius = _radius;
		this.body.radius = _radius;
	},

	/**
	* Sets the global id of the ball. 
	* @method Ball#GlobalID
	* @param {number} _id - The new GlobalID of the ball
	*/
	setGlobalID: function (_id) {
		this.globalID = _id;
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
	getRadius: function(){
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
	},

	/**
	* Retrieves the ID of the ball
	*
	* @method Ball#getID
	* @return {number} The unique ID of the ball
	*/
	getID: function(){
		return this.ID;
	},

	/**
	* Retrieves the global ID of the ball
	*
	* @method Ball#getGlobalID
	* @return {number} The unique GlobalID of the ball
	*/
	getGlobalID: function(){
		return this.globalID;
	}
});

if(typeof module != 'undefined'){
    module.exports = Ball;
}
