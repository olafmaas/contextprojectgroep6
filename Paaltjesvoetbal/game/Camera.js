if(typeof module != 'undefined'){
    var Base = require('./Base.js');
}

/**
* Camera class
*
* @class Camera
* @classdesc Camera class
* @constructor
*/
var Camera = Base.extend({
	center: {x: 0, y: 0},
	zoom: 1,
	
	/**
	* Get the center position of the camera
	*
	* @method Camera#getCenter
	* @return {number, number} The center, (x, y) coordinates, of the camera.
	*/
	getCenter: function(){
		return this.center;
	},
	
	/**
	* Get the zoom factor of the camera
	*
	* @method Camera#getZoom
	* @return {number} The current zoom level of the camera.
	*/
	getZoom: function(){
		return this.zoom;
	}
});
	
if(typeof module != 'undefined'){
    module.exports = Camera;
}
