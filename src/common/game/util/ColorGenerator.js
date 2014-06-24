/**
* Class for a color generator
* @class ColorGenerator
* @classdesc Color generator class
* @static
*/
var ColorGenerator = {	

	colors: Setting.balls.colors,

	/**
	* Returns a random color from the predefined color list above.
	* @method ColorGenerator#returnColor
	*/
	returnColor: function(){
		return this.colors[parseInt(Math.random()*this.colors.length)];
	}
}

if(typeof module != 'undefined'){
    module.exports = ColorGenerator;
} 
