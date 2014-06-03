var scale = 1;
/*
* The engine for rendering sprites, balls and other game objects
* 
* @class RenderEngine
* @param{function} _loadContent - The user-defined loadcontent function to be called
* @param{function} _draw - The user-defined draw function to be called
*/
function RenderEngine(_loadContent, _draw, _width, _height, _resWidth, _resHeight ,debug){
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
	* 
	* @method RenderEngine#sboot
	*/
	this.boot = function(){
		initialize();
		parentLoadContent();

		setInterval(parentDraw, 1000/fpsLimit);
	}

	/**
	* Function for initializing class variables
	* 
	* @class RenderEngine#initialize
	*/
	initialize = function(){
		backGroundColor = "black";
		fpsLimit = fpsLimit || 60;
		initializeCanvas();
		initializeListeners();

		drawer = new Drawer(canvasContext);
	}

	/**
	* Function for loading class-internal and external content
	*
	* @method RenderEngine#parentLoadContent
	*/
	parentLoadContent = function(){

		loadContent();
	}

	/**
	* Function for setting event listeners
	*
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
	*
	* @method RenderEngine#initializeCanvas
	*/
	initializeCanvas = function(){
		canvas = createCanvas();
		updateCanvasSize();
		canvasContext = canvas.getContext("2d");
	}

	/**
	* Update function for the RenderEngine
	*
	* @method RenderEngine#update
	*/
	updateCanvasSize = function(){
		if(canvas == undefined) return;

		var canvasRatio = canvas.height / canvas.width;
		var windowRatio = window.innerHeight / window.innerWidth;
		var windowWidth= window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		var windowHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;

        if(hasResolution()){
        	if (windowRatio < canvasRatio) {
	            var height = window.innerHeight;
	            scale = window.innerHeight/canvas.height;
        	} else {
	            var width = window.innerWidth;
	            scale = window.innerWidth/canvas.width;
        	}
			canvas.style.width = width + "px";
			canvas.style.height = height + "px";
        }else{
        	var height = dimensions.height;
        	var width = dimensions.width;
        	canvas.width = width + "px";
			canvas.height = height + "px";
        }


	}

	hasResolution = function() {
		return resolution.height && resolution.width;
	}

	/**
	* Checks the orientation and change the canvas size. 
	*
	* @method RenderEngine#update
	*/
	checkOrientation = function(){
		if(Math.abs(window.orientation) == 90){
            updateCanvasSize();
        }else{
            alert("For an optimal experience please hold your device horizontal.");
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
	* Draw function for drawing all the elements in a game
	* @method RenderEngine#drawGame
	* @param{CoreGame} _game - the game to be drawn
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

		document.body.appendChild(canv);

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
	* @method RenderEngine#drawObject
	* @param{object} _object - The game object to be drawn
	*/
	this.drawElement = function(_element){
		drawer.draw(_element);
	}

	//Make the engine boot 1 second after instantiating
	//this.boot();

	setTimeout(this.boot, 10);

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

Drawer = function(_canvasContext){
	canvasContext = _canvasContext;

	this.draw = function(_element){
		if(_element instanceof Ball) this.drawBall(_element);
		else if(_element instanceof Pole) this.drawBall(_element);
		else if(_element instanceof Shield) this.drawShield(_element);
		else if(_element instanceof Label) this.drawLabel(_element);
		else if(_element instanceof Powerup) this.drawPowerup(_element);
	};

	this.drawBall = function(_ball){
		canvasContext.beginPath();
		canvasContext.arc(_ball.getBody().position.x, _ball.getBody().position.y, _ball.radius, 0, Math.PI*2, true);
		canvasContext.closePath();

		canvasContext.fillStyle = _ball.color;
		canvasContext.fill();
	};

	this.drawSprite = function(_sprite){
		throw "Unimplemented - Check Sprite.js, the sets and gets are not finished";
	};

	this.drawShield = function(_shield){
		canvasContext.beginPath();
  		canvasContext.arc(_shield.getPosition().x, _shield.getPosition().y, _shield.getRadius(), _shield.getAngle() - (_shield.getSize() / 2), _shield.getAngle() + (_shield.getSize() / 2));
  		canvasContext.strokeStyle = _shield.getColor();
  		canvasContext.stroke();
	};

	this.drawLabel = function(_label){
		canvasContext.fillStyle = _label.getColor();
		canvasContext.font = _label.getFontSize() + "px " + _label.getFont();
		canvasContext.fillText(_label.getText(), _label.getPosition().x, _label.getPosition().y);
	};

	this.drawPowerup = function (_powerup){
		canvasContext.beginPath();
		canvasContext.arc(_powerup.getPosition().x, _powerup.getPosition().y, _powerup.getRadius(), 0, Math.PI*2, true);
		canvasContext.closePath();
		
		canvasContext.fillStyle = _powerup.getColor();
		canvasContext.fill();
	};
}
