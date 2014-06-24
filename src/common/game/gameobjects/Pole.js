if(typeof module != 'undefined'){
	var CircularBody = require('./CircularBody.js');
	var Ball = require('./Ball.js');
	var PlayerTimer = require('../time/PlayerTimer.js');
	var IDDistributor = require('../util/IDDistributor.js');
	var Settings = require('../../Settings.js');
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
	radius: 1,
	hitBy: -1,
	coolDown: false,
	prevColor: 0,
	player: 0,
	powerupDraw: true,
	angle: 0, //Needed for the cooldown
	timer: 0, //Each pole keeps its own 'alive' time
	ID: -1,

	/**
	* Constructor for the Pole class
	* @method Pole#constructor
	* @param {float} _radius - The radius of the pole
	*/
	constructor: function(_radius){
		this.enableBody();
		this.setRadius(_radius);
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
			this.setColor(Settings.pole.hitColor); //set new color to indicate being hit
			this.saveHighscore(); //Save current score if highscore
			this.hit = false; //remove hit flag
			this.hitBy = -1; //remove hitBy
			var savedThis = this;
			setTimeout(function() { savedThis.setColor(savedThis.prevColor); savedThis.coolDown = false  }, 1000); //set cooldown period
		}
	},

	indicateJoin: function(){
		refThis = this;
		for(var i = 0 ; i < Settings.joinIndicator.times ; i++){
			if(i % 2){
				setTimeout(function() { 
					refThis.setColor(Settings.pole.color);
				 }, Settings.joinIndicator.interval*i);
			} else {
				setTimeout(function() { 
					refThis.setColor(Settings.joinIndicator.color);
				 }, Settings.joinIndicator.interval*i);
			}
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
	* Increments the current coolDown angle by the specified amount.
	*
	* @method Pole#incrementCDAngle
	* @param {number} _angle - The angle by which the current angle is incremented (in degrees);
	*/
	incrementCDAngle: function(_angle){ this.angle += _angle; },

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

	/**
	* Sets the radius of the pole, but between a min and max value
	* 
	* @method Pole#setRadius
	* @Overrides Ball#setRadius
	* @param {number} _radius - The radius that will be set
	*/
	setRadius: function(_radius){
		var r = _radius;
		if(r < Settings.pole.minsize) //not smaller than minsize
			r = Settings.pole.minsize;
		else if(r > Settings.pole.maxsize) //not bigger than maxsize
			r = Settings.pole.maxsize;

		this.radius = r;
		this.body.setRadius(r);
	},

	/**
	* Sets whether the powerup should be drawn
	*
	* @method Pole#setPowerupDraw
	* @param {boolean} _bool - True if it should be drawn, or false if it shouldn't
	*/
	setPowerupDraw: function(_bool){ this.powerupDraw = _bool; },

	/**
	* Sets the ID of the player that hit the pole
	*
	* @method Pole#setHitBy
	* @param {number} _id - The global ID of the player
	*/
	setHitBy: function(_id) { this.hitBy = _id; },

	/**
	* Sets the cooldown angle of the pole.
	*
	* @method Pole#setCDAngle
	* @param {number} _angle - The angle in degrees.
	*/
	setCDAngle: function (_angle) { this.angle = _angle; },

	/**
	* Returns the timer of a certain pole
	* @method Pole#getTimer
	* @return {Timer} - The timer belonging to the pole
	*/
	getTimer: function(){ return this.timer; },

	/**
	* Returns the radius of the pole
	*
	* @method Pole#getRadius
	* @overrides Ball#getRadius
	*/
	getRadius: function(){
		return this.radius;
	},

	/**
	* Retrieves the ID of the pole
	*
	* @method Pole#getID
	* @return {number} The unique ID of the pole
	*/
	getID: function(){ return this.ID; },

	/**
	* Retrieves the global ID of the player that hit the pole
	*
	* @method Pole#getHitBy
	* @return {number} - The global ID of the player
	*/
	getHitBy: function() { return this.hitBy; },

	getType: function(){ return 'Pole'; },
	/**
	* Retrieves the current cooldown angle of the pole
	*
	* @method Pole#getCDAngle
	* @return {number} - The current cooldown angle in degrees.
	*/
	getCDAngle: function() { return this.angle; },

	/**
	* Returns whether the powerup skin should be drawn or not
	* 
	* @method Pole#getPowerupDraw
	* @return {number} - Returns true if it should be drawn, returns false if is shouldn't
	*/
	getPowerupDraw: function() { return this.powerupDraw; }

});

if(typeof module != 'undefined'){
    module.exports = Pole;
}
