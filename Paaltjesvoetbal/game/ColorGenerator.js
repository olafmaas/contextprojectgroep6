/**
* Class for a color generator
* @class ColorGenerator
* @classdesc Color generator class
* @static
*/
var ColorGenerator = {
	
	colors: ["#988CFF", "#FF8C8C", "#8CE4FF", "#90FF8C", "#F4FF8C", "#FFBC8C", 
	"#FF8CF5", "#FF4040", "#FF40DC", "#4640FF", "#29FFFB", "#38FF49", "#F5FF38", "#FF1717"],
	
	/**
	* Returns a random color from the predefined color list above.
	* @method ColorGenerator#returnColor
	*/
	returnColor: function(){
		return this.colors[parseInt(Math.random()*this.colors.length)];
	}
}