
function Collision(_object1, _object2, _collision, _preCollision){
	//Properties
	var obj1 = _object1;
	var obj2 = _object2; //even if it's null, we just set it here
	this.coll = _collision;
	this.preColl = null;

	if(_preCollision !== null && _preCollision !== undefined)
		this.preColl = _preCollision;


	//Execute the collision
	this.execute = function(){

		if(this.preColl !== null){
			if(obj2 !== null){
				if(!this.preColl(obj1, obj2))
					return;
			}
			else{
				if(!this.preColl(obj1))
					return;
			}
		}

		//Execute collision function
		if(obj2 !== null && obj2 !== undefined){
			this.coll(obj1, obj2);
		}
		else {
			this.coll(obj1);
		}

	}
}