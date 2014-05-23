if(typeof module != 'undefined'){
	var Ball = require('./Ball.js');
	var Collision = require('./Collision.js');
}
//TOOD: documentation
//TODO: For now it's just for balls.
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

	this.getMember = function(_index){
		return members[_index];
	}

	this.getMemberLength = function(){
		return members.length;
	}

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

	this.checkCollision = function(){
		var collided = false;
		collision.forEach(function (_coll) {
			if(_coll.execute())
				collided = true;
		});
		return collided;
	}

	//takes one group in which everything with everything is combined.
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

}

if(typeof module != 'undefined'){
    module.exports = Group;
}
