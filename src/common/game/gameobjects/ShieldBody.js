//The shield body class
if(typeof module != 'undefined'){
    var CircularBody = require('./CircularBody.js');
	var Body = require('./Body.js');
	var Input = require('../Input.js');
	var IDDistributor = require('../util/IDDistributor.js');
}  
/**
* Constructor for the shield body
* @class Shieldbody
* @classdesc Shieldbody class
* @constructor
* @extends Body
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
	},

	/**
	* Checks whether two objects are the same by comparing ID's
	*
	* @method ShieldBody#equals
	* @param {Object} _other - The other object with which it is compared.
	*/
	equals: function(_other){ return (this.ID == _other.getID()); },

	/**
	* Sets the angle of the shield
	* @method ShieldBody#setAngle
	* @param {number} _angle - The angle of the shieldbody in radians.
	*/
	setAngle: function(_angle){ this.angle = _angle; },

	/**
	* Sets the radius of the shield
	* @method ShieldBody#setRadius
	* @param {number} _radius - The radius of the shieldbody.
	*/
	setRadius: function(_radius){ this.radius = _radius; },

	/**
	* Sets the parent of the shield
	* @method ShieldBody#setParentShield
	* @param {Shield} _parentShield - The shield to which the body belongs.
	*/
	setParentShield: function(_parentShield){ this.parentShield = _parentShield; },

	/**
	* Returns the angle of the shield
	* @method ShieldBody#getAngle
	* @return {number} - The angle in radians
	*/
	getAngle: function(){ return this.angle; },

	/**
	* Returns the radius of the shield
	* @method ShieldBody#getRadius
	* @return {number} - The radius of the shieldbody
	*/
	getRadius: function(){ return this.radius; },

	/**
	* Returns the parent of the shield
	* @method ShieldBody#getParentShield
	* @return {Shield} - The shield belonging to this shieldbody
	*/
	getParentShield: function(){ return this.parentShield; },

	/**
	* Retrieves the ID of the shieldBody
	*
	* @method ShieldBody#getID
	* @return {number} The unique ID of the shieldBody
	*/
	getID: function(){ return this.ID; }
});

if(typeof module != 'undefined'){
	module.exports = ShieldBody
}  
