//Player class
if(typeof module != 'undefined'){
	var Label = require('./Label.js');
	var Base = require('./Base.js');
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
	label: null,
	label3: null,
	label2: null,

	constructor: function(_name){
		this.name = _name

		this.label = new Label("Score: 0 | Time alive: 0:00");
		this.label3 = new Label("Highscore: 0");
		this.label2 = new Label("Username: " + this.name);
	},
	
	/**
	* Updates the score label which will be drawn on screen
	* This includes score, time alive and highscore
	*
	* @method Player#update
	*/
	update: function(){
		
		var lblPosition = {x: this.pole.getPosition().x - 150, y: this.pole.getPosition().y + 200}; //hardcoded position for now..
		var lbl2Position = {x: this.pole.getPosition().x - 100, y: this.pole.getPosition().y - 100};
		var lbl3Position = {x: this.pole.getPosition().x - 80, y: this.pole.getPosition().y + 230}; //hardcoded position for now..
		
		this.label.setPosition(lblPosition);
		this.label2.setPosition(lbl2Position);
		this.label3.setPosition(lbl3Position);

		var min = this.pole.getTimer().getMinutes();
		var sec = this.pole.getTimer().getSeconds();
		this.label.setText("Score: " + this.score + " | Time alive: " + min + ":" + sec);
		this.label3.setText("Highscore: " + this.highscore);
		this.label2.setText("Username: " + this.name);
	},

	/**
	* Currently it just draws the score, time alive and highscore of the player on the canvas
	*
	* @method Player#draw
	* @param {CanvasContext} _canvasContext - The canvas on which it will be drawn.
	*/
	draw: function(_canvasContext){
		this.label.draw(_canvasContext); //Draw score + time alive
		this.label2.draw(_canvasContext); //Draw username
		this.label3.draw(_canvasContext); //Draw highscore
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
	}
});

if(typeof module != 'undefined'){
    module.exports = Player;
}
