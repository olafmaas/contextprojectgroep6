if(typeof module != 'undefined'){
	var Timer = require('./Timer.js');
}

/**
* PlayerTimer class
* @class PlayerTimer
* @classdesc Class which handles the timers used for the scores in the game.
* @constructor
* @param {Player} _player - The player to which the timer belongs
*/
var PlayerTimer = Timer.extend({

	player: null,

	constructor: function(_player){
		this.player = _player;
	},

	/**
	* Adds one to the current time and update the player's score
	*
	* @method PlayerTimer#count
	* @param {This} _this - The pointer to the original 'this', otherwise the object will mess it all up.
	*/
	count: function(_this){
		_this.time++;
		_this.player.incrementScore(1);
	}

});

if(typeof module != 'undefined'){
	module.exports = PlayerTimer;
}
