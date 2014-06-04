if(typeof module != 'undefined'){
	var Base = require('./util/Base.js');
	var CircularBody = require('./CircularBody.js');
	var IDDistributor = require('./util/IDDistributor.js');
	var Timer = require('./util/Timer.js');
	var e = require('./util/Enums.js');
	var UserSettings = require('./util/UserSettings.js');
}

var Powerup = Base.extend({

	body: false,
	type: null,
	radius: 1,
	ID: -1,
	timer: 0,
	color: "red",
	visible: true,
	power: null, //function that contains what the powerup will do

	constructor: function(_radius, _type){
		this.radius = _radius;
		this.type = _type;
		this.ID = IDDistributor.getNewId();
		this.timer = this.createTimer(_type);
		this.power = this.createPower(_type);

		this.enableBody();
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

	execute: function(_player){
		if(this.power != null){
			this.power(_player);
		}
	},

	//TODO: zorgen dat er echt 'powerups' worden gemaakt zodat ze ook iets gaan doen.
	//Voor nu zijn het alleen de timers
	createTimer: function(_type){
		switch(_type){
			case e.smallShield:
			this.timer = new PowerupTimer(UserSettings.smallShield.time)

			case e.bigShield:
			this.timer = new PowerupTimer(UserSettings.bigShield.time)

			case e.smallPole:
			this.timer = new PowerupTimer(UserSettings.smallPole.time)

			case e.bigPole:
			this.timer = new PowerupTimer(UserSettings.bigPole.time);

			//Ball waarschijnlijk geen goed idee voor powerup.. meer player achtige dingen aanpassen
			//In plaats van dit shield reverten.
			case e.bigBall:
			this.timer = new PowerupTimer(UserSettings.bigBall.time)
			
		}
	},

	createPower: function(_type){
		switch(_type){
			case e.smallShield:
			return function(_player) { _player.getShield().setShieldLength(UserSettings.smallShield.length); }

			case e.bigShield:
			return function(_player) { _player.getShield().setShieldLength(UserSettings.bigShield.length); }

			case e.smallPole:
			return function(_player) { _player.getPole().setRadius(UserSettings.smallPole.radius); }

			case e.bigPole:
			return function(_player) { _player.getPole().setRadius(UserSettings.bigPole.radius); }

			//Ball waarschijnlijk geen goed idee voor powerup.. meer player achtige dingen aanpassen
			//In plaats van dit shield reverten.
			case e.bigBall:
			
		}
	},

	isClicked: function(){
		//make sure the player gets the powerup when he clicks on it.
		//and make sure the powerup dissapears from the screen.
		this.visible = false;
	},

	isVisible: function(){
		return this.visible;
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