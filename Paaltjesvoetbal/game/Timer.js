//Timer class

/**
* Timer class
* @class Timer
* @classdesc Class which handles the timers used for the scores in game.
* @constructor
* @param {Player} _player - The player to which the timer belongs. 
*/
function Timer(_player){

	var time = 0;
	var interval;
	var player = _player;
	var paused = false;

	/**
	* Starts the timer
	*
	* @method Timer#startTimer
	*/
	this.startTimer = function(){
		var savedThis = this;
		interval = setInterval(savedThis.count, 1000);
	}

	/**
	* Adds one to the current time and updates player score
	*
	* @method Timer#count
	*/
	this.count = function(){
		time++;
		player.incrementScore(1);
		//console.log(time + " | " + player.getScore());
	}

	/**
	* Pauses the timer (but only if it isn't paused already)
	*
	* @method Timer#pause
	*/
	this.pause = function(){
		if(!paused){
			clearInterval(interval);
			paused = true;
		}
	}

	/**
	* Resumes the timer (but only if it was paused at first)
	*
	* @method Timer#resume
	*/
	this.resume = function(){
		if(paused){
			var savedThis = this;
			interval = setInterval(this.count, 1000);
			paused = false;
		}
	}
	
	/**
	* Resets the timer
	*
	* @method Timer#reset
	*/
	this.reset = function(){
		var savedThis = this;
		clearInterval(interval);
		time = 0;
		interval = setInterval(savedThis.count, 1000); //Start counter again.
	}
	
	/**
	* Returns the current time in minutes
	*
	* @method Timer#getMinutes
	* @return {number} The amount of minutes rounded down.
	*/
	this.getMinutes = function(){
		return Math.floor(time / 60);
	}

	/**
	* Returns the state of the
	*
	* @method Timer#isPaused
	* @return {boolean} Wether the timer is paused
	*/

	this.isPaused = function(){
		return paused;
	}

	/**
	* Returns the count
	*
	* @method Timer#isPaused
	* @return {number} The current number of seconds.
	*/
	this.getTime = function(){
		return time;
	}
	/**
	* Returns the current time in seconds (between 0 and 59, otherwise it's a minute)
	*
	* @method Timer#getSeconds
	* @return {String} The amount of seconds between 0 and 59, formatted on two numbers (so 00, 01, etc)
	*/
	this.getSeconds = function(){
		var mod = time % 60;
		if(mod < 10)
			return "0" + mod;
		return mod;
	}
}

if(typeof module != 'undefined'){
	module.exports = Timer;
}
