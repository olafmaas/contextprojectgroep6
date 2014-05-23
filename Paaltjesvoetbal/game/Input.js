/**
* Input class
* 
* @class Input
* @classdescr Input class
* @constructor
*
*/

var input = {
	mainPointer: {isActive: true, x: 0, y: 0},

	/**
	* The update function for updating the input
	* 
	* @method Input#update
	*/
	update: function(){
		//TODO: update main pointer door muis of touchscreen
		
		//console.log(this.mainPointer);
	},

	/**
	* Listener for mouse movement to save X and Y position 
	*
	* @method Input#mouseMoveListener
	*/
	mouseMoveListener: function(_e){
		this.mainPointer = {isActive: true, x: _e.clientX, y: _e.clientY};
		//console.log(this.mainPointer);

		mouseX = this.mainPointer.x;
		mouseY = this.mainPointer.y;
	},

	/**
	* Listener for mouse down for the pause functionality (debuggin purpose only)
	*
	* @method Input#mouseDownListener
	*/
	mouseDownListener: function(_e){
		mouseDown = 1 - mouseDown;
	},

	setMousePos: function(_x,_y){
		this.mainPointer = {isActive: true, x: _x, y: _y};

		mouseX = _x;
		mouseY = _y;
	},

	getMouseX: function(){
		return mouseX;
	},

	getMouseY: function(){
		return mouseY;
	}
}

var mouseX = 0;
var mouseY = 0;
var mouseDown = 0;

if(typeof module != 'undefined'){
	module.exports = input;
}
