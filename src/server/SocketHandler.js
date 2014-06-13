var Ball = require('../common/game/gameobjects/Ball.js');

var handleCollision = require('../common/game/CollisionDetection.js');
var Game = require('../common/game/Game.js');
var CoreGame = require('../common/game/CoreGame.js');

var Client = require('../common/Client.js');
var e = require('../common/Enums.js');
var S = require('../common/Settings.js');


function SocketHandler(_server, _io){
	var server = _server;
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var debug;
	// var timer = new RandomTimer(S.minTime, S.maxTime);
	var oldranking = [];
	var clientSockets = {};

	//Handles mainscreen connection and listeners
	this.setMainScreenListeners = function(socket){
		mainScreenSocket = socket;

		socket.on('screenSizeMainScreen', function (data){
			server.setMaxGameSize(data);
		});

		socket.on('disconnect', function (data){
			console.log('MainScreen disconnected');
			mainScreenSocket = {emit: function(){false}};
		});
	};

	//Updates the mainscreen canvassize
	this.updateMainScreenCanvasSize = function(size){
		mainScreenSocket.emit("updateCanvasSize", size);
	};

	//Handles player connection and listeners
	this.handlePlayerConnection = function(socket){
		clientSockets[socket.id] = socket;
		//Ask for userName
		socket.emit('userName', false);

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
			mainScreenSocket.emit('updateShieldAngle', server.setAngle(socket, angle));
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

	//Adds a new player (+ all other stuff belonging to a player) to the mainscreen
	this.newPlayer = function(socketID, np) {
		mainScreenSocket.emit('newPlayer', np);
		clientSockets[socketID].emit('newPlayer', np.gpid);
		mainScreenSocket.emit('newBall', {color: np.color, gid: np.gid}); //inform mainscreen of new ball
	};




	//Update function
	this.update = function(){
		//Update Balls is done in Block
		server.update();
		updateBalls();
		updatePoles();
	};

	//Opgedeelde update functies
	updateBalls = function() {
		//TODO: ID instead of index
		for(var i = 0; i < server.nrOfBalls(); i++){
			mainScreenSocket.emit(e.updateBall, server.getBallPosition(i), i)
		}
	};


	updatePoles = function() {
		//Call isHit() when a pole is hit and send this event to the player
		for(var i = 0; i < server.getNumberOfPlayers(); i++){
			var pole = server.getGroup("Poles").getMember(i);
			var player = server.getGroup("Players").getMemberByGlobalID(pole.getHitBy());
			if(pole.hit){
				incrementScore(player, pole);
				pole.isHit();
				hitEmit(pole);
			}
		}
	};

	//Emit to mainscreen and player if he is hit + update highscore accordingly
	hitEmit = function(_pole){
		mainScreenSocket.emit('poleIsHit', _pole.player.getGlobalID());
		server.getSocketFromPlayerID(_pole.player.getID()).emit('poleIsHit', true);
		server.getSocketFromPlayerID(_pole.player.getID()).emit('updateHighscore');
	};

	//Increments score when a player hits another player
	incrementScore = function (_player, _pole) {
		if(_player != -1) { 
			if(_player.getGlobalID() != _pole.player.getGlobalID()) { //check if the player doesn't hit himself 
				_player.incrementScore(_pole.player.getPoints()); //Increment score 
				server.getSocketFromPlayerID(_player.getID()).emit('updateScoreHit', _pole.player.getPoints());
			}
		}
	};

	//Returns a list of the players with their highscores
	getScores = function(){
		var temp = [];
		//Retrieve the highest scores of all the players
		for(var i = 0; i < server.getNumberOfPlayers(); i++){
			var player = server.getGroup("Players").getMember(i);
			var score = Math.max(player.getScore(), player.getHighscore());
			temp.push({ Score: score, Name: player.name, ID: player.getGlobalID() });
		}
		return temp;
	};

	//Updates the highscores on the mainscreen + informs players when they are in the top x
	this.updateScores = function(){
		var highScores = getScores();
		
		if(highScores.length > 0){
			var serializedScores = JSON.stringify(highScores);
			var hs = JSON.parse(serializedScores);
			//Sort the scores (highest to lowest)
			hs.sort(function(a, b) {return b.Score - a.Score;});

			//Send current highscore list to the mainscreen
			mainScreenSocket.emit('updateScores', hs);		
			reviseTop(hs.splice(0, S.highScore.top)); 
		}
	};

	reviseTop = function(_top){
		var newRanking = [];
		//Retrieve the id's of the top players
		for(i = 0; i < _top.length; i++){
			newRanking.push(_top[i].ID);
		}
		//TODO: oldhs kan hier nu toch uit? wordt namelijk niet meer gebruikt nu alles gewoon teruggezet wordt.
		data = { newhs: newRanking, oldhs: oldranking };

		mainScreenSocket.emit('updateTop', data);
		io.of('/player').emit('updateTop', data);
		server.updateHighscore(data);
		
		oldranking = newRanking;
	};



	this.hasMainScreen = function(){ return mainScreenSocket.emit(); };

	



	//Removes player from mainscreen
	removeFromMainScreen = function(socketID){ mainScreenSocket.emit('removePlayer', socketID); };


	
	//Adds a new powerup to the user
	this.newPowerup = function(){
		io.of('/player').emit('addPowerup', server.addPowerup());
	};



};

if(typeof module != 'undefined'){
    module.exports = SocketHandler;
}
