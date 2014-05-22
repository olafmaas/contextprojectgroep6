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
	* @param {_parent} The circle object
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
	Update: function(){
		this.base();
		this.parentBall.setPosition(this.position.x, this.position.y);
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
		var dx = Math.abs(this.getPosition().x - _other.getPosition().x);
		var dy = Math.abs(this.getPosition().y - _other.getPosition().y);

		var tangent = Math.atan2(dx, dy);
		this.setVelocityDirection(2 * tangent - this.getVelocityDirection());
	},

	handleShieldCollision: function(_other){
		//Get x and y difference
		var dx = Math.abs(this.getPosition().x - _other.getPosition().x);
		var dy = Math.abs(this.getPosition().y - _other.getPosition().y);

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

		if(nextXPos > width || nextXPos < 0)
			this.revertXSpeed();

		if(nextYPos > height || nextYPos < 0)
			this.revertYSpeed();
	},

	getRadius: function(){
		return this.radius;
	},

	getParentBall: function(){
		return this.parentBall;
	},

	setRadius: function(_radius){
		this.radius = _radius;
	}
});

if(typeof module != 'undefined'){
	module.exports = CircularBody;
}
