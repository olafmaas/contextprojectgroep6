function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.minTime = 30;
	this.maxTime = 90;
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
