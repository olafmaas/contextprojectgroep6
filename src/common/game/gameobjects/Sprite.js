if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var IDDistributor = require('../util/IDDistributor.js');
}

/**
* Sprite class
* @class Sprite
* @classdesc Sprite class for loading textures
* @constructor
* @extends Base
* @param {String} _texturePath - The relative path to the image.
*/
var Sprite = Base.extend({
	
	texture: null,
	position: {x: 0, y: 0},
	scale: {x: 1, y: 1}, //Scale of the sprite
	size: {x: 0, y: 0}, //Actual size of the sprite (used in combination with scale)	
	ID: -1,
	anchor: {x: 0, y: 0}, //Used to let the sprite be drawn from different position (e.g. with a circle)

	constructor: function(_texturePath){
		this.texture = new Image();
		this.texture.src = _texturePath;
		this.ID = IDDistributor.getNewId();
	},

	/**
	* Checks whether two objects are equals by comparing their ID's
	*
	* @method Sprite#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){ return (this.ID == _other.getID()); },

	/**
	* Sets the position of the sprite (top left) from which it will be drawn
	*
	* @method Sprite#setPosition
	* @param {number, number} _position - The x and y coordinates of the top left corner.
	*/
	setPosition: function(_position){this.position = _position;},

	/**
	* Sets the scale of the sprite.
	* 
	* @method Sprite#setScale
	* @param {number} _scale - The scale by which the sprite will be drawn.
	*/
	setScale: function(_scale){this.scale = _scale;},

	/**
	* Sets the original size at which the sprite will be drawn
	*
	* @method Sprite#setSize
	* @param {number, number} _size - The width and height at which the sprite will be drawn.
	*/
	setSize: function(_size){this.size = _size;},

	/**
	* Anchors the origin of the sprite at a specific place relative to the x and y position.
	*
	* @method Sprite#setAnchor
	* @param {number, number} _anchorPos - The x and y coordinates that will be added up to the original x and y positon. (can be negative)
	*/
	setAnchor: function(_anchorPos){this.anchor = _anchorPos; },

	/**
	* Retrieves the ID of the sprite
	*
	* @method Sprite#getID
	* @return {number} The unique ID of the sprite
	*/
	getID: function(){ return this.ID; },

	/**
	* Retrieves the texturepath of the sprite
	*
	* @method Sprite#getTexture
	* @return {String} The relative path to the texture
	*/
	getTexture: function(){ return this.texture; },

	/**
	* Retrieves the position of the sprite
	*
	* @method Sprite#getPosition
	* @return {number, number} The x and y coordinates of the sprite
	*/
	getPosition: function(){ return this.position; },

	/**
	* Retrieves the scale of the sprite
	*
	* @method Sprite#getScale
	* @return {number} The current scale in which the sprite is drawn.
	*/
	getScale: function(){ return this.scale; },

	/**
	* Retrieves the size of the sprite
	*
	* @method Sprite#getSize
	* @return {number, number} The x and y dimensions in which the sprite is drawn
	*/
	getSize: function(){ return this.size; },

	/**
	* Retrieves the anchor of the sprite
	*
	* @method Sprite#getAnchor
	* @return {number, number} The x and y coordinates to which the sprite is anchored, relative to the position of the sprite
	*/
	getAnchor: function(){ return this.anchor; }

});

if(typeof module != 'undefined'){
	module.exports = Sprite
}  
