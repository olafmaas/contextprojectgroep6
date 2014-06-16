var Ball = require('../common/game/gameobjects/Ball.js');
var handleCollision = require('../common/game/CollisionDetection.js');

var Client = require('../common/Client.js');
var e = require('../common/Enums.js');

function SocketHandler(_io){
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var clientSockets = {};	//Used as a hashmap with socketID as key and socket as value

	//Handles mainscreen connection and listeners
	this.setMainScreenListeners = function(socket, serverGame){
		mainScreenSocket = socket;

		socket.on('disconnect', function (data){
			console.log('MainScreen ' + data);
			mainScreenSocket = {emit: function(){false}};
		});
	};

	//Handles player connection and listeners
	this.setClientListeners = function(socket, serverGame){
		clientSockets[socket.id] = socket;

		socket.on('userName', function (name){
			var checkName = name.toLowerCase();
			if(serverGame.isNameAvailable(checkName)){
				serverGame.addClient(socket.id, socket);
				serverGame.registerName(checkName, socket.id);
				socket.emit('showPlayerName', name); //Set the normal name (with uppercases) to the player

				socket.on('shieldAngle', function (_angle){ //dit staat hier omdat hier pas naar geluisterd moet worden nadat de player is aangemaakt
					serverGame.setAngle(socket.id, _angle);
					mainScreenSocket.emit('updateShieldAngle', {id: socket.id, angle: _angle});
				});
			}else{
				console.log('Username already in use');
				socket.emit('userNameInUse');
			}
		});



		socket.on('powerupClicked', function (_playerID, _powerupType){
			serverGame.setPowerup(_playerID, _powerupType);
			mainScreenSocket.emit('powerupClicked', _playerID, _powerupType);
		});

		socket.on('disconnect', function (data){ 
			console.log('Client ' + data);
			serverGame.deleteClient(socket.id);
			mainScreenSocket.emit('removePlayer', socket.id);
		});
	};

	///////////////
	// NEW EMITS //
	///////////////

	//Adds a new player (+ all other stuff belonging to a player) to the mainscreen
	this.newPlayer = function(socketID, np) {
		mainScreenSocket.emit('newPlayer', np);
		clientSockets[socketID].emit('newPlayer', np.gpid);
	};

	this.newBall = function(_ball) {
		mainScreenSocket.emit('newBall', {color: _ball.getColor(), gid: _ball.getGlobalID()}); //inform mainscreen of new ball
	};

	//Adds a new powerup to the user
	this.newPowerup = function(data){
		io.of('/player').emit('addPowerup', data);
	};

	//////////////////
	// UPDATE EMITS //
	//////////////////

	this.updateBallMainscreen = function(pos, i){
		mainScreenSocket.emit(e.updateBall, pos, i);
	};

	//Updates the mainscreen canvassize
	this.updateMainScreenCanvasSize = function(size){
		mainScreenSocket.emit("updateCanvasSize", size);
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
	};
	
	this.updateTop = function(data){
		mainScreenSocket.emit('updateTop', data);
		io.of('/player').emit('updateTop', data);
	};

	//////////////////
	// REMOVE EMITS //
	//////////////////

	this.removeBall = function(globalBallID){
		mainScreenSocket.emit('removeBall', globalBallID);			
	};


	//Used by server.js when a new mainScreen tries to connect.
	this.hasMainScreen = function(){
		return mainScreenSocket.emit();
	};

};

module.exports = SocketHandler;
