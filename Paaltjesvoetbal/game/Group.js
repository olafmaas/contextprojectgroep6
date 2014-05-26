if(typeof module != 'undefined'){
	var Ball = require('./Ball.js');
	var Collision = require('./Collision.js');
}

/**
* Group class
* @class Group
* @classdesc Class to represent objects as groups.
* @constructor
* @param {Object} _type - The type of objects which are stored in the group.
*/
function Group(_type){

	//Variables
	var type = _type; //The type of objects in the group.
	var members = []; //Array for the 'members' of the groups, as this could be many.
	var collision = []; //Array for the collisions, as there could be more than 1 collision to handle per group member.

	/**
	* Updates al objects within a list of members
	* @method Group#update
	*/
	this.update = function(){
		members.forEach(function (_object){
			_object.update();
		});
	}

	/**
	* Draws all objects within a list of members
	* @method Group#draw
	*/
	this.draw = function(_canvasContext){
		members.forEach(function (_object){
			_object.draw(_canvasContext);
		});
	}

	/**
	* Adds an object to an existing list of members
	* @method Group#addMember
	* @param {Object} _object - The object which is added to a list of members
	*/
	this.addMember = function(_object){
		if(_object instanceof type)
			members.push(_object);
	}

	//TODO: make sure each object has an unique identifier
	//Then: finish this method, so a member of the group can be deleted
	this.removeMember = function(_id){
		//remove member based on given id
		//remove any collisions that are depending on this member
	}

	/**
	* Clears both the members and collision array of the group.
	* Note: Both are cleared at once, because collisions are depending on the members.
	* There is a function available to clear all collisions without removing the members.
	*
	* @method Group#clearGroup.
	*/
	this.clearGroup = function(){
		//Setting the length to 0 will remove all objects in the array.
		//members = [] would also be possible, but this will create a new array
		//and any references to the old one will still be working or will eventually
		//created problems.
		members.length = 0; 
		collision.length = 0;
	}

	/**
	* Adds the correct colission between all the objects of two lists
	* @method Group#addCollision
	* @param {Object} _object1 - Object 1 for the possible collision
	* @param {Object} _object2 - Object 2 for the possible collision, can be a list
	* @param {Function} _funcAfter - The function that will be triggered after collisionhandling has succeeded (e.g. for pole) (can be null)
	* @param {Object} _this - The 'this' that will be submitted to the funcAfter function (can be null)
	*/
	this.addCollision = function(_object1, _object2, _funcAfter, _this){
		//In case the second object is a group
		if(_object2 instanceof Group){
			var members = _object2.getMembers();
			for(var i = 0; i < members.length; i++){
				if(_object1 !== members[i]){
					var tempObj = new Collision(_object1, members[i], _funcAfter, _this);
					collision.push(tempObj);
				}
			}
		}	
		else {
			var collObj = new Collision(_object1, _object2, _funcAfter, _this);
			collision.push(collObj);
		}
	}

	//TODO: remove collision based on ?
	this.removeCollision = function(){
		//remove collision
	}

	/**
	* Removes all collisions from the group, but keeps the members.
	*
	* @method Group#clearCollisions
	*/
	this.clearCollisions = function(){
		collision.length = 0;
	}

	/**
	* Checks each collision of the possible collisions
	* @method Group#checkCollision
	*/
	this.checkCollision = function(){
		var collided = false;
		collision.forEach(function (_coll) {
			if(_coll.execute())
				collided = true;
		});
		return collided;
	}

	/**
	* Adds collision between all the objects of the same group (is used in the balls group)
	* @method Group#addCollisionCombineAll
	* @param {Group} _objectGroup - Group of objects
	*/
	this.addCollisionCombineAll = function(_objectGroup){
		var length = _objectGroup.getMemberLength();
		var members = _objectGroup.getMembers();
		for(var i = 0; i < length; i++){
			for(var j = i; j < length; j++){
				var coll = new Collision(members[i], members[j], null, null);
				collision.push(coll);
			}
		}
	}

	/**
	* Checks the world bounds for every ball object
	* @method Group#checkWorldBounds
	* @param {Game} _game - Game object supplies the boundaries
	*/
	this.checkWorldBounds = function(_game){
		var collided = false;
		if(type == Ball) { //Only check world bounds if it's a ball
			members.forEach(function (_object){
				if(_object.getBody().checkWorldBounds(_game))
					collided = true;
			});
		}
		return collided;
	}

	/**
	* Returns a list of members
	* @method Group#getMembers
	*/
	this.getMembers = function(){
		return members;
	}

	/**
	* Returns a specific object from a list of members
	* @method Group@getMember
	* @param {int} _index - The index of the object you want to return
	*/
	this.getMember = function(_index){
		return members[_index];
	}

	/**
	* Returns the amount of objects in the list
	* @method Group#getMembersLength
	*/
	this.getMemberLength = function(){
		return members.length;
	}
}

if(typeof module != 'undefined'){
    module.exports = Group;
}
