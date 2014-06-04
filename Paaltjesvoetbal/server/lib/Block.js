if(typeof module != 'undefined'){
	var Base = require('../../game/util/Base.js');
	var Ball = require('../../game/Ball.js');
	var Settings = require('./Settings.js');
	var IDDistributor = require('../../game/util/IDDistributor.js');
	var ColorGenerator = require('../../game/util/ColorGenerator');
}


var Block = Base.extend({

	ballsList: null,
	socket: false,
	neighbours: {top: undefined, bottom: undefined, left: undefined, right: undefined},
	position: {top: 0, left: 0},
	setting: new Settings(),

	constructor: function(_socket, _left, _top){
		this.socket = _socket;
		this.position.top = _top;
		this.position.left = _left;
		this.ballsList = [];
	},

	setNeighbour: function(_position, _object){
		this.neighbours[_position] = _object;
	},

	addBall: function(ball){
		console.log("Ball Pushed in:" + this.position.left + " " + this.position.top)
		this.ballsList.push(ball);
		console.log(this.ballsList.length);
		this.sendNewBallToPlayer(ball);
	},

	ballIncoming: function(ball){
		if(!this.hasBall(ball)){
			this.sendNewBallToPlayer(ball);
			this.ballsList.push(ball);
			console.log("Ball Came in:" + ball.getPosition() + " " + this.position.left + " " + this.position.top)
		}
	},

	sendNewBallToPlayer: function(ball){
		this.socket.emit("addBall", {pos: ball.getPosition(), gid: ball.getGlobalID(), color: ball.getColor()})
	},

	blocksToSendBallTo: function(ball){
		var sendTo = [];
		var xPosInBlock = ball.getPosition().x - this.left;
		var yPosInBlock = ball.getPosition().y - this.top;

		//Top
		if((yPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().y < 0)){
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
		var posList = {};
		for(var i = 0; i < this.ballsList.length; i++){
			//console.log(this.position.left + " " +this.balls[i].getPosition())
			this.sendToList(this.blocksToSendBallTo(this.ballsList[i]), this.ballsList[i]);
			if(this.shouldBeRemoved(ball)){
				removeBall(this.ballsList[i], i)
			}else{
				posList[this.ballsList[i].getGlobalID()] = this.ballsList[i].getPosition();
			}
		}


		this.socket.emit('updateBalls', posList);
	},

	sendToList: function(list, ball){
		for(var j= 0; j < list.length; j++){
			this.sendToBlock(list[j], ball);
		}
	},

	sendToBlock: function(direction, ball){
		this.neighbours[direction].ballIncoming(ball);
	},

	removeBall: function(ball, i){
		if(this.socket){
			this.socket.emit("removeBall", ball.getGlobalID())
		}

		if(i == -1){
			this.ballsList.splice(this.getBallIndex(ball), 1);
		}else{
			this.ballsList.splice(i, 1);
		}
	},

	getBallIndex: function(ball){
		for(var i = 0; i < this.ballsList.length; i++){
			if(this.ballsList[i].getGlobalID() == ball.getGlobalID()){
				return i;
			}
		}
		return -1;
	},

	setPlayer: function(_socket){
		this.socket = _socket;
		this.socket.emit('canvasPos', {left: this.position.left, top: this.position.top});
	},

	removePlayer: function(){
		this.socket = false;
	},

	hasPlayer: function(){
		return this.socket != false;
	},

	hasBall: function(_ball){
		for(var i = 0; i < this.ballsList.length; i++){
			if(this.ballsList[i].getGlobalID() == ball.getGlobalID()){
				return true;
			}
		}
		return false;
	}

})

if(typeof module != 'undefined'){
    module.exports = Block;
}