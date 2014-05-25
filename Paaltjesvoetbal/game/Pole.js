if(typeof module != 'undefined'){
	var CircularBody = require('./CircularBody.js');
	var Ball = require('./Ball.js');
	var Timer = require('./Timer.js');
}
/**
* Pole class
*
* @class Pole
* @classdesc A simple pole class which extends Ball
* @constructor It automatically sets the pole to be immovable when constructed.
* @param {number} _radius - The radius of the pole.
*/
var Pole = Ball.extend({
	hit: false,
	prevColor: 0,
	player: 0,
	timer: 0, //Each pole keeps its own 'alive' time

	/**
	* Constructor for the Pole class
	* @method Pole#constructor
	* @param {float} _radius - The radius of the pole
	*/
	constructor: function(_radius){
		this.radius = _radius;
		this.enableBody();
		this.body.immovable = true;
	},

	/**
	* Handles everything when the pole is hit:
	* from setting the hit flag, to managing the cooldown of the pole.
	*
	* @method Pole#isHit
	*/
	isHit: function(_this){
		if(_this != null  && _this != undefined){
			savedThis = _this;
		}
		else {
			savedThis = this;
		}
		if(!savedThis.hit){
			savedThis.hit = true; //set hit flag
			savedThis.prevColor = savedThis.getColor(); //retrieve original color
			savedThis.setColor("darkOrange"); //set new color to indicate being hit
			savedThis.saveHighscore(); //Save current score if highscore
			savedThis.coolDown(3000); //set cooldown period
		}
	},

	/**
	* Handles the cooldown period of the pole, which includes a change of color
	* and not being able to get hit again for some amount of time.
	* @method Pole#coolDown
	*/
	//TODO: iets van laten knipperen? sneller = cooldown bijna afgelopen?
	coolDown: function(_interval){
		if(_interval > 0){
			var savedThis = this;
			setTimeout( function() { savedThis.coolDown(0); }, _interval);
		}
		else {
			this.setColor(this.prevColor); //Revert back to previous color
			this.hit = false; //remove hit flag
			this.timer.startTimer();
		}
	},

	/**
	* Sets the player, assigns a timer and starts the timer.
	* @method Pole#setPlayer
	* @param {player} _player - The player object
	*/
	setPlayer: function(_player){
		this.player = _player;
		this.timer = new Timer(_player);
		this.timer.startTimer();
	},

	/**
	* Saves the highscore of the player
	* @method Pole#saveHighScore
	*/
	saveHighscore: function(){
		var currScore = this.player.getScore();
		var highscore = this.player.getHighscore();
		if(highscore < currScore){
			this.player.setHighscore(currScore);
		}
		this.player.setScore(0); //reset score
		this.timer.stop(); //reset timer
	},

	/**
	* Returns the timer of a certain player
	* @method Pole#getTimer
	*/
	getTimer: function(){
		return this.timer;
	}

});

if(typeof module != 'undefined'){
    module.exports = Pole;
}
