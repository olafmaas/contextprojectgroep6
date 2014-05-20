//Player class

/**
* Player class
* @class Player
* @classdesc Class to represent players with properties.
* @constructor
* @param {String} _name - The name of the player.
*/
function Player(_name){
	
	var name = _name; //Name of the player
	var pole; //Pole belonging to the player
	var shield; //Shield belonging to the player
	var points = 5; //Points the player is worth when hit 
	var score = 0; //Current score of the player
	var highscore = 0; //Highscore of the player
	var label = new Label("Score: 0 | Time alive: 0:00");
	
	//TODO update function
	this.update = function(){

	}

	/**
	* Currently it just draws the score on the canvas
	*
	* @method Player#draw
	* @param {CanvasContext} _canvasContext - The canvas on which it will be drawn.
	*/
	this.draw = function(_canvasContext){

		label.draw(_canvasContext);

		var lblPosition = {x: 500, y: 500}; //hardcoded position for now..
		label.setPosition(lblPosition);
		var min = pole.getTimer().getMinutes();
		var sec = pole.getTimer().getSeconds();

		label.setText("Score: " + score + " | Time alive: " + min + ":" + sec);
	}

	/**
	* Increments the current points by the given amounts
	*
	* @method Player#incrementPoints
	* @param {number} _points - The amount of points by which it should be incremented.
	*/
	this.incrementPoints = function(_points){
		points += _points;
	}

	/**
	* Increments the current score by the given amounts
	*
	* @method Player#incrementScore
	* @param {number} _score - The score by which it should be incremented.
	*/
	this.incrementScore = function(_score){
		score += _score;
	}

	/**
	* Sets the name of the player
	*
	* @method Player#setName
	* @param {String} _name - The name of the player.
	*/
	this.setName = function(_name){
		name = _name;
	}

	/**
	* Sets theh pole belonging to the player
	*
	* @method Player#setPole
	* @param {Pole} _pole - The pole belonging to the player
	*/
	this.setPole = function(_pole){
		pole = _pole;
	}

	/**
	* Sets the shield belonging to the player
	*
	* @method Player#setShield
	* @param {Shield} _shield - The shield belonging to the player.
	*/
	this.setShield = function(_shield){
		shield = _shield;
	}

	/**
	* Sets the amount of poits the player is worth
	*
	* @method Player#setPoints
	* @param {number} _points - The amount of points.
	*/
	this.setPoints = function(_points){
		points = _points;
	}

	/**
	* Sets the current score of the player
	*
	* @method Player#setScore
	* @param {number} _score - The score
	*/
	this.setScore = function(_score){
		score = _score;
	}

	/**
	* Sets the highscore of the player
	*
	* @method Player#setHighscore
	* @param {number} _highscore - The highscore
	*/
	this.setHighscore = function(_highscore){
		highscore = _highscore;
	}

	/**
	* Returns the name of the player
	*
	* @method Player#getName
	* @return {String} The name of the player
	*/
	this.getName = function(){
		return name;
	}

	/**
	* Returns the pole belonging to the player
	*
	* @method Player#getPole
	* @return {Pole} The pole belonging to the player.
	*/
	this.getPole = function(){
		return pole;
	}

	/**
	* Returns the shield belonging to the player
	*
	* @method Player#getShield
	* @return {Shield} The shield belonging to the player.
	*/
	this.getShield = function(){
		return shield;
	}

	/**
	* Returns the points the player is worth on hit.
	*
	* @method Player#getPoints
	* @return {number} The points the player is currently worth.
	*/
	this.getPoints = function(){
		return points;
	}

	/**
	* Returns the current score of the player
	*
	* @method Player#getScore
	* @return {number} The current score of the player.
	*/
	this.getScore = function(){
		return score;
	}

	/**
	* Returns the current highscore of the player
	*
	* @method Player#getHighscore
	* @return {number} The current highscore of the player.
	*/
	this.getHighscore = function(){
		return highscore;
	}
}