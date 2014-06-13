if(typeof module != 'undefined'){
	var Timer = require('./Timer.js');
}

/**
* PowerupTimer class
* @class PowerupTimer
* @classdesc Class which handles the timers used for the powerups in the game. It counts down instead of up!
* @constructor
* @param {Number} _min - The lower bound of the random time it will generate.
* @param {Number} _max - The upper bound of the random time it will generate.
*/
var RandomTimer = Timer.extend({

	time: 0,

	constructor: function(_min, _max){
		this.time = Math.floor(Math.random() * (_max - _min + 1) + _min);
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
	}, 

	hasStopped: function(){
		if(this.time == 0)
			return true;
		return false;
	}

});

if(typeof module != 'undefined'){
	module.exports = RandomTimer;
}
