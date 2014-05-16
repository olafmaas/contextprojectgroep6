//A simple shield class

//Creates a shield object
//@Param _canv
//	The canvas on which the shield will reside
//@Param _pole
//	The pole for which the shield is destined
function Shield(_canv, _pole){
	
	//Shield properties
	this.pole = _pole; //the pole which the shield protects
	this.angle = 0; //the angle of the shield
	this.x = _pole.middleX(); //the x coordinate of the middle of the shield's rotation
	this.y = _pole.middleY(); //the y coordinate of the middle of the shield's rotation
	this.radius = 0; //the radius of the shield

	//Draws the shield
	this.draw = function (_mouseX, _mouseY){
		//First calculate the current angle 
		this.angle = this.calculateAngle(_mouseX, _mouseY);

		//Draw the first half of the shield
		var ctx = _canv.getContext("2d");
		ctx.beginPath();
  		ctx.arc(this.x, this.y, this.radius, this.angle, this.angle+(Math.PI/3.5));
  		//We don't end the path, otherwise we will have a line from one end to the other
  		ctx.stroke();
  		
  		//Draw the second half of the shield (counter-clockwise), so the mouse pointer will be in the middle
  		var ctx2 = _canv.getContext("2d");
  		ctx2.beginPath();
  		ctx2.arc(this.x, this.y, this.radius, this.angle, this.angle-(Math.PI/3.5), true);
  		ctx2.stroke();
	}

	//Calculates the angle (in radian) of the shield depending on the mouse input 
	//@Param _mouseY
	//	The y coordinate of the mouse on the canvas
	//@Param _mouseX
	//	The x coordinate of the mouse on the canvas
	this.calculateAngle = function (_mouseX, _mouseY){
		return Math.atan2(_mouseY - this.y, _mouseX - this.x);
	}

	//Sets the pole, and corresponding (x,y) coordinates, which the shield has to protect
	//@Param _pole
	//	The pole which will be protected
	this.setPole = function (_pole){
		this.pole = _pole;
		this.x = _pole.middleX;
		this.y = _pole.middleY;
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

	this.getXPosition = function (){
		return this.x;
	}

	this.getYPosition = function () {
		return this.y;
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
<<<<<<< HEAD
	
	this.getXPosition = function (){
		return this.x;
	}
	
	this.getYPosition = function (){
		return this.y;
	}
}

//TODO: schild wordt getekend vanaf links (dus x,y geeft meest linker punt van het schild)
//		het zou mooier zijn als het vanuit het midden was
}
