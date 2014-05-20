//The shield body class
if(typeof module != 'undefined'){
    var CircularBody = require('./CircularBody.js');
	var Input = require('./Input.js');
	var Body = require('./Body.js');
}  

/**
*
*
*/
var ShieldBody = Body.extend({
	angle: 0,
	radius: 1,
	parentShield: 0,
	ID: -1,

	/**
	* Constructor for the shield body
	* @method ShieldBody#constructor
	* @param {shield} _parent - The shield object
	*/
	constructor: function(_parent){
		this.angle = _parent.getAngle();
		this.radius = _parent.getRadius();
		this.parentShield = _parent;
		this.position = _parent.getPosition();
		this.ID = IDDistributor.getNewId();
	},

	/**
	* Updates the angle of the shield
	* @method ShieldBody#update
	*/
	update: function(){
		this.base();
		this.setAngle(this.getParentShield().getAngle());
		this.setRadius(this.getParentShield().getRadius());
	},

	/**
	* Method to handle a collision
	* @method Shieldbody#handleIndividual
	* @param {Body} _other - The other item that collides
	*/
	handleIndividual: function(_other){
		//If the body is static it shouldn't respond to collision
	},
	
	getAngle: function(){
		return this.angle;
	},

	getRadius: function(){
		return this.radius;
	},

	getParentShield: function(){
		return this.parentShield;
	},

	setAngle: function(_angle){
		this.angle = _angle;
	},

	setRadius: function(_radius){
		this.radius = _radius;
	},

	setParentShield: function(_parentShield){
		this.parentShield = _parentShield;
	}
});

if(typeof module != 'undefined'){
	module.exports = ShieldBody
}  
