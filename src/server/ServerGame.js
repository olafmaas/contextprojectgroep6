if(typeof module != 'undefined'){
	var Group = require('../common/game/util/Group.js');
	var Ball = require('../common/game/gameobjects/Ball.js');
	var Pole = require('../common/game/gameobjects/Pole.js');
	var Shield = require('../common/game/gameobjects/Shield.js');
	var Player = require('../common/game/gameobjects/Player.js');
	var Powerup = require('../common/game/gameobjects/Powerup.js');
	var CoreGame = require('../common/game/CoreGame.js');
	var RandomTimer = require('../common/game/time/RandomTimer');

	var Client = require('../common/Client.js');
	var S = require('../common/Settings.js');

	var GroupManager = require('./util/GroupManager.js');
	var GameGrid = require('./grid/GameGrid.js');
	var PlayerFactory = require('./factory/PlayerFactory.js');
	var BallFactory = require('./factory/BallFactory.js');
}

function ServerGame(_socketHandler){
	var sh = _socketHandler;
	var clientList = {};
	var activeClients = [];
	var playerIDs = {};
	var namesList = [];
	var game;
	var gameGrid = new GameGrid();
	var gm = new GroupManager();
	var pf = new PlayerFactory();
	var bf = new BallFactory();
	var oldranking = [];
	var timer;

	//Create all groups
	gm.addGroup("Balls", Ball);
	gm.addGroup("Poles", Pole);
	gm.addGroup("Shields", Shield);
	gm.addGroup("Players", Player);

	//TIJDELIJK
	this.addSH = function(_sh){
		sh = _sh;
	}

	this.addMainScreen = function(_socketID){
		sh.updateMainScreenCanvasSize(this.updateMainScreenCanvasSize());
		
		timer = new RandomTimer(Math.max(1, S.minTime/getNumberOfPlayers()), Math.max(1, S.maxTime/getNumberOfPlayers()));
		timer.startTimer(); //Start powerup timer when the mainscreen is connected.
		setInterval(updateScores, S.highScore.updateInterval);	//updates the highscores on the mainscreen on interval
	};

	//Returns a list of the players with their highscores
	getScores = function(){
		var temp = [];
		//Retrieve the highest scores of all the players
		for(var i = 0; i < getNumberOfPlayers(); i++){
			var player = getGroup("Players").getMember(i);
			var score = Math.max(player.getScore(), player.getHighscore());
			temp.push({ Score: score, Name: player.name, ID: player.getGlobalID() });
		}
		return temp;
	};

	//Updates the highscores on the mainscreen + informs players when they are in the top x
	updateScores = function(){
		var highScores = getScores();
		
		if(highScores.length > 0){
			var serializedScores = JSON.stringify(highScores);
			var hs = JSON.parse(serializedScores);
			//Sort the scores (highest to lowest)
			hs.sort(function(a, b) {return b.Score - a.Score;});

			//Send current highscore list to the mainscreen
			sh.updateScoresMainScreen(hs);
	
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

		sh.updateTop(data);
		updateHighscore(data);
		
		oldranking = newRanking;
	};

	updatePowerups = function() {
		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//TODO: timer eerder af laten lopen als er meer spelers zijn, dus settings aanpassen, of
		//iets van settings - x * aantalSpelers doen ofzo, zodat het iig wat sneller wordt of het interval kleiner.
		if(timer != null && timer.hasStopped()){
			timer = null;
			sh.newPowerup(addPowerup());
			
			timer = new RandomTimer(Math.max(1, S.minTime/getNumberOfPlayers()), Math.max(1, S.maxTime/getNumberOfPlayers())); //start a new timer for the next powerup
			timer.startTimer();
		}
	};
	
	addPowerup = function(){
		var index = Math.floor(Math.random()*getNumberOfPlayers());
		var member = group("Players").getMember(index);
		
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

		for(var i = 0; i < this.getNewBallsPerPlayer; i++){
			var newBall = game.instantiate(bf.createNewBall(S.ball.size))
			group("Balls").addMember(newBall);
			ballList.push(newBall);
		}	

		var positionOfPole = gameGrid.updateGrid(socket, ballList)
		var player = game.instantiate(pf.createPlayer(positionOfPole, socket.id));
		
		group("Poles").addMember(game.instantiate(player.getPole()));
		group("Shields").addMember(game.instantiate(player.getShield()));
		group("Players").addMember(player);

		clientList[socketID] = new Client(socket, socketID, player, player.getPole(), player.getShield());
		playerIDs[player.getID()] = socketID;

		sh.updateMainScreenCanvasSize(this.updateMainScreenCanvasSize());

		var res = {id: clientList[socketID].player.getName(), color: ball.getColor(),
			polePos: clientList[socketID].pole.getPosition(), gid: ball.getGlobalID(), gpid: player.getGlobalID()};

		sh.newPlayer(socketID, res);
		sh.newBalls(ballList);
	};

	this.deleteClient = function(socketID){
		var client = clientList[socketID];
		var b = group("Balls").getMember(group("Balls").getMemberLength()-1)
		group("Balls").removeMember(b);	//TODO remove precies als de bal een scherm verlaat.
		group("Poles").removeMember(client.pole);
		group("Shields").removeMember(client.shield);
		group("Players").removeMember(client.player);

		game.remove(b);
		game.remove(client.pole);
		game.remove(client.shield);
		game.remove(client.player);
		//name stays in nameList because it has to stay in the highscore
		gameGrid.remove(socketID);
		gameGrid.removeBall(b)		
		sh.removeBall(b.getGlobalID());

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

	this.updateMainScreenCanvasSize = function(){
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
		var player = group("Players").getMemberByGlobalID(_playerID);
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
			var pole = getGroup("Poles").getMember(i);
			var player = getGroup("Players").getMemberByGlobalID(pole.getHitBy());
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

	
	updateHighscore = function(highscore){
	
		for(i = 0; i < group("Players").getMemberLength(); i++){
			var player = group("Players").getMember(i);
			player.setPoints(S.player.points); //Reset points to a normal player
			
			if(player != -1){
				if(player.getPowerup() == null){
					player.getPole().setRadius(S.pole.size);
				}
			}
		}

		var count = S.highScore.top;
		
		for(i = 0; i < highscore.newhs.length; i++){
			var player = group("Players").getMemberByGlobalID(highscore.newhs[i]);
			player.setPoints(S.player.points + (S.player.step * count)); //Set points according to position in the highscore top
			
			if(player != -1){
				if(player.getPowerup() == null){
					player.getPole().setRadius(S.pole.size + count*2);
				}
			}
			count--;
		}
	};

	this.createGame = function(_initialize, _update, _width, _height){
		game = new CoreGame(_initialize, _update, _width, _height)
	};


	//If you want some fancy function implement it in this function. 
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

	this.getBall = function(_id){ return group("Balls").getMember(_id); };

	nrOfBalls = function(){ return group("Balls").getMemberLength(); };

	getBallPosition = function(_id){ return group("Balls").getMember(_id).getPosition(); };

	this.getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };

	getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };
}

if(typeof module != 'undefined'){
    module.exports = ServerGame;
}
