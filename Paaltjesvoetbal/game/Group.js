

function Group(_type){

	//Variables
	var type = _type; //The type of objects in the group.
	var members = []; //Array for the 'members' of the groups, as this could be many.
	var collision = []; //Array for the collisions, as there could be more than 1 collision to handle per group member.


	//Add an object to the group
	this.addMember = function(_object){
		console.log(_object instanceof type);
		if(_object instanceof type)
			members.push(_object);
	}

	this.update = function(){
		members.forEach(function (_object){
			_object.update();
		});
	}

	this.draw = function(_canvasContext){
		members.forEach(function (_object){
			_object.draw(_canvasContext);
		});
	}

	this.getMemberLength = function(){
		return members.length;
	}

}