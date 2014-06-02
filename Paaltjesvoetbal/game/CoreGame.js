if(typeof module != 'undefined'){
	var highResolutionTimer = require('./HighResolutionTimer.js');
}
/*
* A fully functional game class without any graphical handling
*
* @class CoreGame
* @param{function} _initialize - The initialize function
* @param{function} _update - The update function
*/
function CoreGame(_initialize, _update, _width, _height){
	var dimensions = {width: (_width || 0), height: (_height || 0)};
	var initialize = _initialize;
	var update = _update;
	var elements = [];

	/*
	* The boot function to boot the game
	* @method CoreGame#boot
	*/
	this.boot = function(){
		parentInitialize();
		
		setInterval(parentUpdate, 17);
	}

	/*
	* The parent initialize function
	* 
	* @method CoreGame#parentInitialize
	*/
	parentInitialize = function(){
		initialize();
	}

	/*
	* The parent update function
	*
	* @method CoreGame#parentUpdate
	*/
	var myDate = Date.now();
	parentUpdate = function(){
		console.log(Date.now() - myDate);
		myDate = Date.now();
		update();
	}

	/*
	* Function to instantiate game elements
	*
	* @method CoreGame#instantiate
	* @param{object} _element - The element to instantiate
	*/
	this.instantiate = function(_element){
		elements.push(_element);
		return _element;
	}

	//this.boot();
	setTimeout(this.boot, 50);
	
	//===================
	//Getters & Setters
	//===================

	/*
	* A getter for the game elements
	*
	* @method CoreGame#getGameElements
	*/
	this.getGameElements = function(){
		return elements;
	}

	/*
	* A setter for the game dimensions
	*
	* @method CoreGame#setDimensions
	* @param{float} _width - The new game width
	* @param{float} _height - The new game height
	*/
	this.setDimensions = function(_width, _height){
		dimensions = {width: _width, height: _height};
	}

	/*
	* A getter for the game dimensions
	*
	* @method CoreGame#getDimensions
	* @return{object} An object with a width and height value
	*/
	this.getDimensions = function(){
		return dimensions;
	}

	this.setWidth = function(_width){
		dimensions.width = _width;
	}

	this.setHeight = function(_height){
		dimensions.height = _height;
	}

	this.getWidth = function(){
		return dimensions.width;
	}

	this.getHeight = function(){
		return dimensions.height;
	}
}

if(typeof module != 'undefined'){
    module.exports = CoreGame;
}  
