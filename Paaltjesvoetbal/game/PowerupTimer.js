
if(typeof module != 'undefined'){
	var Timer = require('./Timer.js');
}

/**
* PowerupTimer class
* @class PowerupTimer
* @classdesc Class which handles the timers used for the powerups in the game. It counts down instead of up!
* @constructor
* @param {Powerup} _powerup - The powerup to which the timer belongs
*/
var PowerupTimer = Timer.extend({

	powerup: null,

	constructor: function(_powerup, _time){
		this.powerup = _powerup;
		this.time = _time;
	},

	/**
	* Counts one down from the initial time for the powerup. When the timer reaches 0, it is stopped
	*
	* @method PowerupTimer#count
	*/
	count: function(){
		if(this.time > 0)
			this.time--;
		else 
			this.stop();
	}

});

if(typeof module != 'undefined'){
	module.exports = PowerupTimer;
}