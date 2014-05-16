Camera = function(){
	var center = {x: 0, y: 0};
	var zoom - 1;

	/**
	* Get the center position
	*
	* @method getCenter
	*/
	this.getCenter = function(){
		return center;
	}

	/**
	* Get the zoom factor
	* 
	* @method getZoom
	*/
	this.getZoom = function(){
		return zoom;
	}
}