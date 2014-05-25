/**
* Sprite class
* @class Sprite
* @classdesc Sprite class for loading textures
* @constructor
*/
function Sprite(){
	var texture;
	this.position = {x: 0, y: 0};
	this.origin = {x: 0, y: 0}; 
	this.rotation = 0; //Rotation of the sprite on each draw call
	this.scale = {x: 1, y: 1}; //Scale of the sprite
	this.hooked = false; //Whether the sprite is hooked to an object
	this.hookedTo; //The object the sprite is hooked to
	this.size = {x: 0, y: 0}; //Actual size of the sprite (used in combination with scale)
	this.anchor = {x: 0, y: 0}; //Used to let the sprite be drawn from different position (e.g. with a circle)

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
		var anchor = this.anchor;
		if(this.hooked){
			var hPos = this.hookedTo.getPosition();
			_canvasContext.drawImage(texture, hPos.x + anchor.x, hPos.y + anchor.y, this.size.x, this.size.y);
		}
		else {
			_canvasContext.drawImage(texture, this.position.x + anchor.x, this.position.y + anchor.y, this.size.x, this.size.y);
		}
	}

	/**
	* Sets the position of the sprite (top left) from which it will be drawn
	*
	* @method Sprite#setPosition
	* @param {number, number} _position - The x and y coordinates of the top left corner.
	*/
	this.setPosition = function(_position){
		this.position = _position;
	}

	/**
	* Hooks the sprite to an object.
	*
	* @method Sprite#hookTo
	* @param {Object} _object - The object to which the sprite will be hooked.
	*/
	this.hookTo = function(_object){
		this.hookedTo = _object;
		this.hooked = true;
	}

	/**
	* Sets the scale of the sprite.
	* 
	* @method Sprite#setScale
	* @param {number} _scale - The scale by which the sprite will be drawn.
	*/
	this.setScale = function(_scale){
		this.scale = _scale;
	}

	/**
	* Sets the original size at which the sprite will be drawn
	*
	* @method Sprite#setSize
	* @param {number, number} _size - The width and height at which the sprite will be drawn.
	*/
	this.setSize = function(_size){
		this.size = _size;
	}

	/**
	* Anchors the origin of the sprite at a specific place relative to the x and y position.
	*
	* @method Sprite#setAnchor
	* @param {number, number} _anchorPos - The x and y coordinates that will be added up to the original x and y positon. (can be negative)
	*/
	this.setAnchor = function(_anchorPos){
		this.anchor = _anchorPos;
	}
}

if(typeof module != 'undefined'){
	module.exports = Sprite
}  
