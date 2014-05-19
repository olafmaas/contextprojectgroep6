//Game class

//Properties of the game object
function Game(load, update, draw){
	var width, height;
	var backGroundColor;
	var canv;

	/**
	* Update function for the game object
	* @method Game#parentUpdate
	*/
	parentUpdate = function(){
		updateGameDimensions();
		input.update();

		if(mouseDown) { parentDraw(); return; }
		update();

		parentDraw();
	}

	/**
	* Draw function
	* @method Game#parentDraw
	*/
	parentDraw = function(){
		var ctx = canv.getContext("2d");

		clearCanvas();
		draw(ctx);
	}

	/**
	* Create function for the game field (canvas)
	* @method Game#createCanvas
	*/
	createCanvas = function(){
		var canv = document.createElement("canvas");
		canv.id = 'gameCanvas';

		canv.width = width;
		canv.height = height;

		document.body.appendChild(canv);

		return document.getElementById("gameCanvas");
	}

	/**
	* Function which updates the width and height
	* @method Game#updateGameDimensions
	*/
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

	/**
	* Function which clears the playing field
	* @method Game#clearCanvas
	*/
	clearCanvas = function(){
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = backGroundColor;
		ctx.fillRect(0, 0, width, height);
	}

	/**
	* Initializes the variables
	* @method Game#Initialize
	*/
	Initialize = function(){
		width = document.body.clientWidth;
		height = document.body.clientHeight;
		backGroundColor = "#FFFFFF";

		canv = createCanvas();
		canv.onmousemove = input.mouseMoveListener;
		canv.onmousedown = input.mouseDownListener;
	}

	/**
	* Starts up the game itself
	* @method Game#Boot
	*/
	Boot = function(){
		load();
		setInterval(parentUpdate, 17);
	}

	Initialize();
	setTimeout(Boot, 1000);

	//====================
	//Section: gets & sets
	
	/**
	* Returns the input
	* @method Game#getInput
	*/
	this.getInput = function(){
		return input;
	}

	/**
	* Returns the background color
	* @method Game#getBackgroundColor
	*/
	this.getBackgroundColor = function(){
		return backGroundColor;
	}

	/**
	* Sets the background color
	* @method Game#setBackgroundColor
	*/
	this.setBackgroundColor = function(_color){
		backGroundColor = _color;
	}

	/**
	* Returns the width of the canvas
	* @method Game#getWidth
	*/
	this.getWidth = function(){
		return width;
	}

	/**
	* Returns the height of the canvas
	* @method Game#getHeight
	*/
	this.getHeight = function(){
		return height;
	}
}