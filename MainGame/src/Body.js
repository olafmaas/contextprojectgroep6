
var Body = Base.extend({
	
	//Body properties
	position: {x:0, y:0},
	immovable: false,
	isTrigger: false,
	velocity: 0, //The velocity of the circle
	velocityDirection: 0, //The direction the ball is moving in
	vectorVelocity: {x: 0, y: 0}, //velocity of circle split in a vector

	/**
	* Updates the position of the body
	*
	* @method Body#update
	*/
	Update: function(){
		//If the body is static it should be immovable
		if(this.immovable) return;

		//Keep velocityDirection value between 0 and 2pi
		this.velocityDirection = this.velocityDirection % (2 * Math.PI);
	
		//Dit verandert alleen als je de velocity / direction aanpast
		//niet nodig dus om dit voor elke update te berekenen.
	/*	
		this.vectorVelocity  = {
			x: this.velocity * Math.cos(this.velocityDirection),
			y: -this.velocity * Math.sin(this.velocityDirection)
		};
	*/
		this.position.x += this.vectorVelocity.x;
		this.position.y += this.vectorVelocity.y;
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
	getXYSpeed: function(){
		return this.vectorVelocity;
	},

	/**
	* Calculates the velocity direction (angle) in which the ball is moving, by using the current x and y speed of the ball.
	* 
	* @method Body#calculateVelocity
	* @return {number} The angle in radians.
	*/
	calculateVelocity: function (){
		return Math.atan2(this.vectorVelocity.y, this.vectorVelocity.x);
	},

	/**
	* Calculates the velocity at which the ball is moving, by using the current x and y speed of the ball.
	*
	* @method Body#calculateVDirection
	* @return {number} The velocity of the ball.
	*/
	calculateVDirection: function()
	{
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
	* Retrieves the position.
	*
	* @method Body#getPosition
	* @return {number, number} The x and y coordinate the position of the body.
	*/
	getPosition: function (){
		return this.position;
	},

	/**
	* Retrieves the velocity of the body.
	*
	* @method Body#getVelocity
	* @return {number} The current velocity of the body.
	*/
	getVelocity: function (){
		return this.velocity;
	},

	/**
	* Retrieves the velocity direction (angle) of the body.
	*
	* @method Body#getAngle
	* @return {number} The current angle of the body in radians.
	*/
	getVelocityDirection: function(){
		return this.velocityDirection;
	}

});