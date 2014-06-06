function BallTO(_color, _globalID){
	var color = _color;
	var globalID = _globalID;

	this.setColor = function(_color){
		color = color;
	}

	this.setGlobalID = function(_color){
		globalID = _globalID;
	}

	this.getColor = function(){
		return this.color;
	}

	this.getGlobalID = function(){
		return this.globalID;
	}

}