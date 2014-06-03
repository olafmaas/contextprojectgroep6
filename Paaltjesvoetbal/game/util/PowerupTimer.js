
if(typeof module != 'undefined'){
	var Timer = require('./Timer.js');
}

/**
* PowerupTimer class
* @class PowerupTimer
* @classdesc Class which handles the timers used for the powerups in the game. It counts down instead of up!
* @constructor
* @param {Time} _time - The time from which will be counted down.
*/
var PowerupTimer = Timer.extend({

	powerup: null,

	constructor: function(_time){
		this.time = _time;
	},

	/**
	* Counts one down from the initial time for the powerup. When the timer reaches 0, it is stopped
	*
	* @method PowerupTimer#count
	* @param {This} _this - It needs a reference to the original 'this', otherwise the variable will mess it up.
	*/
	count: function(_this){
		if(_this.time > 0)
			_this.time--;
		else 
			_this.stop();
	}

});

if(typeof module != 'undefined'){
	module.exports = PowerupTimer;
}