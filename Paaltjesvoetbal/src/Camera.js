//Camera class

//Properties of the camera object
Camera = function(){
	var center = {x: 0, y: 0};
	var zoom - 1;

	/**
	* Get the center position of the camera
	*
	* @method getCenter
	*/
	this.getCenter = function(){
		return center;
	}

	/**
	* Get the zoom factor of the camera
	* @method getZoom
	*/
	this.getZoom = function(){
		return zoom;
	}
}