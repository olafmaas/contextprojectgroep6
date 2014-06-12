if(typeof module != 'undefined'){
	var RandomTimer = require('../common/game/time/RandomTimer');
	var Ball = require('../common/game/gameobjects/Ball.js');

	var handleCollision = require('../common/game/CollisionDetection.js');
	var Game = require('../common/game/Game.js');
	var CoreGame = require('../common/game/CoreGame.js');

	var Client = require('../common/Client.js');
	var e = require('../common/Enums.js');
	var S = require('../common/Settings.js');
}

function SocketHandler(_server, _io){
	var server = _server;
	var io = _io;
	var mainScreenSocket = {emit:function(){false}}; //If the mainscreen is not instantiated this function is used;
	var debug;
	var timer = new RandomTimer(S.minTime, S.maxTime);
	var oldranking = [];

	//Update function
	this.update = function(){
		//Update Balls is done in Block
		server.update();
		updateBalls();
		updatePowerups();
		updatePoles();
	};

	//Opgedeelde update functies
	updateBalls = function() {
		//TODO: ID instead of index
		for(var i = 0; i < server.nrOfBalls(); i++){
			mainScreenSocket.emit(e.updateBall, server.getBallPosition(i), i)
		}
	};

	updatePowerups = function() {
		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//TODO: timer eerder af laten lopen als er meer spelers zijn, dus settings aanpassen, of
		//iets van settings - x * aantalSpelers doen ofzo, zodat het iig wat sneller wordt of het interval kleiner.
		if(timer != null && timer.hasStopped()){
			timer = null;

			newPowerup();

			timer = new RandomTimer(S.minTime, S.maxTime); //start a new timer for the next powerup
			timer.startTimer();
		}
	};

	updatePoles = function() {
		//Call isHit() when a pole is hit and send this event to the player
		for(var i = 0; i < server.getNumberOfPlayers(); i++){
			var pole = server.getGroup("Poles").getMember(i);
			var player = server.getGroup("Players").getMemberByGlobalID(pole.getHitBy());
			if(pole.hit){
				//TODO: nog ervoor zorgen dat een speler geen punten krijgt als hij zichzelf raakt!
				if(player != -1) { 
					player.incrementScore(pole.player.getPoints()); //Increment score 
					server.getSocketFromPlayerID(player.getID()).emit('updateScoreHit', pole.player.getPoints());
				}
				pole.isHit();
				mainScreenSocket.emit('poleIsHit', pole.player.getGlobalID());
				server.getSocketFromPlayerID(pole.player.getID()).emit('poleIsHit', true);
				server.getSocketFromPlayerID(pole.player.getID()).emit('updateHighscore');
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
		data = { newhs: newRanking, oldhs: oldranking };

		mainScreenSocket.emit('updateTop', data);
		io.of('/player').emit('updateTop', data);
		server.updateHighscore(data);
		
		oldranking = newRanking;
	};

	//Handles mainscreen connection and listeners
	this.handleMainScreen = function(socket){
		mainScreenSocket = socket;

		timer.startTimer(); //Start powerup timer when the mainscreen is connected.

		updateMainScreenCanvasSize();

		setInterval(this.updateScores, S.highScore.updateInterval);

		socket.on('screenSizeMainScreen', function (data){
			server.setMaxGameSize(data)
		});

		socket.on('disconnect', function (data){
			console.log('MainScreen disconnected');
			mainScreenSocket = {emit: function(){false}};
		});
	};

	this.hasMainScreen = function(){ return mainScreenSocket.emit(); };

	//Handles player connection and listeners
	this.handlePlayerConnection = function(socket){
		
		//Ask for userName
		socket.emit('userName', false);

		socket.on('userName', function (name){
			if(server.isNameAvailable(name)){
				playerConnection(socket);
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

	playerConnection = function(socket){
		//Add player to grid
		newPlayer(socket);
		updateMainScreenCanvasSize();
	}

	//Removes player from mainscreen
	removeFromMainScreen = function(socketID){ mainScreenSocket.emit('removePlayer', socketID); };

	//Adds a new player (+ all other stuff belonging to a player) to the mainscreen
	newPlayer = function(socket, polePos){
		var np = server.addClient(socket, polePos);
		mainScreenSocket.emit('newPlayer', np);
		socket.emit('newPlayer', np.gpid);
		mainScreenSocket.emit('newBall', {color: np.color, gid: np.gid}); //inform mainscreen of new ball
		return 
	};
	
	//Adds a new powerup to the user
	newPowerup = function(){
		io.of('/player').emit('addPowerup', server.addPowerup());
	};

	//Updates the mainscreen canvassize
	updateMainScreenCanvasSize = function(){
		mainScreenSocket.emit("updateCanvasSize", server.updateMainScreenCanvasSize());
	};

};

if(typeof module != 'undefined'){
    module.exports = SocketHandler;
}
