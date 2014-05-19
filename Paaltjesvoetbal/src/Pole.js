
var Pole = Ball.extend({
	hit: false,

	constructor: function(_radius){
		this.radius = _radius;
		this.enableBody();
		this.body.immovable = true;
	},

	isHit: function(){
		return this.hit;
	}

	setHit: function(_hit){
		this.hit = _hit;
	}
});