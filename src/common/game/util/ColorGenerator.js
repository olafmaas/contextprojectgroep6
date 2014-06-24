if(typeof module != 'undefined'){
	var Settings = require('../../Settings.js');
}

/**
* Class for a color generator
* @class ColorGenerator
* @classdesc Color generator class
* @static
*/
var ColorGenerator = {	

	colors: Settings.ball.colors,

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
