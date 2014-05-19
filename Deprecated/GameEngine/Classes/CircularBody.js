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
		if(other instanceof CircularBody) return this.CollidesWithBall(other);
		if(other instanceof Shield) return other.collidesWith(parentBall);
		else console.log("Unimplemented Collision with " + other);
	},

	//Check for collision
	CollidesWithBall: function(other){
		//Get x and y difference
		var dx = Math.abs(this.position.x - other.position.x);
		var dy = Math.abs(this.position.y - other.position.y);

		//Calculate the distance with pythagoras
		var distanceApart = Math.sqrt(dx*dx + dy*dy);

		//Check if they collide
		return (distanceApart <= this.radius + other.radius);
	},

	HandleCollision: function(other){
		if(!CollidesWith(other)) return;

		//Make the bodies handle the collision
		handleIndividual(other);
		other.handleIndividual(this);

		//TODO: Handle collision code
		console.log("Collision handled");
	},

	handleIndividual: function(other){
		//If the body is static it shouldn't respond to collision
		if(isStatic) return;
	}
});