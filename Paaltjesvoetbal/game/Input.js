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
	* @method Game#mouseMoveListener
	*/
	mouseMoveListener: function(_e){
		this.mainPointer = {isActive: true, x: _e.clientX, y: _e.clientY};
		//console.log(this.mainPointer);

		mouseX = this.mainPointer.x;
		mouseY = this.mainPointer.y;
	},

	//'Pause' when you click in the canvas (for debugging)
	mouseDownListener: function(_e){
		mouseDown = 1 - mouseDown;
	}
}

var mouseX = 0;
var mouseY = 0;
var mouseDown = 0;
var previousVel = []; 

if(typeof module != 'undefined'){
	module.exports = mouseX;
	module.exports = mouseY;
	module.exports = mouseDown;
	module.exports = previousVel;
}
