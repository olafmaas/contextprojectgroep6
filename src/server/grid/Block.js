if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');

	var e = require('../../common/Enums.js');
	var Ball = require('../../common/game/gameobjects/Ball.js');
	var S = require('../../common/Settings.js');
}


/**
* Block Class
* @class Block
* @classdesc Block is a class which handles the screen of one player. 
* @constructor 
* @extends Base
* @param {socket} _socket - The socket of the player in this block, use false 
* if a player is not yet assigned.
* @param {int} _left - The left bound of this block in pixels.
* @param {int} _top - The top bound of this block. 
*/
var Block = Base.extend({

	ballsList: null,
	socket: false,
	neighbours: null,
	position: null,
	player: false,

	constructor: function(_socket, _left, _top){
		this.socket = _socket;
		this.position = {top: _top, left: _left};
		this.neighbours = {top: undefined, bottom: undefined, left: undefined, right: undefined};
		this.ballsList = new Array();
	},

	setNeighbour: function(_position, _object){
		this.neighbours[_position] = _object;
	},


	/**
	* Add ball to this block.
	* @method Block#addBall
	* @param {ball} _ball - The ball that should be added to the block.
	*/
	addBall: function(_ball){

		this.ballsList.push(_ball);
		_ball.getBody().setCollisionCallback(this.playAudio, this);
		this.sendNewBallToPlayer(_ball);
	},

	/**
	* A method that is called by other blocks to tell a ball is traveling towards this
	* block. Checks wether this block already has this ball in his list. If the ball
	* is not found the ball will be added.
	* @method Block#ballIncoming
	* @param {ball} _ball - The ball that should be added to the block.
	*/
	ballIncoming: function(_ball){
		if(!this.hasBall(_ball)){
			this.sendNewBallToPlayer(_ball);
			this.ballsList.push(_ball);
			_ball.getBody().setCollisionCallback(this.playAudio, this);
		}
	},

	/**
	* Notify the player about the ball.
	* @method Block#sendNewBallToPlayer
	* @param {ball} _ball - The ball the player should be notified about. 
	*/
	sendNewBallToPlayer: function(_ball){
		if(this.socket){
			this.socket.emit("addBall", {pos: _ball.getPosition(), gid: _ball.getGlobalID(), color: _ball.getColor()})
		}
	},

	/**
	* Calculates in which directions a ball should be send. 
	* @method Block#blocksToSendBallTo
	* @param {ball} _ball
	* @return {array} - An array with the directions. (top, bottom, left, right)
	*/
	blocksToSendBallTo: function(_ball){
		var sendTo = [];
		var xPosInBlock = _ball.getPosition().x - this.position.left;
		var yPosInBlock = _ball.getPosition().y - this.position.top;

		//Top
		if((yPosInBlock < _ball.getRadius()) && (_ball.getBody().getVectorVelocity().y < 0)){
			sendTo.push("top");
		}

		//Bottom
		if((yPosInBlock > (S.canvasHeight - _ball.getRadius())) && (_ball.getBody().getVectorVelocity().y > 0)){
			sendTo.push("bottom")
		}

		//left
		if((xPosInBlock < _ball.getRadius()) && (_ball.getBody().getVectorVelocity().x < 0)){
			sendTo.push("left")
		}

		//right
		if((xPosInBlock > (S.canvasWidth - _ball.getRadius())) && (_ball.getBody().getVectorVelocity().x > 0)){
			sendTo.push("right")
		}

		return sendTo;
	},

	/**
	* Calculates wether a ball should be removed
	* @method Block#shouldBeRemoved
	* @param {ball} _ball
	* @return {boolean} - A boolean which is true if the ball should be removed. 
	*/
	shouldBeRemoved: function(_ball){
		var del = false;
		var xPosInBlock = _ball.getPosition().x - this.position.left;
		var yPosInBlock = _ball.getPosition().y - this.position.top;

		//top
		if((yPosInBlock < -_ball.getRadius()) && (_ball.getBody().getVectorVelocity().y < 0)){
			del = true;
		}

		//Bottom
		if((yPosInBlock > (_ball.getRadius() + S.canvasHeight)) && (_ball.getBody().getVectorVelocity().y > 0)){
			del = true;
		}

		//left
		if((xPosInBlock < -_ball.getRadius()) && (_ball.getBody().getVectorVelocity().x < 0)){
			del = true;
		}

		//right
		if((xPosInBlock > (_ball.getRadius() + S.canvasWidth)) && (_ball.getBody().getVectorVelocity().x > 0)){
			del = true;
		}

		return del;
	},

	/**
	* Updates the block. Send balls to other players, remove balls and emits all the new positions to the player. 
	* @method Block#update
	* @return {boolean} - A boolean which is true if the ball should be removed. 
	*/
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

	/**
	* Sends ball to everey direction in the list
	* @method Block#sendToList
	* @param {Array} list - the list with directions the ball should be send to.
	* @param {Ball} _ball - 
	* @return {boolean} - A boolean which is true if the ball should be removed. 
	*/
	sendToList: function(list, _ball){
		for(var j= 0; j < list.length; j++){
			this.sendToBlock(list[j], _ball);
		}
	},

	/**
	* Send to the list.
	* @method Block#sendTobBlock
	* @return {boolean} - A boolean which is true if the ball should be removed. 
	*/
	sendToBlock: function(direction, _ball){
		if(this.neighbours[direction] != undefined){
			this.neighbours[direction].ballIncoming(_ball);
		}
		
	},

	/**
	* Remove ball from the block. If an index is known this method can
	* be much faster. Send index -1 if the index is unknown. 
	* @method Block#removeball
	* @param {Ball} _ball - The ball that should be removed. 
	* @param {integer} index - The index of the ball in the ballList. -1 if unknown. 
	*/
	removeBall: function(_ball, index){
		if(this.socket){
			this.socket.emit("removeBall", _ball.getGlobalID())
		}

		if(index == -1){
			this.ballsList.splice(this.getBallIndex(_ball), 1);
		}else{
			this.ballsList.splice(index, 1);
		}		
	},

	/**
	* A search method, which returns the index of the ball in the ballsList.
	* The balls are compared on GlobalID. 
	* @method Block#getBallIndex
	* @param {Ball} _ball - The ball that should be found. 
	* @return {integer} - the index of the ball, or -1 if the ball is not found. 
	*/
	getBallIndex: function(_ball){
		for(var j = 0; j < this.ballsList.length; j++){
			if(this.ballsList[j].getGlobalID() == _ball.getGlobalID()){
				return j;
			}
		}
		return -1;
	},

	getReadyForDeletion: function(_direction, _opposite){
		if(this.hasNeighbour(_direction)){
			this.neighbours[_direction].updatePosition(this.position.left, this.position.top);
			this.prepareBallsForDeletion(_direction)
			this.neighbours[_direction].setNeighbour(_opposite, this.neighbours[_opposite]);
		}else{
			this.prepareBallsForDeletion(_opposite)
			this.neighbours[_opposite].setNeighbour(_direction, undefined);
		}


	},


	prepareBallsForDeletion: function(direction){
		this.ballsList.forEach(function(b){
			//Kan problemen veroorzaken misschien ofzo.
				b.setPosition(this.neighbours[direction].getPosition().left + ball.getRadius()
						, this.neighbours[direction].getPosition().top + ball.getRadius())
				
				this.neighbours[direction].ballIncoming(b);
		}, this);
	},

	/**
	* Change the current Socket. Emit the canvasPosition and send all
	* balls which are currently in this block to the player.
	* @method Block#setSocket
	* @param {Socket} _socket - The ball that should be found. 
	* @return {integer} - the index of the ball, or -1 if the ball is not found. 
	*/
	setSocket: function(_socket){
		this.socket = _socket;
		this.socket.emit('canvasPos', {left: this.position.left, top: this.position.top});

		//Send all balls in block to player
		for(var i = 0; i < this.ballsList.length; i++){
			this.sendNewBallToPlayer(this.ballsList[i]);
		}
	},

	setPlayer: function(_player){
		this.player = _player;
	},

	/**
	* Change the postion of the block. WARNING: This function also updates 
	* the position of all the balls. 
	* @method Block#updatPosition
	* @param {number} x - The new x position.
	* @param {number} y - The new y position 
	*/
	updatePosition: function(x, y){
		var dx = x - this.position.left;
		var dy = y - this.position.right;

		this.ballsList.forEach(function(b){
			b.setPosition(b.getPosition().x + dx, b.getPosition().y + dy)
		});

		this.player.updatePosition(x + S.canvasWidth/2, y + S.canvasHeight/2)

		this.position.left += dx
		this.position.right += dy

		if(this.socket) this.socket.emit('canvasPos', {left: this.position.left, top: this.position.top});
	},

	/**
	* Remove the current player by setting it to false. 
	* @method Block#removePlayer
	*/
	removePlayer: function(){
		this.socket = false;
		this.player = false;
	},

	hasPlayer: function(){
		return this.socket != false;
	},

	hasNeighbour: function(_direction){
		return this.neighbours[_direction] != undefined;
	},

	hasBall: function(_ball){
		return this.getBallIndex(_ball) != -1;
	},

	getPosition: function(){
		return this.position;
	},

	getPlayer: function(){
		return this.player;
	},

	getSocket: function(){
		return this.socket;
	},

	/**
	* Emits the message playAudio to a player. If the player receives this 
	* message audio will be played. 
	* @method Block#removePlayer
	*/
	playAudio: function(){
		if(this.socket){
			this.socket.emit("playAudio", "ballCollision")
		}
	},

	getBallsList: function(){
		return this.ballsList;
	}

});

if(typeof module != 'undefined'){
    module.exports = Block;
}
