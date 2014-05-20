//Player class

/**
* Player class
* @class Player
* @classdesc Class to represent players with properties.
*/
function Player(_name){
	
	var name = _name; //Name of the player
	var pole; //Pole belonging to the player
	var shield; //Shield belonging to the player
	var points = 5; //Points the player is worth when hit 
	var score; //Current score of the player
	var highscore; //Highscore of the player


	this.incrementPoints = function(_points){
		points += _points;
	}

	this.incrementScore = function(_score){
		score += _score;
	}

	this.setName = function(_name){
		name = _name;
	}

	this.setPole = function(_pole){
		pole = _pole;
	}

	this.setShield = function(_shield){
		shield = _shield;
	}

	this.setPoints = function(_points){
		points = _points;
	}

	this.setScore = function(_score){
		score = _score;
	}

	this.setHighscore = function(_highscore){
		highscore = _highscore;
	}

	this.getName = function(){
		return name;
	}

	this.getPole = function(){
		return pole;
	}

	this.getShield = function(){
		return shield;
	}

	this.getPoints = function(){
		return points;
	}

	this.getScore = function(){
		return score;
	}

	this.getHighscore = function(){
		return highscore;
	}
}