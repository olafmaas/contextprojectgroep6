/**
* A label class for writing text on the screen
*
* @class Label
* @classdesc Label class for writing text on the screen.
* @constructor
* @param {string} _text - String to write on the screen.
*/
Label = function(_text){
	var text = _text;
	var position = {x: 0, y: 0};
	var font = "Verdana";
	var fontSize = 20;
	var color = "#ffffff" //Var for the font color

	/**
	* Gets the string which is the labels text
	* @method Label#getText
	* @return {string} The text of the label
	*/
	this.getText = function(){
		return text;
	}

	/**
	* Gets the position of the top-left corner of the label
	*
	* @method Label#getPosition
	* @return {object} An position object containing and x and y property
	*/
	this.getPosition = function(){
		return position;
	}

	/**
	* Gets the name of the font
	* @method Label#getFont
	* @return {string} The name of the font.
	*/
	this.getFont = function(){
		return font;
	}

	/**
	* Gets the font size in pixels
	* @method Label#getFontSize
	* @return {number} The font size in pixels.
	*/
	this.getFontSize = function(){
		return fontSize;
	}

	/**
	* Gets the color of the label
	* @method Label#getColor
	* @return {hexcolor} The hex code of the color.
	*/
	this.getColor = function(){
		return color;
	}

	/**
	* Sets the string which is the labels text
	* @method Label#setText
	* @param {string} _text - The text which should be displayed on the label.
	*/
	this.setText = function(_text){
		text = _text;
	}

	/**
	* Sets the position of the left-top corner of the label where it's drawn
	* @method Label#setPosition
	* @param {object} _position - An object containing an x and y value
	*/
	this.setPosition = function(_position){
		position = _position;
	}

	/**
	* Sets the font of the label
	* @method Label#setFont
	* @param {string} _font - The name of the font.
	*/
	this.setFont = function(_font){
		font = _font;
	}

	/**
	* Sets the font size in pixels
	* @method Label#setFontSize
	* @param {number} _fontSize - The size of the font in pixels.
	*/
	this.setFontSize = function(_fontSize){
		fontSize = _fontSize;
	}

	/**
	* Sets the color of the label
	* @method Label#setColor
	* @param {hexcolor} _color - The color in hexidecimal form.
	*/
	this.setColor = function(_color){
		color = _color;
	}
}

if(typeof module != 'undefined'){
    module.exports = Label;
}
