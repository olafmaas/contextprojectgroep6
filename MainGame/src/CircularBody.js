var CircularBody = Body.extend({
	radius: 1,
	parentBall: 0,

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

	HandleCollision: function(other){
		if(!this.CollidesWith(other)) return;

		//Make the bodies handle the collision
		this.HandleIndividual(other);
		other.getBody().HandleIndividual(this);
	},

	HandleIndividual: function(other){
		//If the body is static it shouldn't respond to collision
		if(this.isStatic) return;
		//Check which collision to handle
		if(other.getBody() instanceof CircularBody) this.handleBallCollision(other);

	},

	handleBallCollision: function(other){
		//Get x and y difference
		var dx = Math.abs(this.position.x - other.getBody().position.x);
		var dy = Math.abs(this.position.y - other.getBody().position.y);
		
		var tangent = Math.atan2(dx, dy);
		this.setVelocityDirection(2 * tangent - this.getVelocityDirection());
	}
});