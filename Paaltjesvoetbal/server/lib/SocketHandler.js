if(typeof module != 'undefined'){
	var logHandler = require('./LogHandler.js');
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
	var DrawHandler = require('./DrawHandler.js');
	var e = require('../../game/util/Enums.js');
	var RandomTimer = require('../../game/util/RandomTimer');
}

function SocketHandler(_server, _io){
	var dh = new DrawHandler(_io);
	var server = _server;
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var debug;
	var settings = new Settings();
	var timer = new RandomTimer(settings.minTime, settings.maxTime);

	this.handleMainScreen = function(socket){
		mainScreenSocket = socket;
		dh.setMainScreenSocket(socket);

		timer.startTimer(); //Start powerup timer when the mainscreen is connected.

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

		//Add player to grid
		res = server.updateGrid(socket);
		newPlayer(socket, res);

		updateMainScreenCanvasSize();
		socket.emit('canvasPos', res);

		socket.on('userName', function (name){
			if(server.isNameAvailable(name)){
				server.registerName(name, socket.id);
				socket.emit('showPlayerName');
			}else{
				server.log('Username already in use');
				socket.emit('userName', false);
			}
		});

		socket.on('shieldAngle', function (angle){
			mainScreenSocket.emit('updateShieldAngle', server.setAngle(socket,angle));
		});


		socket.on('disconnect', function (data){
			server.log('Player disconnected - id: ' + socket.id);
			removeFromMainScreen(socket.id);

			gid = server.deleteClient(socket.id);
			mainScreenSocket.emit('removeBall', gid);
			
		});
	};

	removeFromMainScreen = function(socketID){
		mainScreenSocket.emit('removePlayer', socketID);
	}

	newPlayer = function(socket, polePos){
		var np = server.addClient(socket, polePos);
		mainScreenSocket.emit('newPlayer', np);
		io.of('/player').emit('newPlayer', np);

		var colors = server.getBallColors();
		mainScreenSocket.emit('newBall', {color: colors[colors.length-1], gid: np.gid}); //inform mainscreen of new ball
		dh.ballAdded(server.nrOfBalls(), colors); //inform players of new ball(s)
	}
	
	newPowerup = function(){
		io.of('/player').emit('addPowerup', server.addPowerup());
	}

	updateMainScreenCanvasSize = function(){
		mainScreenSocket.emit("updateCanvasSize", server.updateMainScreenCanvasSize());
	}

	this.update = function(){
		server.update();

		//TODO: ID instead of index
		for(var i = 0; i < server.nrOfBalls(); i++){
			dh.drawToMainScreen(server.getBallPosition(i), i);	
			dh.drawToPlayers(server.getBall(i), i);	
		}

		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//TODO: timer eerder af laten lopen als er meer spelers zijn, dus settings aanpassen, of
		//iets van settings - x * aantalSpelers doen ofzo, zodat het iig wat sneller wordt of het interval kleiner.
		if(timer != null && timer.hasStopped()){
			timer = null;

			newPowerup();

			timer = new RandomTimer(settings.minTime, settings.maxTime); //start a new timer for the next powerup
			timer.startTimer();
		}

	}


}

if(typeof module != 'undefined'){
    module.exports = SocketHandler;
}
