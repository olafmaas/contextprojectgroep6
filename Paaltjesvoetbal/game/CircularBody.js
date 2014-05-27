//The circular body class
if(typeof module != 'undefined'){
	var Body = require('./Body.js');
	var ShieldBody = require('./ShieldBody.js');
	var Ball = require('./Ball.js');
	var IDDistributor = require('./IDDistributor.js');
}

/**
* CircularBody Class
* @class CircularBody
* @classdesc CircularBody class which extends the Body class.
* @constructor
* @param {ball} _parent - Ball or pole object to which the body is assigned.
*/
var CircularBody = Body.extend({
	radius: 1,
	parentBall: 0,
	ID: -1,
	
	/**
	* Constructor for the circular body
	* @method CircularBody#constructor
	* @param {circle} _parent - The circle object
	*/
	constructor: function(_parent){
		this.radius = _parent.getRadius();
		this.parentBall = _parent;
		this.ID = IDDistributor.getNewId();
	},

	/**
	* Updates the position of the circle
	* @method CircularBody#update
	*/
	update: function(){
		this.base();
		this.parentBall.setPosition(this.position.x, this.position.y);
	},

	/**
	* Checks whether two objects are the same by comparing ID's
	*
	* @method CircularBody#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){
		return (this.ID == _other.getID());
	},

	/**
	* This method uses the previous methods to check whether the circle collides
	* And then handles the collision
	* @method CircularBody#handleCollision
	* @param {object} _other - Object which collides with the shield
	*/
	handleCollision: function(_other){
		//If the body is static it shouldn't respond to collision, but should respond to getting hit in case it's the pole
		if(this.immovable || this.hit) {
			return;
		}

		//Check which collision to handle
		if(_other instanceof CircularBody) this.handleBallCollision(_other);
		if(_other instanceof ShieldBody) this.handleShieldCollision(_other);
	},
	
	/**
	* Handles the collision of circle and ball
	* @method CircularBody#handleBallCollision
	* @param {ball} _other - Ball object which collides with the circle
	*/
	handleBallCollision: function(_other){
		//Get x and y difference
		var dx = this.getPosition().x - _other.getPosition().x;
		var dy = this.getPosition().y - _other.getPosition().y;

		var tangent = Math.atan2(dx, dy);
		this.setVelocityDirection(2 * tangent - this.getVelocityDirection());
	},

	/**
	* Handles the collision of circle and shield
	* @method CircularBody#handleShieldCollision
	* @param {shield} _other - Shield object which collides with the circle
	*/
	handleShieldCollision: function(_other){
		//Get x and y difference
		var dx = this.getPosition().x - _other.getPosition().x;
		var dy = this.getPosition().y - _other.getPosition().y;

		var tangent = Math.atan2(dx, dy);
		this.setVelocityDirection(2 * tangent - this.getVelocityDirection());
	},

	/**
	* Checks if the ball collides with world boundaries and handles it
	* @method CircularBody#checkWorldBounds
	* @param {game} _game - The game/playing field
	*/
	checkWorldBounds: function(_game){
		var ballPosition = this.getPosition();
		var ballSpeed = this.getXYSpeed();
		var nextXPos = ballPosition.x + ballSpeed.x;
		var nextYPos = ballPosition.y + ballSpeed.y;
		var width = _game.getWidth();
		var height = _game.getHeight();

		var collision = false

		if(nextXPos > width - this.getRadius() || nextXPos < this.getRadius()){
			this.revertXSpeed();
			collision = true;
		}

		if(nextYPos > height - this.getRadius()|| nextYPos < this.getRadius()){
			this.revertYSpeed();
			collision = true;
		}

		return collision;
	},

	/**
	* Returns the radius
	* @method CircularBody#getRadius
	*/
	getRadius: function(){
		return this.radius;
	},
	
	/**
	* Returns the ball object
	* @method CircularBody#getParentBall
	*/
	getParentBall: function(){
		return this.parentBall;
	},

	/**
	* Sets the radius
	* @method CircularBody#setRadius
	* @param {float} _radius - The radius
	*/
	setRadius: function(_radius){
		this.radius = _radius;
	},

	/**
	* Retrieves the ID of the circularBody
	*
	* @method CircularBody#getID
	* @return {number} The unique ID of this circularBody
	*/
	getID: function(){
		return this.ID;
	}
});

if(typeof module != 'undefined'){
	module.exports = CircularBody;
}
