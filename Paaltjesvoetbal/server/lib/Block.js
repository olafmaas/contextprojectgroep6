if(typeof module != 'undefined'){
	var Base = require('../../game/util/Base.js');
	var Ball = require('../../game/Ball.js');
	var Settings = require('./Settings.js');
	var IDDistributor = require('../../game/util/IDDistributor.js');
	var ColorGenerator = require('../../game/util/ColorGenerator');
}


var Block= Base.extend({

	balls: [],
	socket: false,
	neighbours: {top: undefined, bottom: undefined, left: undefined, right: undefined},
	position: {top: 0, left: 0},
	setting: new Settings(),

	constructor: function(_socket, _top, _left){
		socket = _socket;
		this.position.top = _top;
		this.position.left = _left;
	},

	setNeighbour: function(_position, _object){
		this.neighbours[_position] = _object;
	},

	addBall: function(ball){
		this.balls.push(ball);
	},

	ballIncoming: function(ball){
		if(!hasBall(ball)){
			this.balls.push(ball);
		}
	},

	sendNewBallToPlayer: function(ball){
		socket.emit("removeBall", ball.getGlobalID())
	},

	blocksToSendBallTo: function(ball){
		var sendTo = [];
		var xPosInBlock = ball.getPosition().x - this.left;
		var yPosInBlock = ball.getPosition().y - this.top;

		//Top
		if((yPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().y < 0){
			sendTo.push("top");
		}

		//Bottom
		if((yPosInBlock > (this.setting.canvasHeight - ball.getRadius())) && (ball.getBody().getVectorVelocity().y > 0)){
			sendTo.push("bottom")
		}

		//left
		if((xPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().x < 0)){
			sendTo.push("left")
		}

		//right
		if((xPosInBlock > (this.setting.canvasWidth - ball.getRadius())) && (ball.getBody().getVectorVelocity().x > 0)){
			sendTo.push("right")
		}

		return sendTo;
	},

	shouldBeRemoved: function(ball){
		var del = false;
		var xPosInBlock = ball.getPosition().x - this.left;
		var yPosInBlock = ball.getPosition().y - this.top;

		//top
		if(yPosInBlock < -ball.getRadius() && ball.getBody().getVectorVelocity().y < 0){
			del = true;
		}

		//Bottom
		if((yPosInBlock > (ball.getRadius() + this.setting.canvasHeight)) && (ball.getBody().getVectorVelocity().y > 0)){
			del = true;
		}

		//left
		if((xPosInBlock < -ball.getRadius()) && (ball.getBody().getVectorVelocity().x < 0)){
			del = true;
		}

		//right
		if((xPosInBlock > (ball.getRadius() + this.setting.canvasWidth)) && (ball.getBody().getVectorVelocity().x > 0)){
			del = true;
		}

		return del;
	},

	update: function(){
		for(i= 0; i < this.balls.length; i++){
			this.sendToList(this.blocksToSendBallTo(this.balls[i]), this.balls[i]);
			if(this.shouldBeRemoved(ball)){
				remove(this.ball[i])
				this.balls.splice(i, 1);
			}
		}

	},

	sendToList: function(list, ball){
		for(i= 0; i < list.length; i++){
			this.sendToBlock(list[i], ball);
		}
	},

	sendToBlock: function(direction, ball){
		this.neighbours[direction].ballIncoming(ball);
	},

	remove: function(ball){
		if(socket){
			socket.emit("removeBall", ball.getGlobalID())
		}
	},

	setPlayer: function(_socket){
		this.socket = _socket;
	},

	removePlayer: function(){
		this.socket = false;
	},

	hasPlayer: function(){
		return socket != false;
	},

	hasBall: function(_ball){
		for(var i = 0; i < this.balls.length; i++){
			if(balls[i].getGlobalID == ball.getGlobalID()){
				return true;
			}
		}
		return false;
	}

})