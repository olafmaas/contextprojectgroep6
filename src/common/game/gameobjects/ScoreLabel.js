if(typeof module != 'undefined'){
	var Label = require('./Label.js');
}

/**
* A label class for showing user's score on screen
*
* @class ScoreLabel
* @classdesc Label class specifically aimed at showing the score of the player
* @constructor
* @param {Player} _player - The player for which the label should display the score
* @extends Label
* @param {string} _text - Initial string to write on the screen
*/
var ScoreLabel = Label.extend({

	player: null,

	constructor: function(_player, _text){
		this.player = _player;
		this.text = _text;
	},

	/**
	* Updates the score displayed on the label
	*
	* @method ScoreLabel#update
	*/
	update: function(){
		var score = this.player.getScore();
		this.setText("Score: " + score);
	}

});


if(typeof module != 'undefined'){
    module.exports = ScoreLabel;
}
