var scale = 1;

/**
* The engine for rendering sprites, balls and other game objects
* 
* @class RenderEngine
* @param {function} _loadContent - The user-defined loadcontent function to be called
* @param {function} _draw - The user-defined draw function to be called
* Other parameters are optional
*/
function RenderEngine(_loadContent, _draw, _width, _height, _resWidth, _resHeight){
	var loadContent = _loadContent;
	var draw = _draw;

	var canvas;
	var canvasContext;
	var drawer;
	var dimensions = {width: (_width || 0), height: (_height || 0)};
	var resolution = {width: (_resWidth || 0), height: (_resHeight || 0)}

	var fpsLimit;

	var drawing = true;

	/**
	* Function for booting the RenderEngine
	* @method RenderEngine#boot
	*/
	this.boot = function(){
		initialize();
		parentLoadContent();

		setInterval(parentDraw, 1000/fpsLimit);
	}

	/**
	* Function for initializing class variables
	* @method RenderEngine#initialize
	*/
	initialize = function(){
		backGroundColor = Settings.canvasColor;
		fpsLimit = fpsLimit || 60;
		initializeCanvas();
		initializeListeners();

		drawer = new Drawer(canvasContext);
	}

	/**
	* Function for loading class-internal and external content
	* @method RenderEngine#parentLoadContent
	*/
	parentLoadContent = function(){
		loadContent();
	}

	/**
	* Function for setting event listeners
	* @method RenderEngine#initializeListeners
	*/
	initializeListeners = function(){
		canvas.onmousemove = input.mouseMoveListener;
		canvas.ontouchmove = input.touchMoveListener;
		if(hasResolution()){
			window.onresize = updateCanvasSize;
			window.onorientationchange = checkOrientation;
		}

	}

	/**
	* Function for initializing canvas
	* @method RenderEngine#initializeCanvas
	*/
	initializeCanvas = function(){
		canvas = createCanvas();
		updateCanvasSize();
		canvasContext = canvas.getContext("2d");
	}

	/**
	* Update function for the RenderEngine
	* @method RenderEngine#updateCanvasSize
	*/
	updateCanvasSize = function(){
		if(canvas == undefined) return;

		var canvasRatio = canvas.height / canvas.width;
		var windowRatio = window.innerHeight / window.innerWidth;

        if(hasResolution()){
        	this.updateResolution(windowRatio, canvasRatio)
        }else{
        	var height = dimensions.height;
        	var width = dimensions.width;
        	canvas.width = width + "px";
			canvas.height = height + "px";
        }
	}

	updateResolution = function(windowRatio, canvasRatio){
		if (windowRatio < canvasRatio) {
	        var height = window.innerHeight;
	        scale = window.innerHeight/canvas.height;
	        var width = canvas.width * scale;
    	} 
		else {
            var width = window.innerWidth;
            scale = window.innerWidth/canvas.width;
            var height = canvas.height * scale;
    	}
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
	}

	updateMainScreenCanvasSize = function(){
		if(canvas == undefined) return;

		var windowWidth = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		var windowHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;


		canvas.style.width = windowWidth + "px";
		canvas.style.height = windowHeight + "px";

		if(hasResolution){
			canvas.width = resolution.width + "px";
			canvas.height = resolution.height + "px";
		}
	}

	/**
	* Method which returns if the resolution is correct.
	* @method RenderEngine#hasResolution
	* @return {boolean} - True or False
	*/
	hasResolution = function() {
		return resolution.height && resolution.width;
	}

	/**
	* Checks the orientation and change of the canvas size. 
	* @method RenderEngine#checkOrientation
	*/
	checkOrientation = function(){
		if(Math.abs(window.orientation) == 90){
            updateCanvasSize();
        }else{
           // alert("For an optimal experience please hold your device horizontal.");
        }
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
	* Draw function for drawing all the elements in a game.
	* @method RenderEngine#drawGame
	* @param{CoreGame} _game - The game to be drawn.
	*/
	this.drawGame = function(_game){
		if(!drawing) return;

		if(!(_game instanceof CoreGame)) throw "The argument is not an instance of Game";

		var elements = _game.getGameElements();

		for(var i = 0; i < elements.length; i++) this.drawElement(elements[i]);
	}

	/**
	* Create function for the game field (canvas)
	* @method RenderEngine#createCanvas
	*/
	createCanvas = function(){
		var canv = document.createElement("canvas");
		canv.id = 'gameCanvas';

		if(hasResolution()){
			canv.setAttribute("height", resolution.height + "px");
			canv.setAttribute("width", resolution.width + "px");
		}

		//Wait for body to initialize
		while(document.body == null);

		var gameDiv = document.getElementById("gameDiv");

		if(gameDiv == null) document.body.appendChild(canv);
		else gameDiv.appendChild(canv);
		
		return document.getElementById("gameCanvas");
	}


	/**
	* Function which clears the canvas
	* @method RenderEngine#clearCanvas
	*/
	clearCanvas = function(){
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		canvasContext.fillStyle = backGroundColor;
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	}

	/**
	* Function which draws the specified object to the game canvas
	*
	* @method RenderEngine#drawElement
	* @param {object} _element - The game object to be drawn
	*/
	this.drawElement = function(_element){
		drawer.draw(_element);
	}

	//Make the engine boot 1 second after instantiating
	//this.boot();
	setTimeout(this.boot, Settings.bootTime);

	
	
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
	* Getter for the drawing state of the renderengine
	*
	* @method RenderEngine#getDrawing
	* @return{boolean} The drawing state
	*/
	this.getDrawing = function(){
		return drawing;
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

	/**
	* Setter for the drawing state of the renderengine
	*
	* @method RenderEngine#setDrawing
	* @return{boolean} The drawing state
	*/
	this.getDrawing = function(_drawing){
		drawing = _drawing;
	}
}

if(typeof module != 'undefined'){
    module.exports = RenderEngine;
}
