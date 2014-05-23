/**
* Class for a color generator
* @class ColorGenerator
* @classdesc Color generator class
*/
var ColorGenerator = {
	
	colors: ["#988CFF", "#FF8C8C", "#8CE4FF", "#90FF8C", "#F4FF8C", "#FFBC8C", "#FF8CF5"],
	
	returnColor: function(){
		return colors[parseInt(Math.random()*colors.length)];
	}
}