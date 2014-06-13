var Ball = require('../common/game/gameobjects/Ball.js');
var handleCollision = require('../common/game/CollisionDetection.js');

var Client = require('../common/Client.js');
var e = require('../common/Enums.js');

function SocketHandler(_io){
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var clientSockets = {};

	//Handles mainscreen connection and listeners
	this.setMainScreenListeners = function(socket, serverGame){
		mainScreenSocket = socket;

		socket.on('screenSizeMainScreen', function (data){
			serverGame.setMaxGameSize(data);
		});

		socket.on('disconnect', function (data){
			console.log('MainScreen disconnected');
			mainScreenSocket = {emit: function(){false}};
		});
	};

	//Handles player connection and listeners
	this.handlePlayerConnection = function(socket, serverGame){
		clientSockets[socket.id] = socket;
		//Ask for userName
		socket.emit('userName', false);

		socket.on('userName', function (name){
			if(serverGame.isNameAvailable(name)){
				serverGame.registerName(name, socket.id);
				socket.emit('showPlayerName');
			}else{
				console.log('Username already in use');
				socket.emit('userName', false);
			}
		});

		socket.on('shieldAngle', function (angle){
			mainScreenSocket.emit('updateShieldAngle', serverGame.setAngle(socket, angle));
		});

		socket.on('powerupClicked', function (_playerID, _powerupType){
			serverGame.setPowerup(_playerID, _powerupType);
			mainScreenSocket.emit('powerupClicked', _playerID, _powerupType);
		});

		socket.on('disconnect', function (data){
			console.log('Player disconnected - id: ' + socket.id);
			removeFromMainScreen(socket.id);

			gid = serverGame.deleteClient(socket.id);
			mainScreenSocket.emit('removeBall', gid);	
		});
	};

	//Adds a new player (+ all other stuff belonging to a player) to the mainscreen
	this.newPlayer = function(socketID, np) {
		mainScreenSocket.emit('newPlayer', np);
		clientSockets[socketID].emit('newPlayer', np.gpid);
		mainScreenSocket.emit('newBall', {color: np.color, gid: np.gid}); //inform mainscreen of new ball
	};

	//Updates the mainscreen canvassize
	this.updateMainScreenCanvasSize = function(size){
		mainScreenSocket.emit("updateCanvasSize", size);
	};

	this.updateBallMainscreen = function(pos, i){
		mainScreenSocket.emit(e.updateBall, pos, i);
	};

	//Emit to mainscreen and player if he is hit + update highscore accordingly
	this.hitEmit = function(socket, poleID){
		mainScreenSocket.emit('poleIsHit', poleID);
		socket.emit('poleIsHit', true);
		socket.emit('updateHighscore');
	};

	this.updateScoreHit = function(socket, score){
		socket.emit('updateScoreHit', score);
	};

	this.updateScoresMainScreen = function(hs){
		mainScreenSocket.emit('updateScores', hs);	
	}
	
	this.updateTop = function(data){
		mainScreenSocket.emit('updateTop', data);
		io.of('/player').emit('updateTop', data);
	}

	this.hasMainScreen = function(){ return mainScreenSocket.emit(); };

	//Removes player from mainscreen
	removeFromMainScreen = function(socketID){ mainScreenSocket.emit('removePlayer', socketID); };

	//Adds a new powerup to the user
	this.newPowerup = function(data){
		io.of('/player').emit('addPowerup', data);
	};

};

module.exports = SocketHandler;
