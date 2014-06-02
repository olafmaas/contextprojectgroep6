//Game class
if(typeof module != 'undefined'){
	var highResolutionTimer = require('./HighResolutionTimer.js');
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
	* @return {backGroundColor} The background color
	*/
	this.getBackgroundColor = function(){
		return renderEngine.getBackgroundColor();
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
}

if(typeof module != 'undefined'){
    module.exports = Game;
}  
