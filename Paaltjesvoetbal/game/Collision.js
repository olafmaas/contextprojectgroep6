if(typeof module != 'undefined'){
    var Base = require('./Base.js');
}
/**
* Collision class
* @class Collision
* @classdesc This class is used by the Group class to save collisions.
* @constructor 
* @param {Object} _object1 - The first object for the collision (No groups)
* @param {Object} _object2 - The secod object for the collision (Can be a group)
* @param {Function} _funcAfter - A function which will be triggered after the collision handling (Optional)
* @param {Object} _this - The 'this' object that will be used as parameter in the function triggered after the collision (Optional)
*/
var Collision = Base.extend({

	//Properties
	obj1: null,
	obj2: null,
	func: null,
	funcThis: null,

	constructor: function(_object1, _object2, _funcAfter, _this){
		this.obj1 = _object1;
		this.obj2 = _object2; //even if it's null, we just set it here
		this.func = _funcAfter;
		this.funcThis = _this;
	},

	/**
	* Executes the collision depending on the parameters that are set.
	* In case the funcAfter parameter is set, this function will be triggered 
	* when handleCollision returns true;
	* 
	* @method Collision#execute
	*/
	execute: function(){
		var collided = false;
		//Execute collision function
		if(this.obj2 !== null && this.obj2 !== undefined){
			if(handleCollision(this.obj1, this.obj2)){
				if(this.func != null){
				//do something after collision
					this.func(this.funcThis);
				}
				collided = true;
			}
		}
		return collided;
	},


	getFirstObject: function(){
		return this.obj1;
	},

	getSecondObject: function(){
		return this.obj2;
	},

	getFunction: function(){
		return this.func;
	}

});

if(typeof module != 'undefined'){
    module.exports = Collision;
}
