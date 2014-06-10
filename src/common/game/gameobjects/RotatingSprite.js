
var RotatingSprite = Sprite.extend({

	rotation: 0, //Rotation of the sprite on each draw call (in radians)
	rotate: false, //Whether the rotation should be changed on each draw (let it rotate in 360 degrees)
	rotationInterval: 0,

	constructor: function(_texturePath, _rotation){
		this.texture = new Image();
		this.texture.src = _texturePath;
		this.rotate = true;
		this.rotation = _rotation;
	},

	draw: function(){
		if(this.hooked){ //draw with regard to the hooked object
			var hPos = this.hookedTo.getPosition();

			_canvasContext.save();
			_canvasContext.translate(hPos.x, hPos.y);
			_canvasContext.rotate(this.rotation);
			_canvasContext.drawImage(this.texture, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
			_canvasContext.restore();

		}
		else { //TODO: draw normally

		}
	},

	/**
	* Sets the rotation of the sprite in radians
	* @method Sprite#setRotationRadians
	* @param {float} _rotation - The rotation in radians
	*/
	setRotationRadians: function(_rotation){
		this.rotation = _rotation;
	},

	/**
	* Sets the rotation of the sprite in degrees
	* @method Sprite#setRotationDegrees
	* @param {float} _rotation - The adjustment in radians
	*/
	setRotationDegrees: function(_rotation){
		this.rotation = (_rotation * Math.PI) / 180; //convert degrees to radians.
		//TODO: remove current rotation interval if present
	},

	/**
	* Enables the rotation of the sprite
	* @method Sprite#enableRotation
	*/
	this.enableRotation: function(){
		if(!this.rotate){
			this.rotate = true; 
			var savedThis = this;
			var savedRotation = rotation;
			this.rotationInterval = setInterval(function() { savedThis.adjustRotation(savedRotation); }, 50);
		}
	}

	/**
	* Disables the rotation of the sprite
	* @method Sprite#disableRotation
	*/
	disableRotation: function(){
		if(this.rotate){
			this.rotate = false;
			clearInterval(this.rotationInterval);
		}
	},

	/**
	* Changes the rotation of the sprite
	* @method Sprite#adjustRotation
	* @param {float} _adjustment - The adjustment in radians
	*/
	adjustRotation: function(_adjustment){
		this.rotation += _adjustment;
	}

});