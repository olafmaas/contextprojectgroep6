/**
* Ballcontroller which handles the creating and removal off balls.
*
* @class BallController
* @classdesc BallController
* @constructor
*/

function BallController(){
	var lastBall;

	/**
	* Retrieves the ball index belonging the the given global ballID
	*
	* @method BallController#getBallIndex 
	* @param {number} _gid - The global ball ID
	* @return {number} - The index if the ball has been found, otherwise -1
	*/
	function getBallIndex(_gid){
		for(var i = 0; i < balls.getMembers().length; i++){
			if(balls.getMember(i).getGlobalID() == _gid){
				return i;
			}
		}
		return -1; 
	}

	/**
	* Removes the ball from the game.
	*
	* @method BallController#remove 
	* @param {number} _gid - The global ID of the ball that will be removed
	*/
	this.remove = function(_gid){
		var ind = getBallIndex(_gid);
		if(ind > -1){
			game.remove(balls.getMembers()[ind]);
			balls.removeMember(balls.getMembers()[ind]);
		}else{
			console.log("404 Ball Not Found");
		}
	}

	/*
	* Creates a new ball with a specified color
	*
	* @method BallController#create
	* @param {Object} data - An object containing the ball gid, position and color.
	*/
	this.create = function(data){
		if(getBallIndex(data.gid) != -1) return;

		var ball = game.instantiate(new Ball(Settings.ball.size));
		ball.setPosition(data.pos.x, data.pos.y);
		ball.setColor(data.color);
		ball.setGlobalID(data.gid);

		balls.addMember(ball);
	};

	/**
	* Updates the position of the ball
	*
	* @method BallController#update
	* @param {Array} ballData - Array containing the balls to update
	* @param {number} leftOffSet - The left offset of the player's screen as to the mainscreen.
	* @param {number} topOffset - The top offset of the player's screen as to the mainscreen.
	*/
	this.update = function(ballData, leftOffset, topOffset){
		lastBall = ballData;

		for(var b in ballData){
			var i = getBallIndex(b)
			if(i > -1){
				balls.getMember(i).setPosition(ballData[b].x - leftOffset, ballData[b].y - topOffset);
			}else{
				console.log("Ball with gid" + b + "not found.")
			}
		}
	}
}