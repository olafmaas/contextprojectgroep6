
function Collision(_object1, _object2){
	//Properties
	var obj1 = _object1;
	var obj2 = _object2; //even if it's null, we just set it here

	//Execute the collision
	this.execute = function(){

		//Execute collision function
		if(obj2 !== null && obj2 !== undefined){
			handleCollision(obj1, obj2);
		}
	}
}