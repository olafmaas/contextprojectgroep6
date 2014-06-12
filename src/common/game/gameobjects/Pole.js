if(typeof module != 'undefined'){
	var CircularBody = require('./CircularBody.js');
	var Ball = require('./Ball.js');
	var PlayerTimer = require('../time/PlayerTimer.js');
	var IDDistributor = require('../util/IDDistributor.js');
}
/**
* Pole class
*
* @class Pole
* @classdesc A simple pole class which extends Ball
* @constructor It automatically sets the pole to be immovable when constructed.
* @extends Ball
* @param {number} _radius - The radius of the pole.
*/
var Pole = Ball.extend({
	hit: false,
	hitBy: -1,
	coolDown: false,
	prevColor: 0,
	player: 0,
	timer: 0, //Each pole keeps its own 'alive' time
	ID: -1,

	/**
	* Constructor for the Pole class
	* @method Pole#constructor
	* @param {float} _radius - The radius of the pole
	*/
	constructor: function(_radius){
		this.radius = _radius;
		this.enableBody();
		this.body.immovable = true;
		this.ID = IDDistributor.getNewId();
	},

	/**
	* Handles everything when the pole is hit:
	* from setting the hit flag, to managing the cooldown of the pole.
	* zie commit 15f21808bd1c8d0f708674a6f142c768ba3119da voor de oude versie.
	* @method Pole#isHit
	*/
	isHit: function(){
		if(!this.coolDown){
			this.coolDown = true;
			this.prevColor = this.getColor(); //retrieve original color
			this.setColor("darkOrange"); //set new color to indicate being hit
			this.saveHighscore(); //Save current score if highscore
			this.hit = false; //remove hit flag
			this.hitBy = -1; //remove hitBy
			var savedThis = this;
			setTimeout(function() { savedThis.setColor(savedThis.prevColor); savedThis.coolDown = false  }, 1000); //set cooldown period
		}
	},

	/**
	* Checks whether two objects are the same by comparing ID's
	*
	* @method Pole#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){ return (this.ID == _other.getID()); },
	
	/**
	* Saves the highscore of the player, resets the score and restarts the timer
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
		this.timer.startTimer(); //restart timer gebeurde vroeger in de cooldown
	},

	/**
	* Sets the player, assigns a timer and starts the timer.
	* @method Pole#setPlayer
	* @param {player} _player - The player object
	*/
	setPlayer: function(_player){
		this.player = _player;
		this.timer = new PlayerTimer(_player);
		this.timer.startTimer();
	},

	setHitBy: function(_id) { this.hitBy = _id; },

	/**
	* Returns the timer of a certain pole
	* @method Pole#getTimer
	* @return {Timer} - The timer belonging to the pole
	*/
	getTimer: function(){ return this.timer; },

	/**
	* Retrieves the ID of the pole
	*
	* @method Pole#getID
	* @return {number} The unique ID of the pole
	*/
	getID: function(){ return this.ID; },

	getHitBy: function() { return this.hitBy; }

});

if(typeof module != 'undefined'){
    module.exports = Pole;
}
