
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
			this.hit = true;
			this.prevColor = this.getColor();
			this.setColor("darkOrange");
			this.coolDown(3000);
			//TODO:
			//save highscore
			//reset score
			//start cooldown in which player cannot be hit
			
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
	}

});