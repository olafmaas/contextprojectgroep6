if(typeof module != 'undefined'){
	var Base = require('../../game/util/Base.js');
	var Ball = require('../../game/Ball.js');
	var Settings = require('./Settings.js');
	var e = require('../../game/util/Enums.js');
}

var Block = Base.extend({

	ballsList: null,
	socket: false,
	neighbours: null,
	position: null,
	setting: new Settings(),

	constructor: function(_socket, _left, _top){
		this.socket = _socket;
		this.position = {top: _top, left: _left};
		this.neighbours = {top: undefined, bottom: undefined, left: undefined, right: undefined};
		this.ballsList = new Array();
	},

	setNeighbour: function(_position, _object){
		this.neighbours[_position] = _object;
	},

	addBall: function(_ball){

		this.ballsList.push(_ball);
		_ball.getBody().setCollisionCallback(this.playAudio, this);

		this.sendNewBallToPlayer(_ball);
	},


	ballIncoming: function(_ball){
		if(!this.hasBall(_ball)){
			this.sendNewBallToPlayer(_ball);
			this.ballsList.push(_ball);
		}
	},

	sendNewBallToPlayer: function(_ball){
		if(this.socket){
			this.socket.emit("addBall", {pos: _ball.getPosition(), gid: _ball.getGlobalID(), color: _ball.getColor()})
		}
	},

	blocksToSendBallTo: function(_ball){
		var sendTo = [];
		var xPosInBlock = _ball.getPosition().x - this.position.left;
		var yPosInBlock = _ball.getPosition().y - this.position.top;

		//Top
		if((yPosInBlock < _ball.getRadius()) && (_ball.getBody().getVectorVelocity().y < 0)){
			sendTo.push("top");
		}

		//Bottom
		if((yPosInBlock > (this.setting.canvasHeight - _ball.getRadius())) && (_ball.getBody().getVectorVelocity().y > 0)){
			sendTo.push("bottom")
		}

		//left
		if((xPosInBlock < _ball.getRadius()) && (_ball.getBody().getVectorVelocity().x < 0)){
			sendTo.push("left")
		}

		//right
		if((xPosInBlock > (this.setting.canvasWidth - _ball.getRadius())) && (_ball.getBody().getVectorVelocity().x > 0)){
			sendTo.push("right")
		}

		return sendTo;
	},

	shouldBeRemoved: function(_ball){
		var del = false;
		var xPosInBlock = _ball.getPosition().x - this.position.left;
		var yPosInBlock = _ball.getPosition().y - this.position.top;

		//top
		if((yPosInBlock < -_ball.getRadius()) && (_ball.getBody().getVectorVelocity().y < 0)){
			del = true;
		}

		//Bottom
		if((yPosInBlock > (_ball.getRadius() + this.setting.canvasHeight)) && (_ball.getBody().getVectorVelocity().y > 0)){
			del = true;
		}

		//left
		if((xPosInBlock < -_ball.getRadius()) && (_ball.getBody().getVectorVelocity().x < 0)){
			del = true;
		}

		//right
		if((xPosInBlock > (_ball.getRadius() + this.setting.canvasWidth)) && (_ball.getBody().getVectorVelocity().x > 0)){
			del = true;
		}

		return del;
	},

	update: function(){
		var posList = {};
		for(var ind = 0; ind < this.ballsList.length; ind++){
			this.sendToList(this.blocksToSendBallTo(this.ballsList[ind]), this.ballsList[ind]);
			if(this.shouldBeRemoved(this.ballsList[ind])){
				this.removeBall(this.ballsList[ind], ind)
			}else{
				posList[this.ballsList[ind].getGlobalID()] = this.ballsList[ind].getPosition();
			}
		}

		if(this.socket){
			this.socket.emit(e.updateBalls, posList);
		}
	},

	sendToList: function(list, _ball){
		for(var j= 0; j < list.length; j++){
			this.sendToBlock(list[j], _ball);
		}
	},

	sendToBlock: function(direction, _ball){
		if(this.neighbours[direction] != undefined){
			this.neighbours[direction].ballIncoming(_ball);
		}
		
	},

	removeBall: function(_ball, index){
		if(this.socket){
			this.socket.emit("removeBall", _ball.getGlobalID())
		}

		
		if(index == -1){
			this.ballsList.splice(this.getBallIndex(ball), 1);
		}else{
			this.ballsList.splice(index, 1);
		}
		
	},

	getBallIndex: function(_ball){
		for(var j = 0; j < this.ballsList.length; j++){
			if(this.ballsList[j].getGlobalID() == _ball.getGlobalID()){
				return j;
			}
		}
		return -1;
	},

	setPlayer: function(_socket){
		this.socket = _socket;
		this.socket.emit('canvasPos', {left: this.position.left, top: this.position.top});

		//Send all balls in block to player
		for(var i = 0; i < this.ballsList.length; i++){
			this.sendNewBallToPlayer(this.ballsList[i]);
		}
	},

	removePlayer: function(){
		this.socket = false;
	},

	hasPlayer: function(){
		return this.socket != false;
	},

	hasBall: function(_ball){
		for(var i = 0; i < this.ballsList.length; i++){
			if(this.ballsList[i].getGlobalID() == _ball.getGlobalID()){
				return true;
			}
		}
		return false;
	},

	getPosition: function(){
		return this.position;
	},

	getPlayer: function(){
		return this.socket;
	},

	playAudio: function(){
		if(this.socket){
			this.socket.emit("playAudio", "ballCollision")
		}
	}

});

if(typeof module != 'undefined'){
    module.exports = Block;
}
