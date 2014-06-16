if(typeof module != 'undefined'){
	var Group = require('../common/game/util/Group.js');
	var Ball = require('../common/game/gameobjects/Ball.js');
	var Pole = require('../common/game/gameobjects/Pole.js');
	var Shield = require('../common/game/gameobjects/Shield.js');
	var Player = require('../common/game/gameobjects/Player.js');
	var Powerup = require('../common/game/gameobjects/Powerup.js');
	var CoreGame = require('../common/game/CoreGame.js');
	var RandomTimer = require('../common/game/time/RandomTimer.js');
	var GroupManager2 = require('../common/game/util/GroupManager2.js');

	var Client = require('../common/Client.js');
	var S = require('../common/Settings.js');

	var GroupManager = require('./util/GroupManager.js');
	var GameGrid = require('./grid/GameGrid.js');
	var PlayerFactory = require('./factory/PlayerFactory.js');
	var BallFactory = require('./factory/BallFactory.js');

	var HighScores = require('./game/HighScores.js');
}

function ServerGame(_socketHandler){
	var sh = _socketHandler;
	var game;
	var clientList = {};

	var activeClients = [];
	var playerIDs = {};
	var namesList = [];
	var gameGrid = new GameGrid();
	var gm = new GroupManager();
	var pf = new PlayerFactory();
	var bf = new BallFactory();

	var timer = null;

	this.addMainScreen = function(_socketID){
		sh.updateMainScreenCanvasSize(this.updateGameSize());
		
		setInterval(updateScores, S.highScore.updateInterval);	//updates the highscores on the mainscreen on interval
	};

	updateScores = function(){
		var hs = HighScores.updateScores();
		sh.updateScoresMainScreen(hs);
		if(hs)
			sh.updateTop(HighScores.reviseTop(hs.splice(0, S.highScore.top)));

	};

	updatePowerups = function() {
		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//Depending on the amount of players, the spawn time between powerups will go down.
		if(timer != null && timer.hasStopped()){
			timer = null;
			sh.newPowerup(addPowerup());
			
			if(timer == null && getNumberOfPlayers() > 0){
				timer = new RandomTimer(Math.max(1, S.minTime/getNumberOfPlayers()), Math.max(1, S.maxTime/getNumberOfPlayers())); //start a new timer for the next powerup
				timer.startTimer();
			}
		}
	};
	
	addPowerup = function(){
		var index = Math.floor(Math.random()*getNumberOfPlayers());
		var member = GroupManager2.getGroup("Player").getMember(index);
		
		if(member != undefined && member != null){
			return { id: member.getGlobalID() };
		}
	};
	
	/**
	* Add a new client, create a new player, pole and shield. 
	* @method Server#addClient
	* @param {socket} The socket associated with the player. 
	*/
	this.addClient = function(socketID, socket){
		var ballList = [];

		for(var i = 0; i < this.nofBallsToBeAdded(); i++){
			var newBall = game.instantiate(bf.createNewBall(S.ball.size))
			GroupManager2.getGroup("Ball").addMember(newBall);
			ballList.push(newBall);
		}	

		var positionOfPole = gameGrid.updateGrid(socket, ballList)
		var player = game.instantiate(pf.createPlayer(positionOfPole, socket.id));

		clientList[socketID] = new Client(socket, socketID, player, player.getPole(), player.getShield());
		playerIDs[player.getID()] = socketID;

		sh.updateMainScreenCanvasSize(this.updateGameSize());

		var res = {id: clientList[socketID].player.getName(), polePos: clientList[socketID].pole.getPosition(), gpid: player.getGlobalID()};

		sh.newPlayer(socketID, res);

		ballList.forEach(function(b){
			sh.newBall(b);
		})
		
		if(getNumberOfPlayers() == 1 && timer == null){
			timer = new RandomTimer(Math.max(1, S.minTime/getNumberOfPlayers()), Math.max(1, S.maxTime/getNumberOfPlayers()));
			timer.startTimer(); //Start powerup timer when the mainscreen is connected.
		}

		console.log('nr' + GroupManager2.getGroup('Pole').getMemberLength());
		console.log('nr' + GroupManager2.getGroup('Pole').getMemberLength());

	};

	this.deleteClient = function(socketID){
		var client = clientList[socketID];
		var members = GroupManager2.getGroup("Ball").getMembers();
		var slice = members.slice(-this.nofBallsToBeRemoved());

		slice.forEach(function(b){
			GroupManager2.getGroup("Ball").removeMember(b)
			game.remove(b);
			gameGrid.removeBall(b)	
			sh.removeBall(b.getGlobalID());
		})

		game.remove(client.pole);
		game.remove(client.shield);
		game.remove(client.player);
		//name stays in nameList because it has to stay in the highscore
		gameGrid.remove(socketID);
	
		namesList[client.player.getName()] = client.player.getHighscore(); //retrieve highscore and save it.
		delete activeClients[client.name]; //remove from active clients list
		delete clientList[socketID]; 
	};


	this.isNameAvailable = function(name){ return !activeClients[name]; };

	this.registerName = function(name, id){
		clientList[id].name = name;
		clientList[id].player.setName(name);
		activeClients[name] = true;

		if(namesList[name]){ clientList[id].player.setHighscore(namesList[name]); }
		else { namesList[name] = 1; }
	};

	this.updateGameSize = function(){
		var _width = gameGrid.getWidth() * S.canvasWidth;
		var _height = gameGrid.getHeight()* S.canvasHeight;
		game.setWidth(_width);
		game.setHeight(_height);
		return {width: _width, height: _height};
	};

	this.setAngle = function(socketID, angle){
		if(clientList[socketID]){
			clientList[socketID].shield.setAngle(angle);
		}
	};

	this.setPowerup = function(_playerID, _powerupType){
		var player = GroupManager2.getGroup("Player").getMemberByGlobalID(_playerID);
		if(player != -1){ //if player has been found
			var powerup = new Powerup(S.powerupSize, _powerupType); //NOT game.instantiate!!, as it should not exists outside this function!
			player.setPowerup(powerup);
		}
	};

	this.loadContent = function(){};

	this.update = function(){ 
		updateBalls();
		gameGrid.update();
		updatePowerups();
		updatePoles();
	};

	//Opgedeelde update functies
	updateBalls = function() {
		//TODO: ID instead of index
		for(var i = 0; i < nrOfBalls(); i++){
			sh.updateBallMainscreen(getBallPosition(i), i);
		}
	};


	updatePoles = function() {
		//Call isHit() when a pole is hit and send this event to the player
		for(var i = 0; i < getNumberOfPlayers(); i++){
			console.log(GroupManager2.getGroup('Pole').getMemberLength());
			console.log(GroupManager2.getGroup("Pole") + 'adsfjklljklasdjjfal'+ i + pole);
			var pole = GroupManager2.getGroup("Pole").getMember(i);
			
			var player = GroupManager2.getGroup("Player").getMemberByGlobalID(pole.getHitBy());
			if(pole.hit){
				incrementScore(player, pole);
				pole.isHit();
				sh.hitEmit(getSocketFromPlayerID(pole.player.getID()), pole.player.getGlobalID());
			}
		}
	};



	//Increments score when a player hits another player
	incrementScore = function (_player, _pole) {
		if(_player != -1) { 
			if(_player.getGlobalID() != _pole.player.getGlobalID()) { //check if the player doesn't hit himself 
				_player.incrementScore(_pole.player.getPoints()); //Increment score 
				sh.updateScoreHit(getSocketFromPlayerID(_player.getID()), _pole.player.getPoints())
			}
		}
	};

	


	this.createGame = function(_initialize, _update, _width, _height){
		game = new CoreGame(_initialize, _update, _width, _height)
	};


	//If you want some fancy function for the number of balls change ballsToBeAdded and ballsToBeRemoved.
	this.nofBallsToBeAdded = function(){
		return this.getNewBallsPerPlayer();
	}

	this.nofBallsToBeRemoved = function(){
		return this.getNewBallsPerPlayer();
	}

	
	this.getNewBallsPerPlayer = function(){
		return S.ball.nrOfNewBalls;
	}


	//TODO: hier de dubbele functies nog weghalen 
	//NOTE: als je er "function" voor zet zijn ze private, this.function is public, zonder function/this ervoor = global
	//Getters and Setters
	this.getNumberOfPlayers = function(){ return Object.keys(clientList).length; };

	getNumberOfPlayers = function(){ return Object.keys(clientList).length; };

	this.getClient = function(id){ return clientList[id]; };

	this.getGame = function(){ return game; };

	group = function(name){ return gm.group(name);};

	getGroup = function(_group){ return group(_group); };

	this.getGroup = function(_group){ return group(_group); };

	this.getBall = function(_id){ return GroupManager2.getGroup("Ball").getMember(_id); };

	nrOfBalls = function(){ return GroupManager2.getGroup("Ball").getMemberLength(); };

	getBallPosition = function(_id){ return GroupManager2.getGroup("Ball").getMember(_id).getPosition(); };

	this.getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };

	getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };
}

if(typeof module != 'undefined'){
    module.exports = ServerGame;
}
