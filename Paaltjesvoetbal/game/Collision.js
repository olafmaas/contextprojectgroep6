
//obj1 en obj2, func kan null zijn 

function Collision(_object1, _object2, _funcAfter, _this){
	//Properties
	var obj1 = _object1;
	var obj2 = _object2; //even if it's null, we just set it here
	var func = _funcAfter;
	var funcThis = _this;

	//Execute the collision
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
}
