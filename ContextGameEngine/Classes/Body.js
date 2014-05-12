var Body = Base.extend({
	position: {x:0, y:0},
	isStatic: false,
	isTrigger: false,
	velocity: 0, //The velocity of the circle
	velocityDirection: 0, //The direction the ball is moving in
	vectorVelocity: {x: 0, y: 0}, //velocity of circle split in a vector

	Update: function(){
		//Keep velocityDirection value between 0 and 2pi
		this.velocityDirection = this.velocityDirection % (2 * Math.PI);
		this.vectorVelocity  = {
			x: this.velocity * Math.cos(this.velocityDirection),
			y: -this.velocity * Math.sin(this.velocityDirection)
		};

		this.position.x += this.vectorVelocity.x;
		this.position.y += this.vectorVelocity.y;
	}
});