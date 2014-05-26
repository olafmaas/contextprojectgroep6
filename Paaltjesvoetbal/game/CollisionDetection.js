if(typeof module != 'undefined'){
    var ShieldBody = require('./ShieldBody.js');
    var CircularBody = require('./CircularBody.js');
}  

var CollisionDetection ={
	handledCollisions: [],

	handleCollision: function(_bodyOne, _bodyTwo){
		if(!this.shouldHandle(_bodyOne, _bodyTwo)) return false;

		_bodyOne.handleCollision(_bodyTwo);
		_bodyTwo.handleCollision(_bodyOne);

		return true;
	},

	shouldHandle: function(_bodyOne, _bodyTwo){
		//Get the collisions
		var collisionObject = this.checkForCollision(_bodyOne, _bodyTwo);

		//If the collisionobject isn't an object but false, return
		if(collisionObject == false) return false;

		//Check if the collision has been handled already
		if(this.handledCollisions.indexOf(collisionObject) > -1) return false;

		//Add the collision ot handledcollisions
		this.handledCollisions.push(collisionObject);

		return true;
	},

	checkForCollision: function(_bodyOne, _bodyTwo){
		var collisionObject = _bodyOne.ID + "with" + _bodyTwo.ID;

		if(!this.collides(_bodyOne, _bodyTwo)) { 
			if(this.handledCollisions.indexOf(collisionObject) != -1){
				this.handledCollisions.splice(this.handledCollisions.indexOf(collisionObject), 1);
			}

			return false; 
		}

		return collisionObject;
	},

	collides: function(_bodyOne, _bodyTwo){
		if(_bodyOne instanceof CircularBody) return this.collidesBallWith(_bodyOne, _bodyTwo);
		if(_bodyOne instanceof ShieldBody) return this.collidesShieldWith(_bodyOne, _bodyTwo);
	},

	collidesBallWith: function(_ball, _other){
		if(_other instanceof CircularBody) return this.collidesBallWithBall(_ball, _other);
		if(_other instanceof ShieldBody) return this.collidesBallWithShield(_ball, _other);
	},

	collidesShieldWith: function(_shield, _other){
		if(_other instanceof CircularBody) return this.collidesBallWithShield(_other, _shield);
		if(_other instanceof ShieldBody) throw "This Collision is not Implemented";
	},

	collidesBallWithBall: function(_ball1, _ball2){
		//Get x and y difference
		var dx = _ball1.getPosition().x - _ball2.getPosition().x;
		var dy = _ball1.getPosition().y - _ball2.getPosition().y;

		//Calculate the distance with pythagoras
		var distanceApart = Math.sqrt(dx*dx + dy*dy);
		
		//Check if they collide
		return (distanceApart <= _ball1.radius + _ball2.getRadius());
	},

	collidesBallWithShield: function(_ball, _shield){
		var delta = {x: _ball.getPosition().x - _shield.getPosition().x, y: _ball.getPosition().y - _shield.getPosition().y};
		var distsq = Math.pow(delta.x, 2) + Math.pow(delta.y, 2);

		var maxDist = _shield.getRadius() + _ball.getRadius();
		var minDist = _shield.getRadius() - _ball.getRadius();
		if(distsq > Math.pow(minDist, 2) && distsq < Math.pow(maxDist, 2)){
			return this.preciseCollidesBallWithShield(_ball, _shield);
		}
	},

	preciseCollidesBallWithShield: function(_ball, _shield){
		var shieldEnds = {
			begin: normalizeAngle(_shield.getAngle() - _shield.getParentShield().getSize() / 2), 
			end: normalizeAngle(_shield.getAngle() + _shield.getParentShield().getSize() / 2)
		};
		
		var collisionAngle = normalizeAngle(_shield.getAngleTo(_ball));
		
		return (shieldEnds.begin < collisionAngle && shieldEnds.end > collisionAngle);
	}
}

normalizeAngle = function(_angle){
	return (_angle % (Math.PI * 2) + (Math.PI * 2)) % (2*Math.PI);
}

handleCollision = function(_objectOne, _objectTwo){
	return CollisionDetection.handleCollision(_objectOne.getBody(), _objectTwo.getBody());
}

if(typeof module != 'undefined'){
    module.exports = handleCollision;
} 
