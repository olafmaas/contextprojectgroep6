function Game(load, update, draw){
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	var backGroundColor = "#000000";

	parentUpdate = function(){
		updateGameDimensions();

		update();

		parentDraw();
	}

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
		canv = createCanvas();
	}

	Boot = function(){
		load();
		setInterval(parentUpdate, 17);
	}

	Initialize();
	Boot();
}

function Sprite(){
	var texture;
	var position = {x: 0, y: 0};
	var origin = {x: 0, y: 0};

	this.LoadContent = function(texturePath){

	}

	this.Draw = function(){

	}
}