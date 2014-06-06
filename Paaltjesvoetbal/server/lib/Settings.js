function Settings(){
	this.canvasWidth = 450;
	this.canvasHeight = 350;

	this.radius = 10;
	this.minTime = 10;
	this.maxTime = 30;
};

if(typeof module != 'undefined'){
    module.exports = Settings;
}
