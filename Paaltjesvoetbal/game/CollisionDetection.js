if(typeof module != 'undefined'){
    var ShieldBody = require('./ShieldBody.js');
    var CircularBody = require('./CircularBody.js');
}  

/**
* CollisionDetection Class
* @class CollisionDetection
* @classdesc Class which detects collisions and calls methods to handle them.
*/
var CollisionDetection = {
	handledCollisions: [],

	/**
	* Calls basic collision function with the two objects
	* @method CollisionDetection#handleCollision
	* @param {object} _bodyOne - Object 1
	* @param {object} _bodyTwo - Object 2
	*/
	handleCollision: function(_bodyOne, _bodyTwo){
		if(!this.shouldHandle(_bodyOne, _bodyTwo)) return false;

		_bodyOne.handleCollision(_bodyTwo);
		_bodyTwo.handleCollision(_bodyOne);

		return true;
	},

	/**
	* Gets the collisions between two objects
	* @method CollisionDetection#shouldHandle
	* @param {object} _bodyOne - Object 1
	* @param {object} _bodyTwo - Object 2
	*/
	shouldHandle: function(_bodyOne, _bodyTwo){
		//Get the collisions
		var collisionObject = this.checkForCollision(_bodyOne, _bodyTwo);

		//If the collisionobject isn't an object but false, return
		if(collisionObject == false) return false;

		//Check if the collision has been handled already
		if(this.handledCollisions.indexOf(collisionObject) > -1) return false;

		//Add the collision to handledcollisions
		this.handledCollisions.push(collisionObject);

		return true;
	},

	/**
	* Checks for collision and returns the collision object
	* @method CollisionDetection#checkForCollision
	* @param {object} _bodyOne - Object 1
	* @param {object} _bodyTwo - Object 2
	*/
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

	/**
	* Determines which collision could occur and calls the specific check method
	* @method CollisionDetection#collides
	* @param {object} _bodyOne - Object 1
	* @param {object} _bodyTwo - Object 2
	*/
	collides: function(_bodyOne, _bodyTwo){
		if(_bodyOne instanceof CircularBody) return this.collidesBallWith(_bodyOne, _bodyTwo);
		if(_bodyOne instanceof ShieldBody) return this.collidesShieldWith(_bodyOne, _bodyTwo);
	},

	/**
	* Specific collision method for ball and another object
	* @method CollisionDetection#collidesBallWith
	* @param {shield} _ball - Ball object
	* @param {object} _other - Other object
	*/
	collidesBallWith: function(_ball, _other){
		if(_other instanceof CircularBody) return this.collidesBallWithBall(_ball, _other);
		if(_other instanceof ShieldBody) return this.collidesBallWithShield(_ball, _other);
	},

	/**
	* Specific collision method for shield and another object
	* @method CollisionDetection#collidesShieldWith
	* @param {shield} _shield - Shield object
	* @param {object} _other - Other object
	*/
	collidesShieldWith: function(_shield, _other){
		if(_other instanceof CircularBody) return this.collidesBallWithShield(_other, _shield);
		if(_other instanceof ShieldBody) return false;
	},

	/**
	* Specific collision method for ball and ball
	* @method CollisionDetection#collidesBallWithBall
	* @param {ball} _ball1 - Ball object
	* @param {ball} _ball2 - Ball object
	*/
	collidesBallWithBall: function(_ball1, _ball2){
		//Get x and y difference
		var dx = _ball1.getPosition().x - _ball2.getPosition().x;
		var dy = _ball1.getPosition().y - _ball2.getPosition().y;

		//Calculate the distance with pythagoras
		var distanceApart = Math.sqrt(dx*dx + dy*dy);
		
		//Check if they collide
		return (distanceApart <= _ball1.radius + _ball2.getRadius());
	},

	/**
	* Specific collision method for ball and shield (circle to circle collision)
	* @method CollisionDetection#collidesBallWithShield
	* @param {ball} _ball - Ball object
	* @param {shield} _shield - Shield object
	*/
	collidesBallWithShield: function(_ball, _shield){
		var delta = {x: _ball.getPosition().x - _shield.getPosition().x, y: _ball.getPosition().y - _shield.getPosition().y};
		var distsq = Math.pow(delta.x, 2) + Math.pow(delta.y, 2);

		var maxDist = _shield.getRadius() + _ball.getRadius();
		var minDist = _shield.getRadius() - _ball.getRadius();
		if(distsq > Math.pow(minDist, 2) && distsq < Math.pow(maxDist, 2)){
			return this.preciseCollidesBallWithShield(_ball, _shield);
		}
	},

	/**
	* Precise collision method for ball and shield (circle to arc)
	* @method CollisionDetection#collidesBallWithBall
	* @param {ball} _ball - Ball object
	* @param {ball} _shield - Shield object
	*/
	preciseCollidesBallWithShield: function(_ball, _shield){
		var shieldEnds = {
			begin: normalizeAngle(_shield.getAngle() - _shield.getParentShield().getSize() / 2), 
			end: normalizeAngle(_shield.getAngle() + _shield.getParentShield().getSize() / 2)
		};
		
		var collisionAngle = normalizeAngle(_shield.getAngleTo(_ball));
		
		if(shieldEnds.begin > shieldEnds.end){
			return (collisionAngle > shieldEnds.begin || collisionAngle < shieldEnds.end);
		}
		else{
			return (collisionAngle > shieldEnds.begin && collisionAngle < shieldEnds.end);
		}
	},

	/**
	* 
	*
	*
	*/
	hasCollision: function(_objectOne, _objectTwo){
		return handledCollisions.indexOf(_objectOne.getBody().ID + "with" + _objectTwo.getBody().ID) >= 0
			|| handledCollisions.indexOf(_objectTwo.getBody().ID + "with" + _objectOne.getBody().ID) >= 0;
	}
}

/**
* Normalizes the angle
* @method CollisionDetection#normalizeAngle
* @param {float} _angle - The angle of the object
*/
normalizeAngle = function(_angle){
	return (_angle % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
}

/**
* Calls the handling method for two given objects
* @method CollisionDetection#handleCollision
* @param {object} _objectOne - Object 1
* @param {object} _objectTwo - Object 2
*/
handleCollision = function(_objectOne, _objectTwo){
	//Guard
	if (_objectOne.getBody === undefined || _objectTwo.getBody === undefined) return false;

	return CollisionDetection.handleCollision(_objectOne.getBody(), _objectTwo.getBody());
}

if(typeof module != 'undefined'){
    module.exports = handleCollision;
} 
