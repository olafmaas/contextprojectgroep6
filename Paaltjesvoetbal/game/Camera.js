//Properties of the camera object

/**
* Camera class
*
* @class Camera
* @classdesc Camera class
* @constructor
*/
Camera = function(){
	var center = {x: 0, y: 0};
	var zoom - 1;
	
	/**
	* Get the center position of the camera
	*
	* @method getCenter
	* @return {number, number} The center, (x, y) coordinates, of the camera.
	*/
	this.getCenter = function(){
		return center;
	}
	
	/**
	* Get the zoom factor of the camera
	*
	* @method getZoom
	* @return {number} The current zoom level of the camera.
	*/
	this.getZoom = function(){
		return zoom;
	}
}
	
if(typeof module != 'undefined'){
    module.exports = Camera;
}
