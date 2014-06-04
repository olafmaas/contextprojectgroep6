function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.radius = 10;
	this.minTime = 3;
	this.maxTime = 3;
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
