if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');

	var e = require('../../Enums.js');

	var CircularBody = require('./CircularBody.js');
	var IDDistributor = require('../util/IDDistributor.js');
	var Timer = require('../time/Timer.js');
	var Settings = require('../../Settings.js');
	var PowerupTimer = require('../time/PowerupTimer.js');
	var Sprite = require('./Sprite.js');
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
/*	
	icon: null,
*/

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

	stop: function(){
		this.power = null;
	},

	//Create timers
	createTimer: function(_type){
		switch(_type){
			case e.smallShield:
			return new PowerupTimer(Settings.smallShield.time)

			case e.bigShield:
			return new PowerupTimer(Settings.bigShield.time)

			case e.smallPole:
			return new PowerupTimer(Settings.smallPole.time)

			case e.bigPole:
			return new PowerupTimer(Settings.bigPole.time);

			case e.revertShield:
			return new PowerupTimer(Settings.revertShield.time)		
		}
	},

	//Create powers
	createPower: function(_type){
		switch(_type){
			case e.smallShield:
			this.color = Settings.smallShield.color;
			return function(_player) { _player.getShield().setShieldLength(Settings.smallShield.length); };

			case e.bigShield:
			this.color = Settings.bigShield.color;
			return function(_player) { _player.getShield().setShieldLength(Settings.bigShield.length); };

			case e.smallPole:
			this.color = Settings.smallPole.color;
			return function(_player) { _player.getPole().setRadius(Settings.smallPole.radius); };

			case e.bigPole:
			this.color = Settings.bigPole.color;
			return function(_player) { _player.getPole().setRadius(Settings.bigPole.radius); };

			case e.revertShield: 
			this.color = Settings.revertShield.color;
			return function(_player) { _player.getShield().revertShield(true); };		
		}
	},

/* //DEPRECATED FOR NOW
	createIcon: function(_type, _game){
		var sprite = null;
		switch(_type){
			case e.smallShield:
			sprite = _game.instantiate(new Sprite(Settings.smallShield.path));

			case e.bigShield:
			sprite = _game.instantiate(new Sprite(Settings.bigShield.path));

			case e.smallPole:
			sprite = _game.instantiate(new Sprite(Settings.smallPole.path));

			case e.bigPole:
			sprite = _game.instantiate(new Sprite(Settings.bigPole.path));

			case e.revertShield: 
			sprite = _game.instantiate(new Sprite(Settings.revertShield.path));
		}
		sprite.setSize({x: Settings.powerupSize*2, y: Settings.powerupSize*2}); //sprite must cover the whole powerup
		sprite.setAnchor({x: -Settings.powerupSize, y: -Settings.powerupSize}); //anchor it to the top right 
		return sprite;
	},
*/

	setIcon: function(_icon){
		this.icon = _icon;
	},

	isClicked: function(){
		//make sure the powerup disappears from the screen.
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

/*
	getIcon: function(){
		return this.icon;
	},
*/		
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