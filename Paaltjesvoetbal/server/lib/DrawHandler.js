if(typeof module != 'undefined'){
	var Log = require('./LogHandler.js');
	var Settings = require('./Settings.js');
	var GameGrid = require('./GameGrid.js');
	var GroupManager = require('./GroupManager.js');
	var PlayerFactory = require('./PlayerFactory.js');
	var Game = require('../../game/Game.js');
	var CoreGame = require('../../game/CoreGame.js');
	var Ball = require('../../game/Ball.js');
	var Pole = require('../../game/Pole.js');
	var Shield = require('../../game/Shield.js');
	var Player = require('../../game/Player.js');
	var Group = require('../../game/util/Group.js');
	var handleCollision = require('../../game/CollisionDetection.js');
	var e = require('../../game/util/Enums.js');
}

function DrawHandler(_io){
	var io = _io;
	var mainScreenSocket = {emit:function(){false}} //If the mainscreen is not instantiated this function is used;

	this.setMainScreenSocket = function(ms){
		mainScreenSocket = ms;
	}

	//TODO: ID instead of index
	this.drawToPlayers = function(ball, index){
		io.of('/player').emit(e.updateBall, ball.getPosition(), index);
	}

	//TODO: ID instead of index
	this.drawToMainScreen = function(ballpos, index){
		mainScreenSocket.emit(e.updateBall, ballpos, index)
	}

	//Emit message of how many balls are currently present 
	//For people that are already connected this means an extra ball has been added
	//For people that are connecting, this indicates how many balls are currently in the game and should be created locally.
	this.ballAdded = function(nr, colors){
		io.of('/player').emit('newBall', nr, colors);
	}

}

if(typeof module != 'undefined'){
    module.exports = DrawHandler;
}