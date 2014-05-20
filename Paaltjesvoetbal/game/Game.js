//Game class

/**
* Game class
* @class Game
* @classdesc Game class for setting up the game/field.
* @constructor
* @param {function} load - Load function
* @param {function} update - Update function
* @param {function} draw - Draw function
*/
function Game(load, update, draw){
	var width = 40; 
	var height = 40;
	var backGroundColor;
	var canv;
	var score = 0;
	var label = new Label("Score: 0:00");

	/**
	* Draw function
	* @method Game#parentDraw
	*/
	parentDraw = function(){
		var ctx = canv.getContext("2d");
		
		clearCanvas();
		draw(ctx);
		
		label.draw(ctx);
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
	* Function which updates the score
	* @method Game#updateScore
	*/
	updateScore = function(){
		var lblPosition = {x: 500, y: 500};
		label.setPosition(lblPosition);

		if(score < 10){
			label.setText("Score: 0:0" + score);
		}
		else if(score < 60){
			label.setText("Score: 0:" + score);
		}
		else{
			var min = Math.floor(score / 60);
			var sec = score % 60;
			if(sec < 10) { sec = '0' + sec; }
			label.setText("Score: " + min + ":" + sec);
		}
		++score;
	}
	setInterval(updateScore, 1000);

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
		setInterval(update, 17);
	}

	setTimeout(Boot, 1000);

	//====================
	//Section: gets & sets
	
	/**
	* Returns the input
	* @method Game#getInput
	* @return {input} The input object
	*/
	this.getInput = function(){
		return input;
	}

	/**
	* Returns the background color
	* @method Game#getBackgroundColor
	* @return {backGroundColor} The background color
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

	/**
	* Sets the width of the canvas
	* @method Game#setWidth
	*/
	this.setWidth = function(_width){
		width = _width;
	}

	/**
	* Sets the height of the canvas
	* @method Game#setHeight
	*/
	this.setHeight = function(_height){
		height = _height;
	}
}

if(typeof module != 'undefined'){
    module.exports = Game;
}  
