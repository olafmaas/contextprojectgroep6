if(typeof module != 'undefined'){
	var Group = require('../common/game/util/Group.js');
	var GroupManager = require('../common/game/util/GroupManager.js');
	var Powerup = require('../common/game/gameobjects/Powerup.js');
	var CoreGame = require('../common/game/CoreGame.js');
	var RandomTimer = require('../common/game/time/RandomTimer.js');

	var Client = require('../common/Client.js');
	var S = require('../common/Settings.js');

	var HighScores = require('./game/HighScores.js');
	var GameGrid = require('./grid/GameGrid.js');
	var pf = require('./factory/PlayerFactory.js');
	var bf = require('./factory/BallFactory.js');
}

function ServerGame(_socketHandler){
	var sh = _socketHandler;
	var game;
	var clientList = {};
	var playerIDs = {};	//used as a hashmap playerGlobalIDs are keys, socketID as value
	var removalTimers = {}; //used as a hashmap, player names are keys, timer id's as values

	var gameGrid = new GameGrid();
	var activeClients = [];
	var namesList = [];
	var timer = null;	//needed for powerups.

	this.createGame = function(_initialize, _update, _width, _height){
		game = new CoreGame(_initialize, _update, _width, _height)
	}

	this.loadContent = function(){};

	this.update = function(){ 
		updateBalls();
		updatePowerups();
		updatePoles();
		gameGrid.update();
	};

	this.addMainScreen = function(){
		sh.updateMainScreenCanvasSize(updateGameSize());
		if(getNumberOfPlayers() > 0){
			reconnectMainScreen();
		} else {
			setInterval(updateScores, S.highScore.updateInterval);	//updates the highscores on the mainscreen on interval
		}
	};

	updatePowerups = function() {
		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//Depending on the amount of players, the spawn time between powerups will go down.
		if(timer != null && timer.hasStopped()){
			timer = null;
			sh.newPowerup(getRandomPlayerSocketID());
			
			if(timer == null && getNumberOfPlayers() > 0){
				timer = new RandomTimer(Math.max(1, S.minTime/getNumberOfPlayers()), Math.max(1, S.maxTime/getNumberOfPlayers())); //start a new timer for the next powerup
				timer.startTimer();
			}
		}
	};
	
	getRandomPlayerSocketID = function(){
		var index = Math.floor(Math.random()*getNumberOfPlayers());
		var member = GroupManager.getGroup("Player").getMember(index);
		
		if(member != undefined && member != null){
			return playerIDs[member.getGlobalID()];
		}
	};

	//Get the player count
	this.getPlayerCount = function(){
		var count = 0;

		for(var gid in clientList){
			if(clientList[gid] !== undefined) count++;
		}

		return count;
	}
	
	/**
	* Add a new client, create a new player, pole and shield. 
	* @method Server#addClient
	* @param {socket} The socket associated with the player. 
	*/
	this.addClient = function(socketID, socket){
		var player = addObjects(socket);
		
		clientList[socketID] = new Client(socket, player, player.getPole(), player.getShield());
		playerIDs[player.getGlobalID()] = socketID;

		updatePowerupInterval();

		var res = {id: socketID, polePos: clientList[socketID].pole.getPosition(), gpid: player.getGlobalID()};

		sh.updateMainScreenCanvasSize(updateGameSize());
		sh.newPlayer(socketID, res);

		//Check if there was a timer present, if so: remove it
		if(removalTimers[player.getName()])
			clearTimeout(removalTimers[player.getName()]);
	};

	this.deleteClient = function(socketID){
		var client = clientList[socketID];
		deleteObjects(client);
	
		namesList[client.player.getName()] = client.player.getHighscore(); //retrieve highscore and save it. name stays in nameList because it has to stay in the highscore
		delete activeClients[client.player.getName()]; //remove from active clients list
		delete clientList[socketID]; 

		var nOfPlayers = getNumberOfPlayers()
		gameGrid.cleanUp()
		sh.updateMainScreenCanvasSize(updateGameSize());

		//Start removal timer for the highscore
		var t = setTimeout(function() { removeHighscore(client.player.getName()); }, S.highScore.removalTime );
		//Save the timer
		removalTimers[client.player.getName()] = t;
	};

	//Removes the highscore belonging to the player with name _name
	function removeHighscore(_name){
		namesList[_name] = 0; //set highscore to 0
	}

	function addObjects(socket){
		var ballList = [];

		for(var i = 0; i < nofBallsToBeAdded(); i++){
			var newBall = game.instantiate(bf.createNewBall(S.ball.size))
			ballList.push(newBall);
		}	

		var positionOfPole = gameGrid.updateGrid(socket, ballList)
		var player = game.instantiate(pf.createPlayer(positionOfPole, socket.id, sh.updatePlayerOnMainscreen, sh));
		gameGrid.setPlayer(positionOfPole.left, positionOfPole.top , player);

		game.instantiate(player.getPole());
		game.instantiate(player.getShield());

		ballList.forEach(function(b){
			sh.newBall(b);
		})

		return player;
	};

	function deleteObjects(client){
		var members = GroupManager.getGroup("Ball").getMembers();
		var slice = members.slice(-nofBallsToBeRemoved());

		slice.forEach(function(b){
			GroupManager.getGroup("Ball").removeMember(b)
			game.remove(b);
			gameGrid.removeBall(b)	
			sh.removeBall(b.getGlobalID());
		})

		game.remove(client.pole);
		game.remove(client.shield);
		game.remove(client.player);
		gameGrid.remove(client.socket.id);
	};

	function updateScores(){
		var hs = HighScores.updateScores();
		sh.updateScoresMainScreen(hs);
		if(hs)
			sh.updateTop(HighScores.reviseTop(hs.splice(0, S.highScore.top)));
	};

	function updatePowerupInterval(){
		if(getNumberOfPlayers() == 1 && timer == null){
			timer = new RandomTimer(Math.max(1, S.minTime/getNumberOfPlayers()), Math.max(1, S.maxTime/getNumberOfPlayers()));
			timer.startTimer(); //Start powerup timer when the mainscreen is connected.
		}
	};

	function updateGameSize(){
		var _width = gameGrid.getWidth() * S.canvasWidth;
		var _height = gameGrid.getHeight()* S.canvasHeight;
		game.setWidth(_width);
		game.setHeight(_height);
		return {width: _width, height: _height};
	};

	function reconnectMainScreen(){
		for(var i=0; i < getNumberOfPlayers(); i++){
			var player = GroupManager.getGroup('Player').getMember(i);
			var socketID = getSocketID(player.getGlobalID());
			var res = {id: socketID, polePos: clientList[socketID].pole.getPosition(), gpid: player.getGlobalID()};
			sh.newPlayer(socketID, res);
		};

		for(var i=0; i < nrOfBalls(); i++){
			sh.newBall(GroupManager.getGroup('Ball').getMember(i));
		}
	}
	
	this.isNameAvailable = function(name){ return !activeClients[name]; };

	this.registerName = function(name, socketID){
		clientList[socketID].player.setName(name);
		activeClients[name] = true;

		if(namesList[name]){ clientList[socketID].player.setHighscore(namesList[name]); }
		else { namesList[name] = 1; }
	};

	this.hasName = function(socketID){
		return clientList[socketID];
	}

	this.setAngle = function(socketID, angle){
		if(clientList[socketID]){
			clientList[socketID].shield.setAngle(angle);
		}
	};

	this.setPowerup = function(_playerID, _powerupType){
		var player = GroupManager.getGroup("Player").getMemberByGlobalID(_playerID);
		if(player != -1){ //if player has been found
			var powerup = new Powerup(S.powerupSize, _powerupType); //NOT game.instantiate!!, as it should not exists outside this function!
			player.setPowerup(powerup);
		}
	};

	//Opgedeelde update functies
	updateBalls = function() {
		for(var i = 0; i < nrOfBalls(); i++){
			sh.updateBallMainscreen(getBallPosition(i), i);
		}
	};

	updatePoles = function() {
		//Call isHit() when a pole is hit and send this event to the player
		for(var i = 0; i < getNumberOfPlayers(); i++){
			var pole = GroupManager.getGroup("Pole").getMember(i);
			
			var player = GroupManager.getGroup("Player").getMemberByGlobalID(pole.getHitBy());
			if(pole.hit){
				incrementScore(player, pole);
				pole.isHit();
				sh.hitEmit(getSocketFromPlayerID(pole.player.getGlobalID()), pole.player.getGlobalID());
			}
		}
	};

	//Increments score when a player hits another player
	incrementScore = function (_player, _pole) {
		if(_player != -1) { 
			if(_player.getGlobalID() != _pole.player.getGlobalID()) { //check if the player doesn't hit himself 
				_player.incrementScore(_pole.player.getPoints()); //Increment score 
				sh.updateScoreHit(getSocketFromPlayerID(_player.getGlobalID()), _pole.player.getPoints())
			}
		}
	};

	//Function to count the players


	//If you want some fancy function for the number of balls change ballsToBeAdded and ballsToBeRemoved.
	function nofBallsToBeAdded(){ return getNewBallsPerPlayer();};

	function nofBallsToBeRemoved(){ return getNewBallsPerPlayer(); };

	function getNewBallsPerPlayer(){ return S.ball.nrOfNewBalls; };

	this.getNumberOfPlayers = function(){ return Object.keys(clientList).length; };

	function getNumberOfPlayers() { return Object.keys(clientList).length; };

	function nrOfBalls(){ return GroupManager.getGroup("Ball").getMemberLength(); };

	getBallPosition = function(_id){ return GroupManager.getGroup("Ball").getMember(_id).getPosition(); };

	this.getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };

	getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };

	function getSocketID(_playerGlobalID){ return clientList[playerIDs[_playerGlobalID]].socket.id; };
}

if(typeof module != 'undefined'){
	module.exports = ServerGame;
}
