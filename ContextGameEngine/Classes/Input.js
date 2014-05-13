InputManager = function(){
	this.mainPointer = {isActive: true, x: 0, y: 0};

	this.Update = function(){
		//TODO: update main pointer door muis of touchscreen
		
		console.log(this.mainPointer);
	};

	this.MouseMoveListener = function(e){
		this.mainPointer = {isActive: true, x: e.clientX, y: e.clientY};
		console.log(this.mainPointer);
	};
}