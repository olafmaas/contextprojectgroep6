if(typeof module != 'undefined'){
	var Ball = require('../gameobjects/Ball.js');
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

	/**
	* Adds an object to an existing list of members. Don't use this function in combination with AddMemberOnPosition.
	* @method Group#addMember
	* @param {Object} _object - The object which is added to a list of members
	*/
	this.addMember = function(_object){
		if(_object instanceof type)
			members.push(_object);
	}

	/**
	* Removes the specified object from the group, returns -1 if not found or of wrong type.
	*
	* @method Group#removeMember 
	* @param {Object} _object - The object which has to be deleted from the group.
	*/
	this.removeMember = function(_object){
		if(_object instanceof type){
			var found = false;
			for(var i = members.length - 1; i >= 0; i--) {
    			if(members[i].getID() === _object.getID()) {
       				members.splice(i, 1);
       				found = true;
    			}
			}
			if(!found) return -1;
		}
		else return -1; //Else it's another type, which isn't present in this group
	}

	/**
	* Checks each collision of the possible collisions
	* 
	* @method Group#checkCollision
	*/
	this.checkCollision = function(){
		for (var i = 0; i < members.length; i++) {
			for (var j = i + 1; j < members.length; j++) {
				if(CollisionDetection.hasCollision(members[i], members[j])) return true;
			}
		}
		return false;
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
	* Returns member with given id
	* @method Group#getMemberByID
	*/
	this.getMemberByID = function(_id){
		var length = this.getMemberLength();
		for(var i = 0; i < length; i++){
			if(members[i].getID() === _id)
				return members[i];
		}
		return -1;
	}
	
	/**
	* Returns member with given global id
	* @method Group#getMemberByGlobalID
	*/
	this.getMemberByGlobalID = function(_id){
		var length = this.getMemberLength();
		for(var i = 0; i < length; i++){
			if(members[i].getGlobalID() === _id)
				return members[i];
		}
		return -1;
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
