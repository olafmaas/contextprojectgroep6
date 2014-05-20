//The shield body class

/**
* Constructor for the shield body
* @class ShieldBody
* @classdesc ShieldBody class which extends the Body class
* @constructor ShieldBody#constructor
* @param {_parent} The shield object
*/
var ShieldBody = Body.extend({
	angle: 0,
	radius: 1,
	parentShield: 0,
	hit: false,
	
	constructor: function(_parent){
		this.angle = _parent.getAngle();
		this.radius = _parent.getRadius();
		this.parentShield = _parent;
		this.position = _parent.getPosition();
	},

	/**
	* Updates the angle of the shield
	* @method Shield#update
	*/
	update: function(){
		this.base();
		this.parentShield.setAngle(this.calculateAngle());
	},

	/**
	* A method that checks with what object the shield collides
	* @method ShieldBody#collidesWith
	* @param {_object} The object that should be hit tested with the shield
	*/
	collidesWith: function(_other){
		if(_other.getBody() instanceof CircularBody) return this.collidesWithBall(_other);
		else console.log("Unimplemented Collision with " + _other);
	},

	/**
	* A method that checks if the shield collides with a ball
	* @method ShieldBody#collidesWithBall
	* @param {_ball} The ball that should be hit tested with the shield
	*/
	collidesWithBall: function(_other){
		var delta = {x: _other.getPosition().x - this.position.x, y: _other.getPosition().y - this.position.y};
		var dist = _other.getRadius() + this.radius;
		
		var velocity = _other.getBody().getVelocity();
		
		//console.log(Math.pow(delta.x,2) + ", " + Math.pow(delta.y, 2) + ", " + Math.pow(dist,2));
		
		if((Math.pow(delta.x, 2) + Math.pow(delta.y, 2) > Math.pow(dist-this.radius/12, 2)) &&
		(Math.pow(delta.x, 2) + Math.pow(delta.y, 2) < Math.pow(dist+this.radius/12, 2)))
			return this.preciseCollidesWith(delta);
	},

	/**
	* A method that checks the precise collision of the shield with a ball
	* @method ShieldBody#preciseCollidesWith
	* @param {_delta} x and y distance between the shield and the ball
	*/
	preciseCollidesWith: function(_delta){
		var shieldEnds = {begin: this.angle - this.parentShield.getSize() / 2, end: this.angle + this.parentShield.getSize() / 2};
		var collisionAngle = Math.atan2(_delta.y, _delta.x);

		return (shieldEnds.begin < collisionAngle && shieldEnds.end > collisionAngle);
	},
	
	/**
	* This method uses the previous methods to check whether the shield collides
	* And then handles the collision
	* @method ShieldBody#handleCollision
	* @param {_other} object which collides with the shield
	*/
	handleCollision: function(_other){
		if(!this.collidesWith(_other)) { this.hit = false; return; }

		//Make the bodies handle the collision
		this.handleIndividual(_other);
		_other.getBody().handleIndividual(this.parentShield);
		
		//TODO: this is temporary to keep the red color of the background when something hits the shield
		return true;
	},

	/**
	* This method calls the correct handling function for the occuring collision
	* @method ShieldBody#handleIndividual
	* @param {_other} object which collides with the shield
	*/
	handleIndividual: function(_other){
		//If the body is static it shouldn't respond to collision
		//if(this.immovable) return;
		
		//Check which collision to handle
		if(_other instanceof Ball) this.handleShieldCollision(_other);
	},
	
	//Must be moved, so that the ball class handles this.
	handleShieldCollision: function(_other){
		
		if(!this.hit){
			//Get x and y difference
			var dx = Math.abs(_other.getBody().position.x - this.position.x);
			var dy = Math.abs(_other.getBody().position.y - this.position.y);

			var tangent = Math.atan2(dy, dx);
			_other.getBody().setVelocityDirection(2 * tangent - this.getVelocityDirection());
			this.hit = true;
		}
	},

	/**
	* Calculates the angle of the shield (in radians) depending on the current mouse input
	* @method ShieldBody#calculateAngle
	* @return {number} The angle between the shield and the current mousepointer
	*/
	calculateAngle: function(){
		//console.log(this.position.y + " | " + this.position.x);
		return Math.atan2(mouseY - this.position.y, mouseX - this.position.x);
	}

});