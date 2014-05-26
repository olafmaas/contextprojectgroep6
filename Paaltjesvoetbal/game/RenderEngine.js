/*
* The engine for rendering sprites, balls and other game objects
* 
* @class RenderEngine
* @param{function} _loadContent - The user-defined loadcontent function to be called
* @param{function} _draw - The user-defined draw function to be called
*/
function RenderEngine(_loadContent, _draw){
	var loadContent = _loadContent;
	var draw = _draw;

	var canvas;
	var canvasContext;

	var fpsLimit;

	var backGroundColor;

	/**
	* Function for booting the RenderEngine
	* 
	* @method RenderEngine#sboot
	*/
	this.boot = function(){
		initialize();
		parentLoadContent();
		setInterval(draw, 1000/fpsLimit);
	}

	/**
	* Function for initializing class variables
	* 
	* @class RenderEngine#initialize
	*/
	initialize = function(){
		backGroundColor = "black";
		fpsLimit = fpsLimit || 60;
		window.onresize = updateCanvasSize();
	}

	/**
	* Function for loading class-internal and external content
	*
	* @method RenderEngine#parentLoadContent
	*/
	parentLoadContent = function(){
		canvas = createCanvas();
		canvasContext = canvas.getContext("2d");
		loadContent();
	}

	/**
	* Update function for the RenderEngine
	*
	* @method RenderEngine#update
	*/
	updateCanvasSize = function(){
		var width=window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		var height=window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

		canv.width = width;
		canv.height = height;
	}

	/**
	* Draw function
	* @method RenderEngine#parentDraw
	*/
	parentDraw = function(){
		clearCanvas();
		draw();
	}

	/**
	* Draw function for drawing all the elements in a game
	* @method RenderEngine#drawGame
	* @param{CoreGame} _game - the game to be drawn
	*/
	this.drawGame = function(_game){
		if(!(_game instanceof CoreGame)) throw "The argument is not an instance of Game";

		var elements = _game.getGameElements();

		for(int i = 0; i < elements.length; i++) this.drawElement(elements[i]);
	}

	/**
	* Create function for the game field (canvas)
	* @method RenderEngine#createCanvas
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
	* Function which clears the canvas
	* @method RenderEngine#clearCanvas
	*/
	clearCanvas = function(){
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = backGroundColor;
		ctx.fillRect(0, 0, width, height);
	}

	/**
	* Function which draws the specified object to the game canvas
	*
	* @method RenderEngine#drawObject
	* @param{object} _object - The game object to be drawn
	*/
	this.drawElement = function(_element){
		//TODO: draw handling
	}

	//Make the engine boot 1 second after instantiating
	setTimeout(this.boot, 1000);

	//======================
	// Gets & Sets
	//======================

	/**
	* Getter for the background color
	*
	* @method RenderEngine#getBackgroundColor
	* @return{color} The background color
	*/
	this.getBackgroundColor = function(){
		return backGroundColor;
	}

	/**
	* Setter for the background color
	*
	* @method RenderEngine#setBackgroundColor
	* @param{color} _color - The background color
	*/
	this.setBackgroundColor = function(_color){
		backGroundColor = _color;
	}
}