/**
* A label class for writing text on the screen
*
* @class Label
* @classdesc Label class for writing text on the screen.
* @constructor
* @param {string} _text - String to write on the screen.
*/
Label = function(_text){
	var text = _text; //Var containing the string
	var position = {x: 0, y: 0}; //Var for the position
	var font = "Verdana"; //Var for the font
	var fontSize = 20; //Var for the font size
	var color = "#000000" //Var for the font color

	/**
	* Draws the label on the game canvas
	* @method Label#draw
	* @param {CanvasContext} _canvasContext - The canvascontext which should be drawn.
	*/
	this.draw = function(_canvasContext){
		_canvasContext.font = this.getFontSize() + "px " + this.getFont();
		_canvasContext.fillText(this.getText(), this.getPosition().x, this.getPosition().y)
	}

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
	* @return {float} The font size in pixels.
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
	*
	* @method Label#setFontSize
	* @param {float} _fontSize - The size of the font in pixels.
	*/
	this.setFontSize = function(_fontSize){
		fontSize = _fontSize;
	}

	/**
	* Sets the color of the label
	*
	* @method Label#setColor
	* @param {hexcolor} _color - The color in hexidecimal form.
	*/
	this.setColor = function(_color){
		color = _color;
	}
}