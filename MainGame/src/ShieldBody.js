//TODO: finish documentation
var ShieldBody = Body.extend({
	angle: 0,
	radius: 1,
	parentShield: 0,

	constructor: function(_parent){
		this.angle = _parent.getAngle();
		this.radius = _parent.getRadius();
		this.parentShield = _parent;
		this.position = _parent.getPosition();
	},

	update: function(){
		this.base();
		this.parentShield.setAngle(this.calculateAngle());
	},

	/**
	* A method that checks if the shield collides with a ball
	* 
	* @method Shield#collidesWith
	* @param {_ball} The ball that should be hittested with the shield
	*/
	collidesWith: function(_other){
		if(_other.getBody() instanceof CircularBody) return this.collidesWithBall(_other);
		else console.log("Unimplemented Collision with " + _other);
	},

	//Shield to ball collision
	collidesWithBall: function(_other){
		var delta = {x: _other.getPosition().x - this.position.x, y: _other.getPosition().y - this.position.y};
		var dist = _other.getRadius() + this.radius;

		if(Math.pow(delta.x, 2) + Math.pow(delta.y, 2) < Math.pow(dist, 2))
			return this.preciseCollidesWith(delta);
	},

	/**
	* A method that checks the precise collision of the shield
	* 
	* @method Shield#preciseCollidesWith
	* @param {_delta} ??
	*/
	preciseCollidesWith: function(_delta){
		var shieldEnds = {begin: this.angle - this.parentShield.getSize() / 2, end: this.angle + this.parentShield.getSize() / 2};
		var collisionAngle = Math.atan2(_delta.y, _delta.x);

		return (shieldEnds.begin < collisionAngle && shieldEnds.end > collisionAngle);
	},


	//Handles everything from the collision:
	//First checks whether the two collide by calling the collidesWith function
	//Second handles the individual collisions 
	//In all collision functions, there are checks to see which collisions occurs (ball-ball, ball-shield, etc)
	handleCollision: function(_other){
		if(!this.collidesWith(_other)) return;

		//Make the bodies handle the collision
		this.handleIndividual(_other);
		_other.getBody().handleIndividual(this.parentShield);

		//TODO: this is temporary to keep the red color of the background when something hits the shield
		return true;
	},

	handleIndividual: function(_other){
		//If the body is static it shouldn't respond to collision
		//if(this.immovable) return;
		
		//Check which collision to handle
		if(_other instanceof Ball) this.handleShieldCollision(_other);
	},
	
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
	*
	* @method Shield#calculateAngle
	* @return {number} The angle between the shield and the current mousepointer.
	*/
	calculateAngle: function(){
		//console.log(this.position.y + " | " + this.position.x);
		return Math.atan2(mouseY - this.position.y, mouseX - this.position.x);
	}

});