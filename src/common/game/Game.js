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
* @param {function} _intialize - Initialize function
* @param {function} _loadContent - Load function
* @param {function} _update - Update function
* @param {function} _draw - Draw function
* @param {value} _width - The width of the field (optional)
* @param {value} _height - The height of the field (optional)
* @param {value} _resW - The width resolution of the field (optional)
* @param {value} _resH - The height resolution of the field (optional)
*/
function Game(_initialize, _loadContent, _update, _draw, _width, _height, _resW, _resH, isMainScreen){
	var coreGame = new CoreGame(_initialize, _update, _width, _height);
	var renderEngine = new RenderEngine(_loadContent, _draw, _width, _height, _resW, _resH, isMainScreen);

	/**
	* Instantiates the given object
	*
	* @method Game#instantiate
	* @return {object} - The instantiated object
	*/
	this.instantiate = function(_object){
		return coreGame.instantiate(_object);
	}

	/**
	* Removes the given object
	*
	* @method Game#remove
	*/
	this.remove = function(_object){
		coreGame.remove(_object);
	}

	/**
	* Draws the given object
	*
	* @method Game#draw
	*/
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
	* Assigns a boolean value whether the game is updating or not
	* 
	* @method Game#setUpdating
	*/
	this.setUpdating = function(_updating){
		coreGame.setUpdating(_updating);
	}

	/**
	* Setter for the drawing state of the renderengine
	* 
	* @method Game#setDrawing
	*/
	this.setDrawing = function(_drawing){
		coreGame.setDrawing(_drawing);
	}

	
	
	this.getBackgroundColor = function(){
		return renderEngine.getBackgroundColor();
	}

	this.setBackgroundColor = function(_color){
		renderEngine.setBackgroundColor(_color);
	}

	this.getWidth = function(){
		return coreGame.getDimensions().width;
	}

	this.getHeight = function(){
		return coreGame.getDimensions().height;
	}

	this.getDimensions = function(){
		return coreGame.getDimensions();
	}

	this.setWidth = function(_width){
		coreGame.setDimensions(_width, coreGame.getDimensions().height);
	}

	this.setHeight = function(_height){
		coreGame.setDimensions(coreGame.getDimensions().width, _height);
	}

	this.setDimensions = function(_width, _height){
		coreGame.setDimensions(_width, _height);
	}
}

if(typeof module != 'undefined'){
    module.exports = Game;
}  
