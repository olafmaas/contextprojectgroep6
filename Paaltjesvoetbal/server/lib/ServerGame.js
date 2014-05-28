if(typeof module != 'undefined'){
	var Log = require('./LogHandler.js');
	var Settings = require('./Settings.js');
	var GameGrid = require('./GameGrid.js');
	var GroupManager = require('./GroupManager.js');
	var PlayerFactory = require('./PlayerFactory.js');
	var Client = require('./Client.js');
	var Game = require('../../game/Game.js');
	var CoreGame = require('../../game/CoreGame.js');
	var Ball = require('../../game/Ball.js');
	var Pole = require('../../game/Pole.js');
	var Shield = require('../../game/Shield.js');
	var Player = require('../../game/Player.js');
	var Group = require('../../game/Group.js');
	var handleCollision = require('../../game/CollisionDetection.js');
}

function Server(debug){
	var clientList = [];
	var namesList = []
	var game; 
	var mainScreenSocket = {emit:function(){false}} //If the mainscreen is not instantiated this function is used;
	var maxNrOfPlayers = 0;
	var maxNrOfColumns = 0;
	var settings = new Settings();
	var logHandler = new Log(debug);
	var gameGrid = new GameGrid(settings);
	var gm = new GroupManager();
	var pf = new PlayerFactory(settings);

	//Create all groups
	gm.addGroup("Balls", Ball);
	gm.addGroup("Poles", Pole);
	gm.addGroup("Shields", Shield);
	gm.addGroup("Players", Player);

	/**
	* Add a new client, create a new player, pole and shield. 
	* @method Server#addClient
	* @param {socket} The socket associated with the player. 
	*/
	this.addClient = function(socket){
		var player = pf.createPlayer(clientList.length, gameGrid.getHeight(), maxNrOfColumns, socket.id);
		//setGroupMemberships(player);

		group("Poles").addMember(player.getPole());
		group("Poles").addCollision(player.getPole(), group("Balls"), player.getPole().isHit, player.getPole());

		group("Shields").addMember(player.getShield());
		group("Shields").addCollision(player.getShield(), group("Balls"), null, null);

		group("Players").addMember(player);
		clientList[socket.id] = new Client(socket, socket.id, player, player.getPole(), player.getShield());
		return {id: clientList[socket.id].player.getName(), polePos: clientList[socket.id].pole.getPosition()};
	}

	this.deleteClient = function(socket){
		delete clientList[socket.id]; //TODO remove all stuff
	}

	this.update = function(){

	}

	/**
	* Adds the pole, shield and player to the correct groups and 
	* sets the collision. 
	* @method Server#addClient
	* @param {socket} The socket associated with the player. 
	*/
	this.setGroupMemberships = function(player){
		group("Poles").addMember(player.getPole());
		group("Poles").addCollision(player.getPole(), group("Balls"), player.getPole().isHit, player.getPole());

		group("Shields").addMember(player.getShield());
		group("Shields").addCollision(player.getShield(), group("Balls"), null, null);

		group("Players").add(player);
	}

	this.isNameAvailable = function(name){
		return namesList[name];
	}

	this.registerName = function(name, id){
		namesList[name] = true;
		clientList[id].name = name;
		clientList[id].player.setName(name);
	}

	this.setMaxGameSize = function(data){

		maxNrOfPlayers = Math.floor(data.width / settings.canvasWidth) * Math.floor(data.height / settings.canvasHeight);
		maxNrOfColumns = Math.floor(data.width / settings.canvasWidth);
		console.log(maxNrOfPlayers);
	}


	this.updateMainScreenCanvasSize = function(){
		var _width = gameGrid.getWidth() * settings.canvasWidth;
		var _height = gameGrid.getHeight()* settings.canvasHeight;
		game.setWidth(_width);
		game.setHeight(_height);
		return {width: _width, height: _height};
	}

	this.updateGrid = function(socket){
		return gameGrid.updateGrid(socket);
	}

	this.setAngle = function(socket, angle){
		clientList[socket.id].shield.setAngle(angle);
		return {id: socket.id, angle: angle};
	}

	addBall = function(){
		var ball = new Ball(10);
		ball.getBody().setVelocity(5);
		ball.getBody().setVelocityDirection(1.70 * Math.PI);
		ball.setPosition(100, 100);
		group("Balls").addCollision(ball, group("Balls"), null, null);
		group("Balls").addMember(ball);
	}

	this.ballAngle = function(velocityDirection){
		group("Balls").getMember(0).getBody().setVelocityDirection(velocityDirection);
		return group("Balls").getMember(0);
	}

	this.loadContent = function(){
		addBall();
	}

	this.update = function(){
		gm.update()
		group("Balls").checkCollision();	
	}

	this.createGame = function(_initialize, _update, _width, _height){
		game = new CoreGame(_initialize, _update, _width, _height)
	}

	this.checkGroupCollision = function(name){
		return group(name).checkCollision();
	}

	this.checkWorldBounds = function(name){
		return group(name).checkWorldBounds(game);
	}

	//Getters and Setters
	this.getNumberOfPlayers = function(){
		logHandler.log("cl"+clientList.length);
		return clientList.length;
	}

	this.getClient = function(id){
		return clientList[id];
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

	this.getBall = function(){
		return group("Balls").getMember(0);
	}


	this.getBallPosition = function(){
		return group("Balls").getMember(0).getPosition();
	}

}

if(typeof module != 'undefined'){
    module.exports = Server;
}
