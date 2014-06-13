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

function ServerGame(){
	var sh;
	var clientList = {};
	var playerIDs = {};
	var namesList = [];
	var game;
	var maxNrOfPlayers = 0;
	var maxNrOfColumns = 0;
	var gameGrid = new GameGrid();
	var gm = new GroupManager();
	var pf = new PlayerFactory();
	var bf = new BallFactory();

		var timer = new RandomTimer(S.minTime, S.maxTime);

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
		sh.updateMainScreenCanvasSize2(this.updateMainScreenCanvasSize());
		timer.startTimer(); //Start powerup timer when the mainscreen is connected.
	};

	updatePowerups = function() {
		//Check whether the randomtimer has stopped, if so; spawn a powerup at a random player and start a new timer.
		//TODO: timer eerder af laten lopen als er meer spelers zijn, dus settings aanpassen, of
		//iets van settings - x * aantalSpelers doen ofzo, zodat het iig wat sneller wordt of het interval kleiner.
		if(timer != null && timer.hasStopped()){
			timer = null;
			sh.newPowerup();

			timer = new RandomTimer(S.minTime, S.maxTime); //start a new timer for the next powerup
			timer.startTimer();
		}
	};
	
	this.addPowerup = function(){
		var index = Math.floor(Math.random()*this.getNumberOfPlayers());
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
	this.addClient = function(socket){
		var ball = game.instantiate(bf.createNewBall(S.ball.size));		
		var positionOfPole = gameGrid.updateGrid(socket, maxNrOfColumns, ball)
		var player = game.instantiate(pf.createPlayer(positionOfPole, socket.id));
		
		group("Balls").addMember(ball);
		group("Poles").addMember(game.instantiate(player.getPole()));
		group("Shields").addMember(game.instantiate(player.getShield()));
		group("Players").addMember(player);

		console.log(socket.id + "SG");
		clientList[socket.id] = new Client(socket, socket.id, player, player.getPole(), player.getShield());
		playerIDs[player.getID()] = socket.id;
		
		return {id: clientList[socket.id].player.getName(), color: ball.getColor(),
			polePos: clientList[socket.id].pole.getPosition(), gid: ball.getGlobalID(), gpid: player.getGlobalID()};
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
		ret = b.getGlobalID();
		delete clientList[socketID]; 
		return ret;
	};


	this.isNameAvailable = function(name){ return !namesList[name]; };

	this.registerName = function(name, id){
		namesList[name] = true;
		clientList[id].name = name;
		clientList[id].player.setName(name);
	};

	this.setMaxGameSize = function(data){
		maxNrOfPlayers = Math.floor(data.width / S.canvasWidth) * Math.floor(data.height / S.canvasHeight);
		maxNrOfColumns = Math.floor(data.width / S.canvasWidth);
	};

	this.updateMainScreenCanvasSize = function(){
		var _width = gameGrid.getWidth() * S.canvasWidth;
		var _height = gameGrid.getHeight()* S.canvasHeight;
		game.setWidth(_width);
		game.setHeight(_height);
		return {width: _width, height: _height};
	};

	this.setAngle = function(socket, angle){
		if(clientList[socket.id]){
			clientList[socket.id].shield.setAngle(angle);
		}
		return {id: socket.id, angle: angle};
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
		gameGrid.update();
		updatePowerups();
	};
	
	this.updateHighscore = function(highscore){
	
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

	//Getters and Setters
	this.getNumberOfPlayers = function(){ return Object.keys(clientList).length; };

	this.getClient = function(id){ return clientList[id]; };

	this.getGame = function(){ return game; };

	group = function(name){ return gm.group(name);};

	this.getGroup = function(_group){ return group(_group); };

	this.getMaxNrOfPlayers = function(){ return maxNrOfPlayers; };

	this.getBall = function(_id){ return group("Balls").getMember(_id); };

	this.nrOfBalls = function(){ return group("Balls").getMemberLength(); };

	this.getBallPosition = function(_id){ return group("Balls").getMember(_id).getPosition(); };

	this.getSocketFromPlayerID = function(_playerID){ return clientList[playerIDs[_playerID]].socket; };
}

if(typeof module != 'undefined'){
    module.exports = ServerGame;
}
