if(typeof module != 'undefined'){
	var Settings = require('../Settings.js');
	var GroupManager2 = require('./util/GroupManager2.js');
}

/**
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
	var thisGame = this;

	var updating = true;

	/**
	* The boot function to boot the game
	* @method CoreGame#boot
	*/
	this.boot = function(){
		parentInitialize();
		
		setInterval(parentUpdate, Settings.updateInterval);
	}

	/**
	* The parent initialize function
	* 
	* @method CoreGame#parentInitialize
	*/
	parentInitialize = function(){
		initialize();
	}

	/**
	* The parent update function
	*
	* @method CoreGame#parentUpdate
	*/
	parentUpdate = function(){
		//Guard
		if(updating){
			//This makes all the elements update individually
			updateElements();
			handleCollisions();
		}

		update();
	}

	/**
	* Function to update all game elements
	*
	* @method CoreGame#updateElements
	*/
	updateElements = function(){
		for(var i = 0; i < elements.length; i++){
			if(elements[i].update !== undefined) elements[i].update();
		}
	}

	/**
	* Function to handle all game object collisions
	*
	* @method CoreGame#handleCollisions
	*/
	handleCollisions = function(){
		for(var i = 0; i < elements.length; i++){
			for(var j = i + 1; j < elements.length; j++){
				handleCollision(elements[i], elements[j]);
			}
		}

		keepInWorldBounds();
	}

	/**
	* Function to make sure all elements stay in the world bounds
	* 
	* @method CoreGame#keepInWorldBounds
	*/
	keepInWorldBounds = function(){
		for(var i = 0; i < elements.length; i++){
			if(elements[i].getBody !== undefined && elements[i].getBody().checkWorldBounds !== undefined)
				elements[i].getBody().checkWorldBounds(thisGame);
		}
	}

	/**
	* Function to instantiate game elements
	*
	* @method CoreGame#instantiate
	* @param{object} _element - The element to instantiate
	*/
	this.instantiate = function(_element){
		GroupManager2.addMember(_element);
		elements.push(_element);
		return _element;
	}

	/**
	* Function to remove game elements
	*
	* @method CoreGame#remove
	* @param{object} _element - The element to remove
	*/
	this.remove = function(_element){
		elementIndex = elements.indexOf(_element);
		elements.splice(elementIndex, 1);
	}

	//this.boot();
	setTimeout(this.boot, 10);
	
	
	//===================
	//Getters & Setters
	//===================

	/**
	* A getter for the game elements
	*
	* @method CoreGame#getGameElements
	*/
	this.getGameElements = function(){
		return elements;
	}

	/**
	* Returns the boolean which represents if the game is updating or not
	* @method CoreGame#getUpdating
	* @return{boolean} The value
	*/
	this.getUpdating = function(){
		return updating;
	}

	/**
	* A setter for the game dimensions
	*
	* @method CoreGame#setDimensions
	* @param{float} _width - The new game width
	* @param{float} _height - The new game height
	*/
	this.setDimensions = function(_width, _height){
		dimensions = {width: _width, height: _height};
	}

	/**
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

	/**
	* Setter for the updating variable
	* @method CoreGame#setUpdating
	* @param{boolean} _updating - The value
	*/
	this.setUpdating = function(_updating){
		updating = _updating;
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
