/**
* Sprite class
* @class Sprite
* @classdesc Sprite class for loading textures
* @constructor
*/
function Sprite(){
	var texture;
	var position = {x: 0, y: 0};
	var origin = {x: 0, y: 0}; 
	var rotation = 0; //Rotation of the sprite on each draw call (in radians)
	var rotate = false; //Whether the rotation should be changed on each draw (let it rotate in 360 degrees)
	var rotationInterval; 
	var scale = {x: 1, y: 1}; //Scale of the sprite
	var hooked = false; //Whether the sprite is hooked to an object
	var hookedTo; //The object the sprite is hooked to
	var size = {x: 0, y: 0}; //Actual size of the sprite (used in combination with scale)
	var anchor = {x: 0, y: 0}; //Used to let the sprite be drawn from different position (e.g. with a circle)
	var ID = IDDistributor.getNewId();

	/**
	* Function which loads a texture
	* @method Sprite#LoadContent
	* @param {string} texturePath - texture's path
	*/
	this.loadContent = function(_texturePath){
		texture = new Image();
		texture.src = _texturePath;
	}

	/**
	* Function which draws the sprite
	* @method Sprite#Draw
	* @param {canvas} _canvasContext - The playing field
	*/
	this.draw = function(_canvasContext){
		if(rotation > 0){
			this.drawRotated(_canvasContext);
		}
		else if(hooked){
			this.drawHooked(_canvasContext);
		}
		else {
			_canvasContext.drawImage(texture, position.x, position.y, size.x, size.y);
		}
	}

	//TODO make sure that rotated images can be drawn
	this.drawRotated = function(_canvasContext){
		if(hooked){ //draw with regard to the hooked object
			var hPos = hookedTo.getPosition();

			_canvasContext.save();
			_canvasContext.translate(hPos.x, hPos.y);
			_canvasContext.rotate(rotation);
			_canvasContext.drawImage(texture, -size.x / 2, -size.y / 2, size.x, size.y);
			_canvasContext.restore();

		}
		else { //TODO: draw normally

		}
	}

	/**
	* Function which draws the sprite if it has been hooked to an object
	* @method Sprite#Draw
	* @param {canvas} _canvasContext - The playing field
	*/
	this.drawHooked = function(_canvasContext){
		var hPos = hookedTo.getPosition();

		_canvasContext.drawImage(texture, hPos.x + anchor.x, hPos.y + anchor.y, size.x, size.y);
	}

	/**
	* Sets the position of the sprite (top left) from which it will be drawn
	*
	* @method Sprite#setPosition
	* @param {number, number} _position - The x and y coordinates of the top left corner.
	*/
	this.setPosition = function(_position){
		position = _position;
	}

	/**
	* Hooks the sprite to an object.
	*
	* @method Sprite#hookTo
	* @param {Object} _object - The object to which the sprite will be hooked.
	*/
	this.hookTo = function(_object){
		hookedTo = _object;
		hooked = true;
		//TODO body naar invisible zetten zodat je alleen de sprite ziet en niet eventueel kleurtje van een bal?
	}

	/**
	* Checks whether two objects are equals by comparing their ID's
	*
	* @method Ball#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	this.equals = function(_other){
		return (ID == _other.getID());
	}

	/**
	* Sets the scale of the sprite.
	* 
	* @method Sprite#setScale
	* @param {number} _scale - The scale by which the sprite will be drawn.
	*/
	this.setScale = function(_scale){
		scale = _scale;
	}

	/**
	* Sets the original size at which the sprite will be drawn
	*
	* @method Sprite#setSize
	* @param {number, number} _size - The width and height at which the sprite will be drawn.
	*/
	this.setSize = function(_size){
		size = _size;
	}

	/**
	* Anchors the origin of the sprite at a specific place relative to the x and y position.
	*
	* @method Sprite#setAnchor
	* @param {number, number} _anchorPos - The x and y coordinates that will be added up to the original x and y positon. (can be negative)
	*/
	this.setAnchor = function(_anchorPos){
		anchor = _anchorPos;
	}

	/**
	* Sets the rotation of the sprite in radians
	* @method Sprite#setRotationRadians
	* @param {float} _rotation - The rotation in radians
	*/
	this.setRotationRadians = function(_rotation){
		rotation = _rotation;
	}

	/**
	* Sets the rotation of the sprite in degrees
	* @method Sprite#setRotationDegrees
	* @param {float} _rotation - The adjustment in radians
	*/
	this.setRotationDegrees = function(_rotation){
		rotation = (_rotation * Math.PI) / 180; //convert degrees to radians.
		//TODO: remove current rotation interval if present
	}

	/**
	* Enables the rotation of the sprite
	* @method Sprite#enableRotation
	*/
	this.enableRotation = function(){
		if(!rotate){
			rotate = true; 
			var savedThis = this;
			var savedRotation = rotation;
			rotationInterval = setInterval(function() { savedThis.adjustRotation(savedRotation); }, 50);
		}
	}

	/**
	* Disables the rotation of the sprite
	* @method Sprite#disableRotation
	*/
	this.disableRotation = function(){
		if(rotate){
			rotate = false;
			clearInterval(rotationInterval);
		}
	}

	/**
	* Changes the rotation of the sprite
	* @method Sprite#adjustRotation
	* @param {float} _adjustment - The adjustment in radians
	*/
	this.adjustRotation = function(_adjustment){
		rotation += _adjustment;
	}

	/**
	* Retrieves the ID of the sprite
	*
	* @method Sprite#getID
	* @return {number} The unique ID of the sprite
	*/
	this.getID = function(){
		return ID;
	}

	//TODO: GETS
	//getRotationDegrees, radians, anchor, rotate, scale, hooked, etc...
}

if(typeof module != 'undefined'){
	module.exports = Sprite
}  
