//The shield body class
if(typeof module != 'undefined'){
    var CircularBody = require('./CircularBody.js');
	var Input = require('./Input.js');
	var Body = require('./Body.js');
	var IDDistributor = require('./IDDistributor.js');
}  
/**
* Constructor for the shield body
* @class Shieldbody
* @classdesc Shieldbody class
* @constructor
* @param {shield} _parent - The shield object
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
		
		/*var shieldEnds = {
			begin: this.getAngle() - this.getParentShield().getSize() / 2, 
			end: this.getAngle() + this.getParentShield().getSize() / 2
		};
		console.log(shieldEnds.begin, shieldEnds.end);*/
	},

	/**
	* Method to handle a collision
	* @method Shieldbody#handleIndividual
	* @param {Body} _other - The other item that collides
	*/
	handleIndividual: function(_other){
		//If the body is static it shouldn't respond to collision
	},
	
	/**
	* Returns the angle of the shield
	* @method ShieldBody#getAngle
	*/
	getAngle: function(){
		return this.angle;
	},

	/**
	* Returns the radius of the shield
	* @method ShieldBody#getRadius
	*/
	getRadius: function(){
		return this.radius;
	},

	/**
	* Returns the parent of the shield
	* @method ShieldBody#getParentShield
	*/
	getParentShield: function(){
		return this.parentShield;
	},

	/**
	* Sets the angle of the shield
	* @method ShieldBody#setAngle
	*/
	setAngle: function(_angle){
		this.angle = _angle;
	},

	/**
	* Sets the radius of the shield
	* @method ShieldBody#setRadius
	*/
	setRadius: function(_radius){
		this.radius = _radius;
	},

	/**
	* Sets the parent of the shield
	* @method ShieldBody#setParentShield
	*/
	setParentShield: function(_parentShield){
		this.parentShield = _parentShield;
	}
});

if(typeof module != 'undefined'){
	module.exports = ShieldBody
}  
