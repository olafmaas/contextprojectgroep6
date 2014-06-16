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
/**
* Powerup class
*
* @class Powerup
* @classdesc A simple powerup class 
* @constructor Creates a powerup with a specific type and power.
* @extends Base
* @param {number} _radius - The radius of the powerup.
* @param {number} _type - The type of the powerup
*/
var Powerup = Base.extend({

	body: false,
	type: null,
	radius: 1,
	angle: 0, //Needed for cooldown
	ID: -1,
	timer: 0,
	color: "red",
	power: null, //function that contains what the powerup will do

	constructor: function(_radius, _type){
		this.radius = _radius;
		this.type = _type;
		this.ID = IDDistributor.getNewId();
		this.timer = this.createTimer(_type);
		this.power = this.createPower(_type);

		this.enableBody();
	},
	
	/**
	* Updates the position of the powerup
	* @method Powerup#update
	*/
	update: function(){	 if(this.body instanceof CircularBody) this.body.update(); },
	
	/**
	* Creates the body of the powerup
	* @method Powerup#enableBody
	*/
	enableBody: function(){ this.body = new CircularBody(this); },
	
	/**
	* Checks whether two objects are equals by comparing their ID's
	*
	* @method Powerup#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){ return (this.ID == _other.getID()); },

	/**
	* Executes the powerup on the given player
	*
	* @method Powerup#execute
	* @param {Player} _player - The player on which the powerup will be executed
	*/
	execute: function(_player){
		if(this.power != null){
			this.power(_player);
		}
	},

	/**
	* Stops the powerup
	*
	* @method Powerup#stop
	*/
	stop: function(){
		this.power = null;
	},

	/**
	* Creates the timer according to the given type of the powerup
	*
	* @method Powerup#createTimer
	* @param {number} _type - The type of the powerup
	*/
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

	/**
	* Creates the actual functionality of the powerup (the "power") depending on the given type.
	*
	* @method Powerup#createPower
	* @param {number} _type - The type of the powerup
	*/
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
			return function(_player) { _player.getPole().setRadius(_player.getPole().getRadius() / Settings.smallPole.radius); };

			case e.bigPole:
			this.color = Settings.bigPole.color;
			return function(_player) { _player.getPole().setRadius(_player.getPole().getRadius() * Settings.bigPole.radius); };

			case e.revertShield: 
			this.color = Settings.revertShield.color;
			return function(_player) { _player.getShield().revertShield(true); };		
		}
	},

	incrementCDAngle: function(_angle){ this.angle += _angle; },
	
	/**
	* @method Powerup#setRadius
	*/
	setRadius: function(_radius_) { this.radius = _radius; },

	/**
	* @method Powerup#setColor
	*/
	setColor: function(_color){ this.color = _color; },
	
	/**
	* @method Powerup#setPosition
	*/		
	setPosition: function(_x, _y){ this.body.position = {x: _x, y: _y}; },

	/**
	* @method Powerup#setType
	*/
	setType: function(_type){ this.type = _type; },

	//Angle in degrees
	setCDAngle: function(_angle) { this.angle = _angle },

	/**
	* @method Powerup#getColor
	*/
	getColor: function(){ return this.color; },

	/**
	* @method Powerup#getType
	*/	
	getType: function(){ return this.type; },

	/**
	* @method Powerup#getPosition
	*/	
	getPosition: function(){ return this.getBody().getPosition(); },

	/**
	* @method Powerup#getRadius
	*/		
	getRadius: function(){ return this.radius; },

	/**
	* @method Powerup#getID
	*/	
	getID: function(){ return this.ID; },

	/**
	* @method Powerup#getTimer
	*/	
	getTimer: function(){ return this.timer; },

	/**
	* @method Powerup#getBody
	*/	
	getBody: function(){ return this.body; },

	getCDAngle: function() { return this.angle; }
});

if(typeof module != 'undefined'){
    module.exports = Powerup;
}