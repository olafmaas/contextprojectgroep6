function BallController(){
	var lastBall;

	function getBallIndex(_gid){
		for(var i = 0; i < balls.getMembers().length; i++){
			if(balls.getMember(i).getGlobalID() == _gid){
				return i;
			}
		}
		return -1; 
	}

	this.remove = function(_gid){
		var ind = getBallIndex(_gid);
		if(ind > -1){
			game.remove(balls.getMembers()[ind]);
			balls.removeMember(balls.getMembers()[ind]);
		}else{
			console.log("404 Ball Not Found");
		}
		return;
	}

	//Create nr of ball with the corresponding colors in the color-array
	this.create = function(data){
		if(getBallIndex(data.gid) != -1) return;

		var ball = game.instantiate(new Ball(Settings.ball.size));
		ball.setPosition(data.pos.x, data.pos.y);
		ball.setColor(data.color);
		ball.setGlobalID(data.gid);

		balls.addMember(ball);
	};

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