function Game(load, update, draw){
	var width, height;
	var backGroundColor;
	var canv;

	parentUpdate = function(){
		updateGameDimensions();
		input.update();

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
		width = document.body.clientWidth;
		height = document.body.clientHeight;
		backGroundColor = "#000000";

		canv = createCanvas();
		canv.onmousemove = input.mouseMoveListener;
	}

	Boot = function(){
		load();
		setInterval(parentUpdate, 17);
	}

	Initialize();
	setTimeout(Boot, 1000);

	//====================
	//Section: gets & sets
	this.getInput = function(){
		return input;
	}

	this.getBackgroundColor = function(){
		return backGroundColor;
	}

	this.setBackgroundColor = function(_color){
		backGroundColor = _color;
	}
}