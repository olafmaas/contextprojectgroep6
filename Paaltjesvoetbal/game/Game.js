//Game class
if(typeof module != 'undefined'){
	var CoreGame = require('./CoreGame.js');
	var RenderEngine = require('./RenderEngine.js');
}
/**
* Game class
* @class Game
* @classdesc Game class for setting up the game/field.
* @constructor
* @param {function} intialize - Initialize function
* @param {function} load - Load function
* @param {function} update - Update function
* @param {function} draw - Draw function
*/
function Game(_initialize, _loadContent, _update, _draw, _width, _height, _resW, _resH){
	var coreGame = new CoreGame(_initialize, _update, _width, _height);
	var renderEngine = new RenderEngine(_loadContent, _draw, _width, _height, _resW, _resH);

	this.instantiate = function(_object){
		return coreGame.instantiate(_object);
	}

	this.remove = function(_object){
		coreGame.remove(_object);
	}

	this.draw = function(){
		renderEngine.drawGame(coreGame);
	}

	//====================
	//Section: gets & sets
	
	/**
	* Returns the input
	* @method Game#getInput
	* @return {input} The input object
	*/
	this.getInput = function(){
		return input;
	}

	/**
	* Returns the background color
	* @method Game#getBackgroundColor
	* @return{color} The background color
	*/
	this.getBackgroundColor = function(){
		return renderEngine.getBackgroundColor();
	}

	/**
	* Returns the boolean which represents if the game is updating or not
	* @method Game#getUpdating
	* @return{boolean} The value
	*/
	this.getUpdating = function(){
		return coreGame.getUpdating();
	}

	/**
	* Getter for the drawing state of the renderengine
	*
	* @method Game#getDrawing
	* @return{color} The background color
	*/
	this.getDrawing = function(){
		return renderEngine.getDrawing();
	}

	/**
	* Sets the background color
	* @method Game#setBackgroundColor
	*/
	this.setBackgroundColor = function(_color){
		renderEngine.setBackgroundColor(_color);
	}

	/**
	* Returns the width of the canvas
	* @method Game#getWidth
	*/
	this.getWidth = function(){
		return coreGame.getDimensions().width;
	}

	/**
	* Returns the height of the canvas
	* @method Game#getHeight
	*/
	this.getHeight = function(){
		return coreGame.getDimensions().height;
	}

	this.getDimensions = function(){
		return coreGame.getDimensions();
	}

	/**
	* Sets the width of the canvas
	* @method Game#setWidth
	*/
	this.setWidth = function(_width){
		coreGame.setDimensions(_width, coreGame.getDimensions().height);
	}

	/**
	* Sets the height of the canvas
	* @method Game#setHeight
	*/
	this.setHeight = function(_height){
		coreGame.setDimensions(coreGame.getDimensions().width, _height);
	}

	this.setDimensions = function(_width, _height){
		coreGame.setDimensions(_width, _height);
	}

	this.setUpdating = function(_updating){
		coreGame.setUpdating(_updating);
	}

	this.setDrawing = function(_drawing){
		coreGame.setDrawing(_drawing);
	}
}

if(typeof module != 'undefined'){
    module.exports = Game;
}  
