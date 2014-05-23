

function Group(_type){

	//Variables
	var type = _type; //The type of objects in the group.
	var members = []; //Array for the 'members' of the groups, as this could be many.
	var collision = []; //Array for the collisions, as there could be more than 1 collision to handle per group member.


	//Add an object to the group
	this.addMember = function(_object){
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

	this.getMembers = function(){
		return members;
	}

	this.getMemberLength = function(){
		return members.length;
	}

	this.checkWorldBounds = function(_game){
		if(type == Ball) { //Only check world bounds if it's a ball
			members.forEach(function (_object){
				_object.getBody().checkWorldBounds(_game);
			});
		}
	}

	this.addCollision = function(_object1, _object2){
		//In case the second object is a group
		if(_object2 instanceof Group){
			var members = _object2.getMembers();
			for(var i = 0; i < members.length; i++){
				console.log("a");
				if(_object1 !== members[i]){
					console.log("b");
					var tempObj = new Collision(_object1, members[i]);
					console.log(tempObj);
					collision.push(tempObj);
				}
			}
		}
		
		else {
			var collObj = new Collision(_object1, _object2);
			collision.push(collObj);
		}
	}

	this.checkCollision = function(){
		collision.forEach(function (_coll) {
			_coll.execute();
		});
	}

}