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

	/*
	* The boot function to boot the game
	* @method CoreGame#boot
	*/
	this.boot = function(){
		parentInitialize();
		
		setInterval(_update, 17);
	}

	/*
	* The parent initialize function
	* 
	* @method CoreGame#parentInitialize
	*/
	parentInitialize = function(){
		initialize();
	}
	
	//===================
	//Getters & Setters
	//===================

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
}