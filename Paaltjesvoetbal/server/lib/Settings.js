function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.minTime = 1;
	this.maxTime = 2;
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
