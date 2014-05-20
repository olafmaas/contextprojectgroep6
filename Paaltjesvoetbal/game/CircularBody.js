//The circular body class
if(typeof module != 'undefined'){
	var Body = require('./Body.js');
	var Ball = require('./Ball.js');
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
	hit: false,
	
	/**
	* Constructor for the circular body
	* @method CircularBody#constructor
	* @param {_parent} The circle object
	*/
	constructor: function(_parent){
		this.radius = _parent.getRadius();
		this.parentBall = _parent;
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
	* A method that checks with what object the circle collides
	* @method CircularBody#collidesWith
	* @param {object} _other - The object that should be hit tested with the circle
	*/
	CollidesWith: function(other){
		if(other.getBody() instanceof CircularBody) return this.CollidesWithBall(other);
		else console.log("Unimplemented Collision with " + other);
	},

	/**
	* A method that checks if the circle collides with a ball
	* @method CircularBody#collidesWithBall
	* @param {ball} other - The ball object that should be hit tested with the circle
	*/
	CollidesWithBall: function(other){
		//Get x and y difference
		var dx = Math.abs(this.position.x - other.getBody().position.x);
		var dy = Math.abs(this.position.y - other.getBody().position.y);

		//Calculate the distance with pythagoras
		var distanceApart = Math.sqrt(dx*dx + dy*dy);

		//Check if they collide
		return (distanceApart <= this.radius + other.getRadius());
	},

	/**
	* This method uses the previous methods to check whether the circle collides
	* And then handles the collision
	* @method CircularBody#handleCollision
	* @param {object} other - Object which collides with the shield
	*/
	handleCollision: function(other){
		if(!this.CollidesWith(other)) { this.hit = false; return; }

		//Make the bodies handle the collision
		this.handleIndividual(other);
		other.getBody().handleIndividual(this.parentBall);
	},

	/**
	* This method calls the correct handling function for the occuring collision
	* @method CircularBody#handleIndividual
	* @param {object} _other - Object which collides with the circle
	*/
	handleIndividual: function(_other){
		if(this.parentBall instanceof Pole) this.handlePoleCollision();
		//If the body is static it shouldn't respond to collision, but should respond to getting hit in case it's the pole
		if(this.immovable || this.hit) return;
		//Check which collision to handle
		if(_other instanceof Ball) this.handleBallCollision(_other);
	},
	
	/**
	* Handles the collision of circle and ball
	* @method CircularBody#handleBallCollision
	* @param {ball} _other - Ball object which collides with the circle
	*/
	handleBallCollision: function(_other){
		
		//Get x and y difference
		var dx = Math.abs(this.position.x - _other.getBody().position.x);
		var dy = Math.abs(this.position.y - _other.getBody().position.y);

		var tangent = Math.atan2(dx, dy);
		this.setVelocityDirection(2 * tangent - this.getVelocityDirection());
		this.hit = true;
	},

	/**
	* Handles the collision of circle and pole
	*
	* @method CircularBody#handlePoleCollision
	*/
	handlePoleCollision: function(){
		this.parentBall.isHit();
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
	}
});

if(typeof module != 'undefined'){
	module.exports = CircularBody;
}
