function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.radius = 10;
	this.minTime = 4;
	this.maxTime = 4;
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
