/**
* Input class
* @class Input
* @classdesc Input class
* @constructor
*
*/
var input = {
	mainPointer: {isActive: true, x: 0, y: 0},

	/**
	* Listener for mouse movement to save X and Y position 
	*
	* @method Input#mouseMoveListener
	* @param {event} _e - The events arguments
	*/
	mouseMoveListener: function(_e){
		this.mainPointer = {isActive: true, x: _e.clientX, y: _e.clientY};

		setMainPointer(this.mainPointer.x, this.mainPointer.y);
	},

	/**
	* Listener for mouse down for the pause functionality (debugging purpose only)
	*
	* @method Input#mouseDownListener
	* @param {event} _e - The event arguments
	*/
	mouseDownListener: function(_e){
		mouseDown = 1 - mouseDown;
	},

	/**
	* Listener for the touch start event
	*
	* @method Input#touchStartListener
	* @param {event} _e - The event arguments
	*/
	touchStartListener: function(_e){
		_e.preventDefault();

		setMainPointer(_e.targetTouches[0].pageX, _e.targetTouches[0].pageY);
	},

	/**
	* Listener for the touch move event
	*
	* @method Input#touchMoveListener
	* @param {event} _e - The event arguments
	*/
	touchMoveListener: function(_e){
		_e.preventDefault();

		setMainPointer(_e.targetTouches[0].pageX, _e.targetTouches[0].pageY);
	}
}

var mouseX = 0;
var mouseY = 0;
var mouseDown = 0;

/**
* A getter for the activePointer location
*
* @method Input#getMainPointer
* @return {object} - Object which contains the x and y position
*/
getMainPointer = function(){
	return {x: mouseX, y:mouseY};
}

/**
* A setter for the activePointer location
*
* @method Input#setMainPointer
* @param {float} _x - The new x position of the pointer
* @param {float} _y - The new y position of the pointer
*/
setMainPointer = function(_x, _y){
	mouseX = _x;
	mouseY = _y;
}

if(typeof module != 'undefined'){
	module.exports = input;
}
