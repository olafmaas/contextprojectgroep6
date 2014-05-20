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

	//Starts the timer
	this.startTimer = function(){
		var savedThis = this;
		interval = setInterval(savedThis.count, 1000);
	}

	//Adds one to the current time + updates player score
	this.count = function(){
		time++;
		player.incrementScore(1);
		console.log(time + " | " + player.getScore());
	}

	//Pauses the timer (only if it isn't paused already)
	this.pause = function(){
		if(!paused)
		clearInterval(interval);
	}

	//Resumes the paused timer (only if it was paused first)
	this.resume = function(){
		if(paused){
			var savedThis = this;
			interval = setInterval(this.count, 1000);
		}
	}

	//resets the timer
	this.reset = function(){
		var savedThis = this;
		clearInterval(interval);
		time = 0;
		interval = setInterval(savedThis.count, 1000); //Start counter again.
	}

	//Returns the time in minutes (rounded down)
	this.getMinutes = function(){
		return Math.floor(time / 60);
	}

	//Returns the current time in seconds (between 0 and 59, otherwise it's a minute)
	this.getSeconds = function(){
		return time % 60;
	}
}