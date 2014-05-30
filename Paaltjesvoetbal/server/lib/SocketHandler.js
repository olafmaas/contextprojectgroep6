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
	var DrawHandler = require('./DrawHandler.js');
}

function SocketHandler(_server, _io){
	var dh = new DrawHandler(_io);
	var server = _server;
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var debug;

	this.handleMainScreen = function(socket){
		mainScreenSocket = socket;
		dh.setMainScreenSocket(socket);

		updateMainScreenCanvasSize();

		socket.on('screenSizeMainScreen', function (data){
			server.setMaxGameSize(data)
		});

		socket.on('disconnect', function (data){
			server.log('MainScreen disconnected');
			mainScreenSocket = {emit: function(){false}};
		});
	}

	this.hasMainScreen = function(){
		return mainScreenSocket.emit();
	}

	this.handlePlayerConnection = function(socket){
		
		socket.emit('userName', false);
		newPlayer(socket);

		//Add player to grid
		res = server.updateGrid(socket);
		updateMainScreenCanvasSize();
		socket.emit('canvasPos', res);

		socket.on('userName', function (name){
			if(server.isNameAvailable(name)){
				server.registerName(name, socket.id);
			}else{
				server.log('Username already in use');
				socket.emit('userName', false);
			}
		});

		socket.on('shieldAngle', function (angle){
			mainScreenSocket.emit('drawShield', server.setAngle(socket,angle));
		});


		socket.on('ballAngle', function (velocityDirection){
			dh.drawToPlayers(server.ballAngle(socket, velocityDirection));
		});

		socket.on('disconnect', function (data){
			server.log('Player disconnected');
			server.deleteClient(socket);
		});
	}

	newPlayer = function(socket){
		mainScreenSocket.emit('newPlayer',server.addClient(socket));
		mainScreenSocket.emit('BallAdded');
	}

	updateMainScreenCanvasSize = function(){
		mainScreenSocket.emit("newCanvasSize", server.updateMainScreenCanvasSize());
	}

	this.update = function(){
		server.update();
		if(server.checkGroupCollision("Poles")){
			for(var i = 0; i < server.nrOfBalls(); i++){
				dh.drawToPlayers(server.getBall(i), i);	//when a pole collides with a ball the player is notified to change te ball direction
			}
		}
		if(server.checkWorldBounds("Balls")){
			for(var i = 0; i < server.nrOfBalls(); i++){
				dh.drawToPlayers(server.getBall(i), i);	//when a ball collides with a worldbounds the player is notified to change te ball direction
			}
		}

		for(var i = 0; i < server.nrOfBalls(); i++){
			dh.drawToMainScreen(server.getBallPosition(i), i);	
		}
	}


}

if(typeof module != 'undefined'){
    module.exports = SocketHandler;
}
