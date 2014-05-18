var input = {
	mainPointer: {isActive: true, x: 0, y: 0},

	/**
	* The update function for updating the input
	* 
	* @method Update
	*/
	update: function(){
		//TODO: update main pointer door muis of touchscreen
		
		//console.log(this.mainPointer);
	},

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