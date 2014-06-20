function BallController(){

	this.remove = function(globalID){
		var members = balls.getMembers();

		for(var i = 0; i < members.length; i++){
			if(members[i].getGlobalID() === globalID){
				game.remove(members[i]);
				balls.removeMember(members[i]);	
				return;
			}
		}
		console.log("404 Ball not found. GlobalID:" + globalID);
	};

	//Create nr of ball with the corresponding colors in the color-array
	this.create = function(data){
		var ball = game.instantiate(new Ball(Settings.ball.size));
		ball.setPosition(Settings.ball.x, Settings.ball.y);
		ball.setColor(data.color);
		ball.setGlobalID(data.gid);
		balls.addMember(ball);
	};

	this.update = function(data, index){
		if(balls.getMember(index) != undefined)
			balls.getMember(index).setPosition(data.x, data.y);
	}
}
