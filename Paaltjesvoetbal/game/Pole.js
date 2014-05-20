
/**
* Pole class
*
* @class Pole
* @classdesc A simple pole class which extends Ball
* @constructor It automatically sets the pole to be immovable when constructed.
* @param {number} _radius - The radius of the pole.
*/
var Pole = Ball.extend({
	hit: false,
	prevColor: 0,
	player: 0,
	timer: 0, //Each pole keeps its own 'alive' time

	constructor: function(_radius){
		this.radius = _radius;
		this.enableBody();
		this.body.immovable = true;
	},

	/**
	* Handles everything when the pole is hit:
	* from setting the hit flag, to managing the cooldown of the pole.
	*
	* @method Pole#isHit
	*/
	isHit: function(){
		if(!this.hit){
			this.hit = true; //set hit flag
			this.prevColor = this.getColor(); //retrieve original color
			this.setColor("darkOrange"); //set new color to indicate being hit
			this.saveHighscore(); //Save current score if highscore
			this.coolDown(3000); //set cooldown period
		}
	},

	/**
	* Handles the cooldown period of the pole, which includes a change of color
	* and not being able to get hit again for some amount of time.
	* @method Pole#coolDown
	*/
	//TODO: iets van laten knipperen? sneller = cooldown bijna afgelopen?
	coolDown: function(_interval){
		if(_interval > 0){
			var savedThis = this;
			setTimeout( function() { savedThis.coolDown(0); }, _interval);
		}
		else {
			this.setColor(this.prevColor); //Revert back to previous color
			this.hit = false; //remove hit flag
		}
	},

	//Set player
	setPlayer: function(_player){
		this.player = _player;
		this.timer = new Timer(_player);
		this.timer.startTimer();
	},

	//Todo: move to player class?
	saveHighscore: function(){
		var currScore = this.player.getScore();
		var highscore = this.player.getHighscore();
		if(highscore < currScore){
			this.player.setHighscore(currScore);
			console.log("Highscore: " + this.player.getHighscore());
		}
		this.player.setScore(0); //reset score
		this.timer.reset(); //reset timer
	}

});