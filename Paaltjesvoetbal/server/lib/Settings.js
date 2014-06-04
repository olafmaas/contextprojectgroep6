function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.minTime = 15;
	this.maxTime = 45;
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
