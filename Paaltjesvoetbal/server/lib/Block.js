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
		console.log("Ball Pushed in:" + this.position.left + " " + this.position.top)
		this.ballsList.push(_ball);

		this.sendNewBallToPlayer(_ball);
	},

	ballIncoming: function(_ball){
		if(!this.hasBall(_ball)){
			this.sendNewBallToPlayer(_ball);
			this.ballsList.push(_ball);
			console.log("Ball Came in:" + _ball.getGlobalID() + " " + this.position.left + " " + this.position.top)
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
			console.log("Top Del")
			del = true;
		}

		//Bottom
		if((yPosInBlock > (_ball.getRadius() + this.setting.canvasHeight)) && (_ball.getBody().getVectorVelocity().y > 0)){
			console.log("Bottom Del")
			del = true;
		}

		//left
		if((xPosInBlock < -_ball.getRadius()) && (_ball.getBody().getVectorVelocity().x < 0)){
			console.log("Left Del"+ xPosInBlock + " "+ _ball.getPosition().x +" "  + _ball.getGlobalID() + " " + _ball.getBody().getVectorVelocity().x)
			del = true;
		}

		//right
		if((xPosInBlock > (_ball.getRadius() + this.setting.canvasWidth)) && (_ball.getBody().getVectorVelocity().x > 0)){
			console.log("Right Del"+ xPosInBlock + " "+ _ball.getPosition().x +" " + _ball.getGlobalID() + " " + _ball.getBody().getVectorVelocity().x)
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
			this.socket.emit('updateBalls', posList);
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
		console.log("Ball removed: {gid:" +_ball.getGlobalID() + ", pos: x, " + _ball.getPosition().x + " y, " + _ball.getPosition().y + "} on " + this.position.left + " " + this.position.top);
		if(this.socket){
			this.socket.emit("removeBall", _ball.getGlobalID())
		}

		
		if(index == -1){
			console.log("Ball wordt verwijderd.")
			this.ballsList.splice(this.getBallIndex(ball), 1);
			console.log("Done")
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
	}

})

if(typeof module != 'undefined'){
    module.exports = Block;
}