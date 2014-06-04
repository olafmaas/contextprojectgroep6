//Player class
if(typeof module != 'undefined'){
	var Label = require('./Label.js');
	var Base = require('./util/Base.js');
	var IDDistributor = require('./util/IDDistributor.js'); 
}
/**
* Player class
* @class Player
* @classdesc Class to represent players with properties.
* @constructor
* @param {String} _name - The name of the player.
*/
var Player = Base.extend({
	
	name: null, //Name of the player
	pole: null, //Pole belonging to the player
	shield: null, //Shield belonging to the player
	points: 5, //Points the player is worth when hit 
	score: 0, //Current score of the player
	highscore: 0, //Highscore of the player
	activePowerup: null, //The currently active powerup
	originalState: {},
	timer: null,

	ID: -1,

	constructor: function(_name){
		this.name = _name
		this.ID = IDDistributor.getNewId();
	},
	
	/* Checks timer and removes powerup if necesarry.
	*
	* @method Player#update
	*/
	update: function(){
		if(this.timer != null){
			if(this.timer.hasStopped())
				this.deletePowerup();
		}
	},

	/* Dummy method
	*
	* @method Player#draw
	*/
	draw: function(_canvasContext){

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

	//TODO
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

	//TODO
	deletePowerup: function(){
		this.activePowerup.stop();
		this.activePowerup = null;
		this.timer.stop();
		this.timer = null;
		this.revert(); //revert to original playerstate
	},	

	//TODO
	//revert back to original state before the last powerup
	//met nieuwe powerups moet deze functie ook worden aangepast!
	revert: function(){
		this.getShield().revertShield(this.originalState.revert);
		this.getShield().setShieldLength(this.originalState.length);
		this.getPole().setRadius(this.originalState.radius);
	},

	//TODO
	//met nieuwe powerups moet deze functie ook worden aangepast!
	saveState: function(){
		var savedThis = this;
		this.originalState = {
			revert: savedThis.getShield().isRevert(),
			length: savedThis.getShield().getShieldLength(),
			radius: savedThis.getPole().getRadius(),
		};
	},

	//TODO
	setTimer: function(_timer){
		this.timer = _timer;
	},

	//TODO
	getTimer: function(){
		return this.timer;
	},

	/**
	* Sets the name of the player
	*
	* @method Player#setName
	* @param {String} _name - The name of the player.
	*/
	setName: function(_name){
		this.name = _name;
	},

	/**
	* Sets theh pole belonging to the player
	*
	* @method Player#setPole
	* @param {Pole} _pole - The pole belonging to the player
	*/
	setPole: function(_pole){
		this.pole = _pole;
	},

	/**
	* Sets the shield belonging to the player
	*
	* @method Player#setShield
	* @param {Shield} _shield - The shield belonging to the player.
	*/
	setShield: function(_shield){
		this.shield = _shield;
	},

	/**
	* Sets the amount of poits the player is worth
	*
	* @method Player#setPoints
	* @param {number} _points - The amount of points.
	*/
	setPoints: function(_points){
		this.points = _points;
	},

	/**
	* Sets the current score of the player
	*
	* @method Player#setScore
	* @param {number} _score - The score
	*/
	setScore: function(_score){
		this.score = _score;
	},

	/**
	* Sets the highscore of the player
	*
	* @method Player#setHighscore
	* @param {number} _highscore - The highscore
	*/
	setHighscore: function(_highscore){
		this.highscore = _highscore;
	},

	/**
	* Returns the name of the player
	*
	* @method Player#getName
	* @return {String} The name of the player
	*/
	getName: function(){
		return this.name;
	},

	/**
	* Returns the pole belonging to the player
	*
	* @method Player#getPole
	* @return {Pole} The pole belonging to the player.
	*/
	getPole: function(){
		return this.pole;
	},

	/**
	* Returns the shield belonging to the player
	*
	* @method Player#getShield
	* @return {Shield} The shield belonging to the player.
	*/
	getShield: function(){
		return this.shield;
	},

	/**
	* Returns the points the player is worth on hit.
	*
	* @method Player#getPoints
	* @return {number} The points the player is currently worth.
	*/
	getPoints: function(){
		return this.points;
	},

	/**
	* Returns the current score of the player
	*
	* @method Player#getScore
	* @return {number} The current score of the player.
	*/
	getScore: function(){
		return this.score;
	},

	/**
	* Returns the current highscore of the player
	*
	* @method Player#getHighscore
	* @return {number} The current highscore of the player.
	*/
	getHighscore: function(){
		return this.highscore;
	},

		/**
	* Retrieves the ID of the Player
	*
	* @method Ball#getID
	* @return {number} The unique ID of the Player
	*/
	getID: function(){
		return this.ID;
	},

	//TODO: documentation
	//returns the current time as a string in MM:SS format
	getTime: function(){
		var min = this.pole.getTimer().getMinutes();
		var sec = this.pole.getTimer().getSeconds();

		return min + ":" + sec;
	}
});

if(typeof module != 'undefined'){
    module.exports = Player;
}
