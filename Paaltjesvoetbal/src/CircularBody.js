//TODO: Documentation for each function
var CircularBody = Body.extend({
	radius: 1,
	parentBall: 0,
	hit: false,

	constructor: function(_parent){
		this.radius = _parent.getRadius();
		this.parentBall = _parent;
	},

	Update: function(){
		this.base();
		this.parentBall.setPosition(this.position.x, this.position.y);
	},

	CollidesWith: function(other){
		if(other.getBody() instanceof CircularBody) return this.CollidesWithBall(other);
		else console.log("Unimplemented Collision with " + other);
	},

	//Check for collision
	CollidesWithBall: function(other){
		//Get x and y difference
		var dx = Math.abs(this.position.x - other.getBody().position.x);
		var dy = Math.abs(this.position.y - other.getBody().position.y);

		//Calculate the distance with pythagoras
		var distanceApart = Math.sqrt(dx*dx + dy*dy);

		//Check if they collide
		return (distanceApart <= this.radius + other.getRadius());
	},

	//Handles everything from the collision:
	//First checks whether the two collide by calling the collidesWith function
	//Second handles the individual collisions 
	//In all collision functions, there are check to see which collisions occur (ball-ball, ball-shield, etc)
	handleCollision: function(other){
		if(!this.CollidesWith(other)) { this.hit = false; return; }

		//Make the bodies handle the collision
		this.handleIndividual(other);
		other.getBody().handleIndividual(this.parentBall);
	},

	handleIndividual: function(_other){
		//If the body is static it shouldn't respond to collision, but should respond to getting hit in case it's the pole
		if(this.immovable) {
			return;
		}
		//Check which collision to handle
		if(_other instanceof Ball) this.handleBallCollision(_other);

	},

	handleBallCollision: function(other){
		
		if(!this.hit){
			//Get x and y difference
			var dx = Math.abs(this.position.x - other.getBody().position.x);
			var dy = Math.abs(this.position.y - other.getBody().position.y);

			var tangent = Math.atan2(dx, dy);
			this.setVelocityDirection(2 * tangent - this.getVelocityDirection());
			this.hit = true;
		}
	},

	checkWorldBounds: function(game){
		var ballPosition = this.getPosition();
		var ballSpeed = this.getXYSpeed();
		var nextXPos = ballPosition.x + ballSpeed.x;
		var nextYPos = ballPosition.y + ballSpeed.y;
		var width = game.getWidth();
		var height = game.getHeight();

		if(nextXPos > width || nextXPos < 0)
			this.revertXSpeed();

		if(nextYPos > height || nextYPos < 0)
			this.revertYSpeed();
	}
});