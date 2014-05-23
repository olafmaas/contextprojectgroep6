/**
* Class for a color generator
* @class ColorGenerator
* @classdesc Color generator class
*/
var ColorGenerator = {
	
	colors: ["#988CFF", "#FF8C8C", "#8CE4FF", "#90FF8C", "#F4FF8C", "#FFBC8C", 
	"#FF8CF5", "#FF4040", "#FF40DC", "#4640FF", "#29FFFB", "#38FF49", "#F5FF38", "#FF1717"],
	
	returnColor: function(){
		return this.colors[parseInt(Math.random()*this.colors.length)];
	}
}