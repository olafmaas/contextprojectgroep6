//Player class
if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var Label = require('./Label.js');
	var IDDistributor = require('../util/IDDistributor.js');
	var Settings = require('../../Settings.js'); 
}
/**
* Player class
* @class Player
* @classdesc Class to represent players with properties.
* @constructor
* @extends Base
* @param {String} _name - The name of the player.
*/
var Player = Base.extend({
	
	name: null, //Name of the player
	pole: null, //Pole belonging to the player
	shield: null, //Shield belonging to the player
	points: Settings.player.points, //Points the player is worth when hit 
	score: 0, //Current score of the player
	highscore: 0, //Highscore of the player
	globalID: -1,
	activePowerup: null, //The currently active powerup
	originalState: {},
	timer: null,
	ID: -1,

	constructor: function(_name){
		this.name = _name
		this.ID = IDDistributor.getNewId();
	},
	
	/** Checks timer and removes powerup if necesarry.
	*
	* @method Player#update
	*/
	update: function(){
		if(this.timer != null){
			if(this.timer.hasStopped())
				this.deletePowerup();
		}
	},

	/**
	* Increments the current points by the given amounts
	*
	* @method Player#incrementPoints
	* @param {number} _points - The amount of points by which it should be incremented.
	*/
	incrementPoints: function(_points){
		this.points += _points;
	},

	/**
	* Increments the current score by the given amounts
	*
	* @method Player#incrementScore
	* @param {number} _score - The score by which it should be incremented.
	*/
	incrementScore: function(_score){
		this.score += _score;
	},

	/**
	* Reverts the player back to the (original) saved state before a powerup was activated.
	* Note: When new powerups are added, this function should be updated accordingly!
	*
	* @method Player#revert
	*/
	//met nieuwe powerups moet deze functie ook worden aangepast!
	revert: function(){
		this.getShield().revertShield(this.originalState.revert);
		this.getShield().setShieldLength(this.originalState.length);
		this.getPole().setRadius(this.originalState.radius);
	},

	/**
	* Saves the current (original) state of the player.
	* Note: When new powerups are added, this function should be updated accordingly!
	*
	* @method Player#saveState
	*/
	saveState: function(){
		var savedThis = this;
		this.originalState = {
			revert: savedThis.getShield().isRevert(),
			length: savedThis.getShield().getShieldLength(),
			radius: savedThis.getPole().getRadius(),
		};
	},

	/**
	* Deletes the currently active powerup, stops the timer and reverts the 
	* player back to his original state.
	*
	* @method Player#deletePowerup
	*/
	deletePowerup: function(){
		this.activePowerup.stop();
		this.activePowerup = null;
		this.timer.stop();
		this.timer = null;
		this.revert(); //revert to original playerstate
	},	
	
	/**
	* Sets a global ID for the player
	* 
	* @method Player#setGlobalID
	* @param {number} _id - The unique id to assign to the player.
	*/
	setGlobalID: function (_id) { this.globalID = _id; },

	/**
	* Sets a new powerup and activates it.
	* In case there was already a powerup active, that powerup is deleted first.
	*
	* @method Player#setPowerup
	* @param {Powerup} _powerup - The powerup that will be set.
	*/
	setPowerup: function(_powerup){
		//If another powerup was active at this point, make sure the old one is deprecated
		if(this.activePowerup != null){
			this.deletePowerup();
		}
		this.activePowerup = _powerup;
		this.saveState(); //Save original playerstate
		this.activePowerup.execute(this); //immediatly execute the powerup 
		this.timer = _powerup.getTimer();
		this.timer.startTimer();
	},

	/**
	* Sets the timer belonging to the powerup.
	*
	* @method Player#setTimer
	* @param {Timer} _timer - The timer that will be set.
	*/
	setTimer: function(_timer){ this.timer = _timer; },

	/**
	* Sets the name of the player
	*
	* @method Player#setName
	* @param {String} _name - The name of the player.
	*/
	setName: function(_name){ this.name = _name; },

	/**
	* Sets theh pole belonging to the player
	*
	* @method Player#setPole
	* @param {Pole} _pole - The pole belonging to the player
	*/
	setPole: function(_pole){ this.pole = _pole; },

	/**
	* Sets the shield belonging to the player
	*
	* @method Player#setShield
	* @param {Shield} _shield - The shield belonging to the player.
	*/
	setShield: function(_shield){ this.shield = _shield; },

	/**
	* Sets the amount of poits the player is worth
	*
	* @method Player#setPoints
	* @param {number} _points - The amount of points.
	*/
	setPoints: function(_points){ this.points = _points; },

	/**
	* Sets the current score of the player
	*
	* @method Player#setScore
	* @param {number} _score - The score
	*/
	setScore: function(_score){ this.score = _score; },

	/**
	* Sets the highscore of the player
	*
	* @method Player#setHighscore
	* @param {number} _highscore - The highscore
	*/
	setHighscore: function(_highscore){ this.highscore = _highscore; },

	/**
	* Returns the name of the player
	*
	* @method Player#getName
	* @return {String} The name of the player
	*/
	getName: function(){ return this.name; },

	/**
	* Returns the current timer belonging to the powerup, or null if no timer is present.
	*
	* @method Player#getTimer
	*/
	getTimer: function(){ return this.timer; },

	/**
	* Returns the currently active powerup, or null if no powerup is active.
	*
	* @method Player#getPowerup
	*/
	getPowerup: function(){ return this.activePowerup; },

	/**
	* Returns the pole belonging to the player
	*
	* @method Player#getPole
	* @return {Pole} The pole belonging to the player.
	*/
	getPole: function(){ return this.pole; },

	/**
	* Returns the shield belonging to the player
	*
	* @method Player#getShield
	* @return {Shield} The shield belonging to the player.
	*/
	getShield: function(){ return this.shield; },

	/**
	* Returns the points the player is worth on hit.
	*
	* @method Player#getPoints
	* @return {number} The points the player is currently worth.
	*/
	getPoints: function(){ return this.points; },

	/**
	* Returns the current score of the player
	*
	* @method Player#getScore
	* @return {number} The current score of the player.
	*/
	getScore: function(){ return this.score; },

	/**
	* Returns the current highscore of the player
	*
	* @method Player#getHighscore
	* @return {number} The current highscore of the player.
	*/
	getHighscore: function(){ return this.highscore; },
	
	/**
	* Retrieves the global ID of the player
	*
	* @method Player#getGlobalID
	* @return {number} The unique GlobalID of the player
	*/
	getGlobalID: function(){ return this.globalID; },

	/**
	* Retrieves the ID of the player
	*
	* @method Player#getID
	* @return {number} The ID of the player
	*/
	getID: function(){ return this.ID; }
});

if(typeof module != 'undefined'){
    module.exports = Player;
}
