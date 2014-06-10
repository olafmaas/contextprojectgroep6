if(typeof module != 'undefined'){
	//var Group = require('../common/game/util/Group.js');
	var RandomTimer = require('../common/game/time/RandomTimer');
	var Ball = require('../common/game/gameobjects/Ball.js');
	var Pole = require('../common/game/gameobjects/Pole.js');
	var Shield = require('../common/game/gameobjects/Shield.js');
	var Player = require('../common/game/gameobjects/Player.js');
	var Powerup = require('../common/game/gameobjects/Powerup.js');

	var handleCollision = require('../common/game/CollisionDetection.js');
	var Game = require('../common/game/Game.js');
	var CoreGame = require('../common/game/CoreGame.js');

	var Client = require('../common/Client.js');
	var e = require('../common/Enums.js');
	var S = require('../common/Settings.js');

	var GroupManager = require('./util/GroupManager.js');
	var GameGrid = require('./grid/GameGrid.js');
	var PlayerFactory = require('./factory/PlayerFactory.js');
	var BallFactory = require('./factory/BallFactory.js');
}

function SocketHandler(_server, _io){
	var server = _server;
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var debug;
	var timer = new RandomTimer(S.minTime, S.maxTime);
	var oldranking = [];

	this.handleMainScreen = function(socket){
		mainScreenSocket = socket;

		timer.startTimer(); //Start powerup timer when the mainscreen is connected.

		updateMainScreenCanvasSize();

		setInterval(this.updateScores, 5000);

		socket.on('screenSizeMainScreen', function (data){
			server.setMaxGameSize(data)
		});

		socket.on('disconnect', function (data){
			console.log('MainScreen disconnected');
			mainScreenSocket = {emit: function(){false}};
		});
	};

	this.hasMainScreen = function(){
		return mainScreenSocket.emit();
	};

	this.handlePlayerConnection = function(socket){
		
		//Ask for userName
		socket.emit('userName', false);

		//Add player to grid
		newPlayer(socket);

		updateMainScreenCanvasSize();
		

		socket.on('userName', function (name){
			if(server.isNameAvailable(name)){
				server.registerName(name, socket.id);
				socket.emit('showPlayerName');
			}else{
				console.log('Username already in use');
				socket.emit('userName', false);
			}
		});

		socket.on('shieldAngle', function (angle){
			mainScreenSocket.emit('updateShieldAngle', server.setAngle(socket,angle));
		});

		socket.on('powerupClicked', function (_playerID, _powerupType){
			server.setPowerup(_playerID, _powerupType);
			mainScreenSocket.emit('powerupClicked', _playerID, _powerupType);
		});

		socket.on('disconnect', function (data){
			console.log('Player disconnected - id: ' + socket.id);
			removeFromMainScreen(socket.id);

			gid = server.deleteClient(socket.id);
			mainScreenSocket.emit('removeBall', gid);
			
		});
	};

	removeFromMainScreen = function(socketID){
		mainScreenSocket.emit('removePlayer', socketID);
	};

	newPlayer = function(socket, polePos){
		var np = server.addClient(socket, polePos);
		mainScreenSocket.emit('newPlayer', np);
		socket.emit('newPlayer', np.gpid);
		mainScreenSocket.emit('newBall', {color: np.color, gid: np.gid}); //inform mainscreen of new ball

		return 
	};
	
	newPowerup = function(){
		io.of('/player').emit('addPowerup', server.addPowerup());
	};

	updateMainScreenCanvasSize = function(){
		mainScreenSocket.emit("updateCanvasSize", server.updateMainScreenCanvasSize());
	};

	this.update = function(){
		//Update Balls is done in Block
		server.update();

		//TODO: ID instead of index
		for(var i = 0; i < server.nrOfBalls(); i++){
			mainScreenSocket.emit(e.updateBall, server.getBallPosition(i), i)
		}

		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//TODO: timer eerder af laten lopen als er meer spelers zijn, dus settings aanpassen, of
		//iets van settings - x * aantalSpelers doen ofzo, zodat het iig wat sneller wordt of het interval kleiner.
		if(timer != null && timer.hasStopped()){
			timer = null;

			newPowerup();

			timer = new RandomTimer(S.minTime, S.maxTime); //start a new timer for the next powerup
			timer.startTimer();
		}

		//Call isHit() when a pole is hit and send this event to the player
		for(var i = 0; i < server.getNumberOfPlayers(); i++){
			var pole = server.getGroup("Poles").getMember(i);
			if(pole.hit){
				server.getGroup("Poles").getMember(i).isHit();
				server.getSocketFromPlayerID(pole.player.getID()).emit('poleIsHit', true);
			}
		}
	};

	this.updateScores = function(){
		var highScores = [];
		var top5 = [];
		
		for(var i = 0; i < server.getNumberOfPlayers(); i++){
			var player = server.getGroup("Players").getMember(i);
			var score = Math.max(player.getScore(), player.getHighscore());
			highScores.push({ Score: score, Name: player.name, ID: player.getGlobalID() });
		}

		if(highScores.length > 0){
			var serializedScores = JSON.stringify(highScores);
			var hs = JSON.parse(serializedScores);
			hs.sort(function(a, b) {return b.Score - a.Score;});

			mainScreenSocket.emit('updateScores', hs);
			reviseTop5(hs.splice(0, 5), oldranking); //only send top 5 (or less for testing!)
		}
	}

	reviseTop5 = function(hs, old){
		
		//So only the ID's are sent
		var newranking = [];
		for(i = 0; i < hs.length; i++){
			newranking.push(hs[i].ID);
		}
		
		data = { newhs: newranking, oldhs: old };
		mainScreenSocket.emit('updateTop', data);
		oldranking = newranking;
	};
};

if(typeof module != 'undefined'){
    module.exports = SocketHandler;
}
