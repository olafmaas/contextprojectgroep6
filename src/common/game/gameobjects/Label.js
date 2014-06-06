if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
}

/**
* A label class for writing text on the screen
*
* @class Label
* @classdesc Label class for writing text on the screen.
* @constructor
* @param {string} _text - String to write on the screen.
*/
var Label = Base.extend({

	text: "",
	position: {x: 0, y: 0},
	font: "Verdana",
	fontSize: 10,
	color: "#ffffff",

	constructor: function(_text){
		this.text = _text;
	},

	/**
	* Gets the string which is the labels text
	* @method Label#getText
	* @return {string} The text of the label
	*/
	getText: function(){
		return this.text;
	},

	/**
	* Gets the position of the top-left corner of the label
	*
	* @method Label#getPosition
	* @return {object} An position object containing and x and y property
	*/
	getPosition: function(){
		return this.position;
	},

	/**
	* Gets the name of the font
	* @method Label#getFont
	* @return {string} The name of the font.
	*/
	getFont: function(){
		return this.font;
	},

	/**
	* Gets the font size in pixels
	* @method Label#getFontSize
	* @return {number} The font size in pixels.
	*/
	getFontSize: function(){
		return this.fontSize;
	},

	/**
	* Gets the color of the label
	* @method Label#getColor
	* @return {hexcolor} The hex code of the color.
	*/
	getColor: function(){
		return this.color;
	},

	/**
	* Sets the string which is the labels text
	* @method Label#setText
	* @param {string} _text - The text which should be displayed on the label.
	*/
	setText: function(_text){
		this.text = _text;
	},

	/**
	* Sets the position of the left-top corner of the label where it's drawn
	* @method Label#setPosition
	* @param {object} _position - An object containing an x and y value
	*/
	setPosition: function(_position){
		this.position = _position;
	},

	/**
	* Sets the font of the label
	* @method Label#setFont
	* @param {string} _font - The name of the font.
	*/
	setFont: function(_font){
		this.font = _font;
	},

	/**
	* Sets the font size in pixels
	* @method Label#setFontSize
	* @param {number} _fontSize - The size of the font in pixels.
	*/
	setFontSize: function(_fontSize){
		this.fontSize = _fontSize;
	},

	/**
	* Sets the color of the label
	* @method Label#setColor
	* @param {hexcolor} _color - The color in hexidecimal form.
	*/
	setColor: function(_color){
		this.color = _color;
	}


});

if(typeof module != 'undefined'){
    module.exports = Label;
}
