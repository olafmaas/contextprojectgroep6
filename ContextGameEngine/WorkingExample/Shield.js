//A simple shield class

//Creates a shield object
//@Param _canv
//	The canvas on which the shield will reside
//@Param _pole
//	The pole for which the shield is destined
function Shield(_pole){
	//Shield properties
	this.pole = _pole; //the pole which the shield protects
	this.angle = 0; //the angle of the shield
	this.position = {x: _pole.getPosition().x, y: _pole.getPosition().y};
	this.radius = 30; //the radius of the shield
	this.size = 0.5 * Math.PI; //The size of the shield
	this.color = "white"; //Color of the shield

	//Draws the shield
	this.Draw = function (_canvasContext){
		//Draw the first half of the shield
		_canvasContext.beginPath();
  		_canvasContext.arc(this.position.x, this.position.y, this.radius, this.angle - (this.size / 2), this.angle + (this.size / 2));
  		_canvasContext.strokeStyle = this.color;
  		_canvasContext.stroke();
	}

	this.Update = function(){
		this.angle = this.calculateAngle();
	}

	//Calculates the angle (in radian) of the shield depending on the mouse input 
	//@Param _mouseY
	//	The y coordinate of the mouse on the canvas
	//@Param _mouseX
	//	The x coordinate of the mouse on the canvas
	this.calculateAngle = function (){
		return Math.atan2(game.getInput().mainPointer.y - this.position.y, game.getInput().mainPointer.x - this.position.x);
	}

	//Sets the angle of the shield in radian
	//@Param _angle
	//	The specified angle 
	this.setAngle = function (_angle){
		this.angle = _angle;
	}

	//Sets the radius of the shield
	//@Param _radius
	//	The radius of the shield
	this.setRadius = function (_radius){
		this.radius = _radius;
	}

	//Gets the pole belonging to the shield
	this.getPole = function (){
		return this.pole;
	}

	//Gets the current angle of the shield
	this.getAngle = function (){
		return this.angle;
	}

	//Gets the radius of the shield
	this.getRadius = function (){
		return this.radius;
	}
}

//TODO: schild wordt getekend vanaf links (dus x,y geeft meest linker punt van het schild)
//		het zou mooier zijn als het vanuit het midden was