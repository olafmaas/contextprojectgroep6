//Timer class
if(typeof module != 'undefined'){
	var Base = require('./Base.js');
}

/**
* Timer class
* @class Timer
* @classdesc Class which handles the timers used for the scores and powerups in the game.
* @constructor
*/
var Timer = Base.extend ({

	time: 0,
	interval: null,
	paused: false,

	constructor: function(){

	},

	/**
	* Starts the timer
	*
	* @method Timer#startTimer
	*/
	startTimer: function(){
		var savedThis = this;
		this.interval = setInterval(function() { savedThis.count(savedThis) }, 1000);
	},

	/**
	* Adds one to the current time
	*
	* @method Timer#count
	* @param {This} _this - Optional, is needed for playertimer!
	*/
	count: function(_this){
		this.time++;
		//console.log(time + " | " + player.getScore());
	},

	/**
	* Pauses the timer (but only if it isn't paused already)
	*
	* @method Timer#pause
	*/
	pause: function(){
		if(!this.paused){
			clearInterval(this.interval);
			this.paused = true;
		}
	},

	/**
	* Resumes the timer (but only if it was paused at first)
	*
	* @method Timer#resume
	*/
	resume: function(){
		if(this.paused){
			var savedThis = this;
			this.interval = setInterval(this.count, 1000);
			this.paused = false;
		}
	},
	
	/**
	* Resets the timer
	*
	* @method Timer#reset
	*/
	reset: function(){
		var savedThis = this;
		clearInterval(this.interval);
		this.time = 0;
		this.interval = setInterval(savedThis.count, 1000); //Start counter again.
	},
	
	/**
	* Stops the timer
	*
	* @method Timer#stop
	*/
	stop: function(){
		var savedThis = this;
		clearInterval(this.interval);
		this.time = 0;
	},
	
	/**
	* Returns the current time in minutes
	*
	* @method Timer#getMinutes
	* @return {number} The amount of minutes rounded down.
	*/
	getMinutes: function(){
		return Math.floor(this.time / 60);
	},

	/**
	* Returns the state of the
	*
	* @method Timer#isPaused
	* @return {boolean} Wether the timer is paused
	*/

	isPaused: function(){
		return this.paused;
	},

	/**
	* Returns the count
	*
	* @method Timer#isPaused
	* @return {number} The current number of seconds.
	*/
	getTime: function(){
		return this.time;
	},
	/**
	* Returns the current time in seconds (between 0 and 59, otherwise it's a minute)
	*
	* @method Timer#getSeconds
	* @return {String} The amount of seconds between 0 and 59, formatted on two numbers (so 00, 01, etc)
	*/
	getSeconds: function(){
		var mod = this.time % 60;
		if(mod < 10)
			return "0" + mod;
		return mod;
	}

});

if(typeof module != 'undefined'){
	module.exports = Timer;
}
