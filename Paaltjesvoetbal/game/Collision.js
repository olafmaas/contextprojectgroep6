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
function Collision(_object1, _object2, _funcAfter, _this){
	//Properties
	var obj1 = _object1;
	var obj2 = _object2; //even if it's null, we just set it here
	var func = _funcAfter;
	var funcThis = _this;

	/**
	* Executes the collision depending on the parameters that are set.
	* In case the funcAfter parameter is set, this function will be triggered 
	* when handleCollision returns true;
	* 
	* @method Collision#execute
	*/
	this.execute = function(){
		var collided = false;
		//Execute collision function
		if(obj2 !== null && obj2 !== undefined){
			if(handleCollision(obj1, obj2)){
				if(func != null){
				//do something after collision
					func(funcThis);
				}
				collided = true;
			}
		}
		return collided;
	}
}

if(typeof module != 'undefined'){
    module.exports = Collision;
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/multiplayer
