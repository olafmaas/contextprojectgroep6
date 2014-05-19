function Game(load, update, draw){
	var width = 40; 
	var height = 40;
	var backGroundColor;
	var canv;

	parentDraw = function(){
		var ctx = canv.getContext("2d");

		clearCanvas();
		draw(ctx);
	}

	createCanvas = function(){
		var canv = document.createElement("canvas");
		canv.id = 'gameCanvas';

		canv.width = width;
		canv.height = height;

		document.body.appendChild(canv);

		return document.getElementById("gameCanvas");
	}

	updateGameDimensions = function(){
		width=window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		height=window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

		canv.width = width;
		canv.height = height;
	}

	clearCanvas = function(){
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = backGroundColor;
		ctx.fillRect(0, 0, width, height);
	}

	Initialize = function(){
		width = document.body.clientWidth;
		height = document.body.clientHeight;
		backGroundColor = "#FFFFFF";

		canv = createCanvas();
		canv.onmousemove = Input.mouseMoveListener;
		canv.onmousedown = Input.mouseDownListener;
	}

	Boot = function(){
		load();
		setInterval(update, 17);
	}

	setTimeout(Boot, 1000);

	//====================
	//Section: gets & sets
	this.getInput = function(){
		return Input;
	}

	this.getBackgroundColor = function(){
		return backGroundColor;
	}

	this.setBackgroundColor = function(_color){
		backGroundColor = _color;
	}

	this.getWidth = function(){
		return width;
	}

	this.getHeight = function(){
		return height;
	}

	this.setWidth = function(_width){
		width = _width;
	}

	this.setHeight = function(_height){
		height = _height;
	}
}
  
if(typeof module != 'undefined'){
    module.exports = Game;
}  
