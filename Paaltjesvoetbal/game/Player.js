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
	globalID: -1,
	ID: -1,

	constructor: function(_name){
		this.name = _name
		this.ID = IDDistributor.getNewId();
	},
	
	/**
	* Updates the score label which will be drawn on screen
	* This includes score, time alive and highscore
	*
	* @method Player#update
	*/
	update: function(){

	},

	/**
	* Currently it just draws the score, time alive and highscore of the player on the canvas
	*
	* @method Player#draw
	* @param {CanvasContext} _canvasContext - The canvas on which it will be drawn.
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
	
	/**
	* Sets a global ID for the player
	* 
	* @method Player#setGlobalID
	* @param {number} _id - The unique id to assign to the player.
	*/
	setGlobalID: function (_id) {
		this.globalID = _id;
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
	* Retrieves the global ID of the player
	*
	* @method Player#getGlobalID
	* @return {number} The unique GlobalID of the player
	*/
	getGlobalID: function(){
		return this.globalID;
	}

	/**
	* Retrieves the ID of the player
	*
	* @method Player#getID
	* @return {number} The ID of the player
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
