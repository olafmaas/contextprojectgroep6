if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
}

/** 
* Body constructor
*
* @class Body
* @classdesc The bass class from which the other bodies inherit.
* @constructor
* @extends Base
*/
var Body = Base.extend({
	
	//Body properties
	position: {x:0, y:0},
	immovable: false,
	isTrigger: false,
	velocity: 0, //The velocity of the circle
	velocityDirection: 0, //The direction the ball is moving in
	vectorVelocity: {x: 0, y: 0}, //velocity of circle split in a vector
	lastUpdate: Date.now(),
	deltaTime: 0,
	demping: 20,
	starting: true,

	/**
	* Updates the position of the body
	*
	* @method Body#update
	*/
	update: function(){
		if(!this.starting){
			this.deltaTime = (Date.now() - this.lastUpdate) / this.demping;
		}else{
			this.deltaTime = 1;
			this.starting = false;
		}
		
		this.lastUpdate = Date.now();

		//If the body is static it should be immovable
		if(this.immovable) return;
		//Keep velocityDirection value between 0 and 2pi
		this.velocityDirection = this.velocityDirection % (2 * Math.PI);
	
		console.log(this.deltaTime);

		this.position.x += this.vectorVelocity.x * this.deltaTime;
		this.position.y += this.vectorVelocity.y * this.deltaTime;
	},

	handleCollision: function(_other){	}, //abstract function.

	/**
	* Gets the angle from this object to another object
	*
	* @method Body#getAngleTo
	* @param _other {Body} the body of the other object
	*/
	getAngleTo: function(_other){
		var delta = {x: _other.getPosition().x - this.getPosition().x, y: _other.getPosition().y - this.getPosition().y};
		var angle = Math.atan2(delta.y, delta.x);

		return angle;
	},

	/**
	* Calculates the velocity direction (angle) in which the ball is moving, by using the current x and y speed of the ball.
	* 
	* @method Body#calculateVDirection
	* @return {number} The angle in radians.
	*/
	calculateVDirection: function (){ return -Math.atan2(this.vectorVelocity.y, this.vectorVelocity.x);},

	/**
	* Calculates the velocity at which the ball is moving, by using the current x and y speed of the ball.
	*
	* @method Body#calculateVelocity
	* @return {number} The velocity of the ball.
	*/
	calculateVelocity: function(){
		var dx = this.vectorVelocity.x;
		var dy = this.vectorVelocity.y;
	  	return Math.sqrt( dx * dx + dy * dy );
	},

	/**
	* Reverts the y speed (positive to negative and vice versa).
	* It also calculates the new angle (speed remains the same).
	*
	* @method Body#revertYSpeed
	*/
	revertYSpeed: function (){
		this.vectorVelocity.y = -this.vectorVelocity.y;
		this.velocityDirection = this.calculateVDirection();
	},

	/**
	* Reverts the x speed (positive to negative and vice versa).
	* It also calculates the new angle (speed remains the same).
	*
	* @method Body#revertXSpeed
	*/
	revertXSpeed: function (){
		this.vectorVelocity.x = -this.vectorVelocity.x;
		this.velocityDirection = this.calculateVDirection();		
	},

	/**
	* Sets the velocity of the ball. 
	* It also calculates the corresponding speed values for the x and y axis.
	*
	* @method Body#setVelocity
	* @param {number} _vel - The velocity of the ball.
	*/	
	setVelocity: function(_vel){
		this.velocity = _vel;

		this.vectorVelocity  = {
			x: this.velocity * Math.cos(this.velocityDirection),
			y: -this.velocity * Math.sin(this.velocityDirection)
		};
	},

	/**
	* Sets the velocity direction (angle) of the ball. 
	* It also calculates the corresponding speed values for the x and y axis.
	* 
	* @method Body#setVelocityDirection
	* @param {number} _direction - The direction (angle) of the ball in radians.
	*/	
	setVelocityDirection: function(_direction){
		this.velocityDirection = _direction;

		this.vectorVelocity = {
			x: this.velocity * Math.cos(this.velocityDirection),
			y: -this.velocity * Math.sin(this.velocityDirection)
		};
	},

	/**
	* Sets the x and y speed values of the ball.
	* It also calculates the corresponding angle and velocity.
	* Note: The given speed can also be negative, it then moves in the opposite direction.
	*
	* @method Body#setXYSpeed
	* @param {number} _x - The speed on the x axis (pixels per redraw).
	* @param {number} _y - The speed on the y axis (pixels per redraw).
	*/
	setXYSpeed: function(_x, _y){
		this.vectorVelocity = {
			x: _x,
			y: _y
		};

		this.velocity = this.calculateVelocity();
		this.velocityDirection = this.calculateVDirection();
	},

	/**
	* Retrieves the x and y speed.
	*
	* @method Body#getXYSpeed
	* @return {number, number} The x and y speeds of the body.
	*/
	getXYSpeed: function(){ return this.vectorVelocity; },

	/**
	* Retrieves the position.
	*
	* @method Body#getPosition
	* @return {number, number} The x and y coordinate the position of the body.
	*/
	getPosition: function (){ return {x: Math.round(this.position.x), y: Math.round(this.position.y)}; },

	/**
	* Retrieves the velocity of the body.
	*
	* @method Body#getVelocity
	* @return {number} The current velocity of the body.
	*/
	getVelocity: function (){ return this.velocity; },

	/**
	* Retrieves the velocity direction (angle) of the body.
	*
	* @method Body#getVelocityDirection
	* @return {number} The current angle of the body in radians.
	*/
	getVelocityDirection: function(){ return this.velocityDirection; },

	/**
	* Retrieves the velocity of the body.
	*
	* @method Body#getVectorVelocity
	* @return {number, number} The x and y velocities of the body.
	*/
	getVectorVelocity: function(){ return this.vectorVelocity; }
});

if(typeof module != 'undefined'){
	module.exports = Body;
}
