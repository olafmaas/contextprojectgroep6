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
	var Group = require('../../game/Group.js');
	var handleCollision = require('../../game/CollisionDetection.js');
}

function DrawHandler(_io){
	var io = _io;
	var mainScreenSocket = {emit:function(){false}} //If the mainscreen is not instantiated this function is used;

	this.setMainScreenSocket = function(ms){
		mainScreenSocket = ms;
	}

	this.drawToPlayers = function(ball){
		io.of('/player').emit('UpdateBall', ball.getPosition());
		io.of('/player').emit('UpdateBallAngle', ball.getBody().getVelocityDirection());
	}

	this.drawToMainScreen = function(ballpos){
		mainScreenSocket.emit('drawBall', ballpos)
	}
}

if(typeof module != 'undefined'){
    module.exports = DrawHandler;
}