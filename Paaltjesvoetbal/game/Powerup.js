if(typeof module != 'undefined'){
	var Base = require('./Base.js');
	var CircularBody = require('./CircularBody.js');
	var IDDistributor = require('./IDDistributor.js');
}

var Powerup = Base.extend({

	body: false,
	type: null,
	color: "#000000",
	radius: 1,
	ID: -1,

	constructor: function(_radius, _type){
		this.radius = _radius;
		this.type = _type;
		this.ID = IDDistributor.getNewId();
		
		this.enableBody();
	},

	draw: function (_canvasContext){
		_canvasContext.beginPath();
		_canvasContext.arc(this.getBody().position.x, this.getBody().position.y, this.radius, 0, Math.PI*2, true);
		_canvasContext.closePath();
		
		_canvasContext.fillStyle = this.color;
		_canvasContext.fill();
	},
	
	equals: function(_other){
		return (this.ID == _other.getID());
	},
	
	enableBody: function(){
		this.body = new CircularBody(this);
	},
	
	collidesWith: function(_other){
		return this.body.CollidesWith(_other);
	},
	
	//==================
	//SECTION: Get & sets
	
	setColor: function(_color){
		this.color = _color;
	},
	
	getColor: function(){
		return this.color;
	},
	
	getPosition: function(){
		return this.getBody().getPosition();
	},
	
	getRadius: function (){
		return this.radius;
	},
	
	getType: function(){
		return this.type;
	},
	
	getID: function(){
		return this.ID;
	},
	
	getBody: function(){
		return this.body;
	}
	
});

if(typeof module != 'undefined'){
    module.exports = Powerup;
}