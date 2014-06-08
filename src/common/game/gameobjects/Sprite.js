if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var IDDistributor = require('../util/IDDistributor.js');
}

/**
* Sprite class
* @class Sprite
* @classdesc Sprite class for loading textures
* @constructor
*/
var Sprite = Base.extend({
	
	texture: null,
	position: {x: 0, y: 0},
	scale: {x: 1, y: 1}, //Scale of the sprite
	size: {x: 0, y: 0}, //Actual size of the sprite (used in combination with scale)	
	ID: IDDistributor.getNewId(),

	hooked: false, //Whether the sprite is hooked to an object
	hookedTo: null, //The object the sprite is hooked to
	anchor: {x: 0, y: 0}, //Used to let the sprite be drawn from different position (e.g. with a circle)

	constructor: function(_texturePath){
		this.texture = new Image();
		this.texture.src = _texturePath;
	},

	/**
	* Function which draws the sprite if it has been hooked to an object
	* @method Sprite#Draw
	* @param {canvas} _canvasContext - The playing field
	*/
	drawHooked: function(_canvasContext){
		var hPos = this.hookedTo.getPosition();
		_canvasContext.drawImage(this.texture, hPos.x + this.anchor.x, hPos.y + this.anchor.y, this.size.x, this.size.y);
	},

	/**
	* Hooks the sprite to an object.
	*
	* @method Sprite#hookTo
	* @param {Object} _object - The object to which the sprite will be hooked.
	*/
	hookTo: function(_object){
		this.hookedTo = _object;
		this.hooked = true;
		//TODO body naar invisible zetten zodat je alleen de sprite ziet en niet eventueel kleurtje van een bal?
	},

	/**
	* Checks whether two objects are equals by comparing their ID's
	*
	* @method Ball#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){
		return (this.ID == _other.getID());
	},

	/**
	* Sets the position of the sprite (top left) from which it will be drawn
	*
	* @method Sprite#setPosition
	* @param {number, number} _position - The x and y coordinates of the top left corner.
	*/
	setPosition: function(_position){
		this.position = _position;
	},

	/**
	* Sets the scale of the sprite.
	* 
	* @method Sprite#setScale
	* @param {number} _scale - The scale by which the sprite will be drawn.
	*/
	setScale: function(_scale){
		this.scale = _scale;
	},

	/**
	* Sets the original size at which the sprite will be drawn
	*
	* @method Sprite#setSize
	* @param {number, number} _size - The width and height at which the sprite will be drawn.
	*/
	setSize: function(_size){
		this.size = _size;
	},

	/**
	* Anchors the origin of the sprite at a specific place relative to the x and y position.
	*
	* @method Sprite#setAnchor
	* @param {number, number} _anchorPos - The x and y coordinates that will be added up to the original x and y positon. (can be negative)
	*/
	setAnchor: function(_anchorPos){
		this.anchor = _anchorPos;
	},

	/**
	* Retrieves the ID of the sprite
	*
	* @method Sprite#getID
	* @return {number} The unique ID of the sprite
	*/
	getID: function(){
		return this.ID;
	},

	getTexture: function(){
		return this.texture;
	},

	getPosition: function(){
		return this.position;
	},

	getScale: function(){
		return this.scale;
	},

	getSize: function(){
		return this.size;
	}

	//TODO: GETS
	//getRotationDegrees, radians, anchor, rotate, scale, hooked, etc...
});

if(typeof module != 'undefined'){
	module.exports = Sprite
}  
