function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.radius = 10;
	this.minTime = 1;
	this.maxTime = 1;
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
