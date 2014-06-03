if(typeof module != 'undefined'){
	var Base = require('./Base.js');
	var CircularBody = require('./CircularBody.js');
	var IDDistributor = require('./IDDistributor.js');
	var Timer = require('./Timer.js');
}

var Powerup = Base.extend({

	body: false,
	type: null,
	radius: 1,
	ID: -1,
	timer: 0,
	color: "red",

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
	
	update: function(){
		
		if(this.body instanceof CircularBody) this.body.update();
	},
	
	enableBody: function(){
		this.body = new CircularBody(this);
	},
	
	equals: function(_other){
		return (this.ID == _other.getID());
	},
	
	//==================
	//SECTION: Get & sets
	
	setColor: function(_color){
		this.color = _color;
	},
	
	getColor: function(){
		return this.color;
	},
	
	
	setType: function(_type){
		this.type = _type;
	},
	
	getType: function(){
		return this.type;
	},
	
	
	setPosition: function(_x, _y){
		this.body.position = {x: _x, y: _y};
	},
	
	getPosition: function(){
		return this.getBody().getPosition();
	},
	
	
	getRadius: function(){
		return this.radius;
	},
	
	
	getID: function(){
		return this.ID;
	},
	
	
	getTimer: function(){
		return this.timer;
	},
	
	
	getBody: function(){
		return this.body;
	}
});

if(typeof module != 'undefined'){
    module.exports = Powerup;
}