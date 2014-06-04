if(typeof module != 'undefined'){
	var logHandler = require('./LogHandler.js');
	var Settings = require('./Settings.js');
	var GameGrid = require('./GameGrid.js');
	var GroupManager = require('./GroupManager.js');
	var PlayerFactory = require('./PlayerFactory.js');
	var BallFactory = require('./BallFactory.js');
	var Client = require('./Client.js');
	var Game = require('../../game/Game.js');
	var CoreGame = require('../../game/CoreGame.js');
	var Ball = require('../../game/Ball.js');
	var Pole = require('../../game/Pole.js');
	var Shield = require('../../game/Shield.js');
	var Powerup = require('../../game/Powerup.js');
	var Player = require('../../game/Player.js');
	var Group = require('../../game/util/Group.js');
	var handleCollision = require('../../game/CollisionDetection.js');
	var ColorGenerator = require('../../game/util/ColorGenerator');
}

function Server(){
	var clientList = {};
	var namesList = []
	var game; 
	var mainScreenSocket = {emit:function(){false}} //If the mainscreen is not instantiated this function is used;
	var maxNrOfPlayers = 0;
	var maxNrOfColumns = 0;
	var settings = new Settings();
	var gameGrid = new GameGrid(settings);
	var gm = new GroupManager();
	var pf = new PlayerFactory(settings);
	var bf = new BallFactory();

	//Create all groups
	gm.addGroup("Balls", Ball);
	gm.addGroup("Poles", Pole);
	gm.addGroup("Shields", Shield);
	gm.addGroup("Players", Player);
	
	this.dropPowerup = function(){	
		var index = Math.floor(Math.random()*this.getNumberOfPlayers());
		var member = group("Players").getMember(index);

		var pole = member.getPole();
		var xpos = pole.getBody().getPosition().x;
		var ypos = pole.getBody().getPosition().y

		return {radius: 10, type: 0, position: {x: xpos, y: ypos} };
	}
	
	/**
	* Add a new client, create a new player, pole and shield. 
	* @method Server#addClient
	* @param {socket} The socket associated with the player. 
	*/
	this.addClient = function(socket, positionOfPole){
		var player = game.instantiate(pf.createPlayer(positionOfPole, socket.id));
		//setGroupMemberships(player);
		var ball = game.instantiate(bf.createNewBall(10));
		
		group("Balls").addMemberOnPosition(ball, ball.getGlobalID());
		group("Poles").addMember(game.instantiate(player.getPole()));
		group("Shields").addMember(game.instantiate(player.getShield()));
		group("Players").addMember(player);

		clientList[socket.id] = new Client(socket, socket.id, player, player.getPole(), player.getShield());

		return {id: clientList[socket.id].player.getName(), polePos: clientList[socket.id].pole.getPosition(), gid: ball.getGlobalID()};
	}

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
		ret = b.getGlobalID();
		delete clientList[socketID]; 
		return ret;
	}

	/**
	* Adds the pole, shield and player to the correct groups and 
	* sets the collision. 
	* @method Server#addClient
	* @param {socket} The socket associated with the player. 
	*/
	this.setGroupMemberships = function(player){
		group("Poles").addMember(player.getPole());
		group("Shields").addMember(player.getShield());
		group("Players").add(player);
	}

	this.isNameAvailable = function(name){
		return !namesList[name];
	}

	this.registerName = function(name, id){
		namesList[name] = true;
		clientList[id].name = name;
		clientList[id].player.setName(name);
	}

	this.setMaxGameSize = function(data){
		maxNrOfPlayers = Math.floor(data.width / settings.canvasWidth) * Math.floor(data.height / settings.canvasHeight);
		maxNrOfColumns = Math.floor(data.width / settings.canvasWidth);
	}

	this.updateMainScreenCanvasSize = function(){
		var _width = gameGrid.getWidth() * settings.canvasWidth;
		var _height = gameGrid.getHeight()* settings.canvasHeight;
		game.setWidth(_width);
		game.setHeight(_height);
		return {width: _width, height: _height};
	}

	this.updateGrid = function(socket){
		return gameGrid.updateGrid(socket, maxNrOfColumns);
	}

	this.setAngle = function(socket, angle){
		clientList[socket.id].shield.setAngle(angle);
		return {id: socket.id, angle: angle};
	}

	this.ballAngle = function(socket, velocityDirection, index){
		group("Balls").getMember(index).getBody().setVelocityDirection(velocityDirection);
		return group("Balls").getMember(index);
	}

	this.loadContent = function(){

	}

	this.update = function(){

	}

	this.createGame = function(_initialize, _update, _width, _height){
		game = new CoreGame(_initialize, _update, _width, _height)
	}

	//TODO: return a list of id's that collide?
	this.checkGroupCollision = function(name){
		return group(name).checkCollision();
	}

	//Getters and Setters
	this.getNumberOfPlayers = function(){
		return Object.keys(clientList).length;
	}

	this.getClient = function(id){
		return clientList[id];
	}

	this.getGame = function(){
		return game;
	}

	group = function(name){
		return gm.group(name);
	}

	this.log = function(message){
		logHandler.log(message);
	}

	this.getMaxNrOfPlayers = function(){
		return maxNrOfPlayers;
	}

	this.getBall = function(_id){
		return group("Balls").getMember(_id);
	}

	this.nrOfBalls = function(){
		return group("Balls").getMemberLength();
	}

	this.getBallPosition = function(_id){
		return group("Balls").getMember(_id).getPosition();
	}

}

if(typeof module != 'undefined'){
    module.exports = Server;
}
