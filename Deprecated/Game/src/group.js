//A simple class to store objects in a group.

function Group(){
	//Variables
	var members = []; //Array for the 'members' of the groups, as this could be many.
	var collision = []; //Array for the collisions, as there could be more than 1 collision to handle per group member.

	//Add an object to the group
	this.add = function(_object){
		members.push(_object);
	}

	//Add a collision detection function to the group
	//@Param _object1
	//	The first object to check
	//@Param _object2 (optional)
	//	The second object to check (can also be a group)
	//@Param _collision
	//	The collision function that is executed when collision between objects occurs
	//@Param _preCollision (Optional)
	//	A pre-collision function to perform additional checks whether the two objects really collided
	this.addCollision = function(_object1, _object2, _collision, _preCollision)	{

		//In case the second object is a group
		if(_object2 instanceof Group){
			var members = _object2.getMembers();
			for(var i = 0; i<_object2.memberlength; i++){
				if(_object1 !== members[i]){
					//console.log(_object2.members[i]);
					var tempObj = new Collision(_object1, members[i], _collision, _preCollision);
					collision.push(tempObj);
				}
			}
		}
		
		else {
			//Create new collision object and add it to the array
			var collObj = new Collision(_object1, _object2, _collision, _preCollision);
			collision.push(collObj);
		}
	}

	//Go through each of the collisions available in the group
	this.checkCollisions = function(){
		collision.forEach(function (coll) {
			coll.execute();
		});
	}

	//Draws everything that's a member in the group
	this.draw = function() {
		members.forEach(function (_object){
			_object.draw(ctx);
		});
	}

	//Moves everything that's a member in the group
	this.move = function() {
		members.forEach(function (_object){
			_object.move();
		});
	}

	//Returns the length of the member array
	this.memberLength = function(){
		return members.length;
	}

	//Returns the length of the collision array
	this.collisionLength = function(){
		return collision.length;
	}

	//Returns the member array
	this.getMembers = function(){
		return members;
	}

	//Returns the collision array
	this.getCollisions = function() {
		return collisions;
	}

}