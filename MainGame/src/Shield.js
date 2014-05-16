//A simple shield class

//Creates a shield object
//@Param _canv
//	The canvas on which the shield will reside
//@Param _pole
//	The pole for which the shield is destined
function Shield(_pole){
	//Shield properties
	var pole = _pole; //the pole which the shield protects
	var angle = 0; //the angle of the shield
	var position = {x: _pole.getPosition().x, y: _pole.getPosition().y};
	var radius = 70; //the radius of the shield
	var size = 0.5 * Math.PI; //The size of the shield
	var color = "white"; //Color of the shield

	//Draws the shield
	this.draw = function (_canvasContext){
		//Draw the first half of the shield
		_canvasContext.beginPath();
  		_canvasContext.arc(position.x, position.y, radius, angle - (size / 2), angle + (size / 2));
  		_canvasContext.strokeStyle = color;
  		_canvasContext.stroke();
	}

	this.update = function(){
		angle = this.calculateAngle();
	}

	/**
	* A method that checks if the shield collides with a ball
	* 
	* @method collidesWith
	* @param {_ball} The ball that should be hittested with the shield
	*/
	this.collidesWith = function(_ball){
		var delta = {x: _ball.getPosition().x - position.x, y: _ball.getPosition().y - position.y};
		var dist = _ball.getRadius() + radius;

		if(Math.pow(delta.x, 2) + Math.pow(delta.y, 2) < Math.pow(dist, 2)) return this.preciseCollidesWith(delta);
	}

	this.preciseCollidesWith = function(_delta){
		var shieldEnds = {begin: this.getAngle() - this.getSize() / 2, end: this.getAngle() + this.getSize() / 2};
		var collisionAngle = Math.atan2(_delta.y, _delta.x);

		return shieldEnds.begin < collisionAngle && shieldEnds.end > collisionAngle;
	}

	//Calculates the angle (in radian) of the shield depending on the mouse input 
	//@Param _mouseY
	//	The y coordinate of the mouse on the canvas
	//@Param _mouseX
	//	The x coordinate of the mouse on the canvas
	this.calculateAngle = function (){
		return Math.atan2(mouseY - position.y, mouseX - position.x);
	}

	//Sets the angle of the shield in radian
	//@Param _angle
	//	The specified angle 
	this.setAngle = function (_angle){
		angle = _angle;
	}

	//Sets the radius of the shield
	//@Param _radius
	//	The radius of the shield
	this.setRadius = function (_radius){
		radius = _radius;
	}

	this.setColor = function(_color){
		color = _color;
	}

	this.setSize = function(_size){
		size = _size;
	}

	//Gets the pole belonging to the shield
	this.getPole = function (){
		return pole;
	}

	//Gets the current angle of the shield
	this.getAngle = function (){
		return angle;
	}

	//Gets the radius of the shield
	this.getRadius = function (){
		return radius;
	}

	this.getColor = function(){
		return color;
	}

	this.getSize = function(){
		return size;
	}
}

//TODO: schild wordt getekend vanaf links (dus x,y geeft meest linker punt van het schild)
//		het zou mooier zijn als het vanuit het midden was