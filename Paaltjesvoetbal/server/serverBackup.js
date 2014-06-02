var io = require('socket.io').listen(5050);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug
var Game = require('../game/Game.js');
var Ball = require('../game/Ball.js');
var Pole = require('../game/Pole.js');
var Shield = require('../game/Shield.js');
var Player = require('../game/Player.js');
var Group = require('../game/Group.js');
var handleCollision = require('../game/CollisionDetection.js');
var PlayerDataObject = require('./PlayerDataObject.js');


//////////
// GAME //
//////////


var game = new Game(loadContent, update, drawToPlayers);

//Groups
var balls = new Group(Ball);
var poles = new Group(Pole);
var shields = new Group(Shield);
var players = new Group(Player);

function loadContent(){
	addBall();
};

function update(){
	balls.update();
	poles.update();
	shields.update();
	players.update();

	balls.checkCollision();	
	//shields.checkCollision(); //Shield collision in handled by the Player/
	if(poles.checkCollision()){
		drawToPlayers();	//when a pole collides with a ball the player is notified to change te ball direction
	}
	if(balls.checkWorldBounds(game)){
		drawToPlayers();	//when a ball collides with a worldbounds the player is notified to change te ball direction
	}

	drawToMainScreen();		//currently on every update the mainscreen is send the ball position to draw it.
};

//TODO drawToPlayer als er eenbal in zijn scherm komt
function drawToPlayers(){
	io.of('/player').emit('UpdateBall', balls.getMember(0).getPosition());
	io.of('/player').emit('UpdateBallAngle', balls.getMember(0).getBody().getVelocityDirection());
};

function drawToMainScreen(){
	mainScreenSocket.emit('drawBall', balls.getMember(0).getPosition());
};


/////////////////
// CONNECTIONS //
/////////////////


var mainScreenSocket = {emit: function(){false}};	//dummy mainScreenSocket voor als deze er niet is.
var playerData = {};	//this objects holds for each socket.id a PlayerDataObject with all Data about a player
var playerNames = [];
var maximumNrOfPlayers = 0;
var nrOfPlayers = 0;

//Grid propperties TODO
var canvasWidth = 450;
var canvasHeight = 350;
var nrOfRows = 0;
var maximumCol;
var grid = new Array();
grid.push(new Array());

io.of('/mainscreen').on('connection', function (socket) {
	if(!mainScreenSocket.emit()){
		console.log('MainScreen connected');
		connectMainScreen(socket);
	}	
});

io.of('/player').on('connection', function (socket) {
	if(Object.keys(playerData).length < maximumNrOfPlayers){
		console.log('Player connected');
		connectPlayer(socket);
	}
	else{
		socket.send('Game is full!');
		socket.disconnect();
	} 
});

function connectMainScreen(socket){
	mainScreenSocket = socket;

	updateMainScreenCanvasSize();

	socket.on('screenSizeMainScreen', function(data){ 
		maximumNrOfPlayers = Math.floor(data.width / canvasWidth) * Math.floor(data.height / canvasHeight);
		maximumCol = Math.floor(data.width / canvasWidth);
	});

	socket.on('disconnect', function (data){
		console.log('MainScreen disconnected');
		mainScreenSocket = {emit: function(){false}};
	});
};

function connectPlayer(socket){ 	
	socket.emit('userName', false); //get userName from Player
	makePlayerObjects(socket);
	updateGrid(socket);
	mainScreenSocket.emit('newPlayer', {id: playerData[socket.id].player.getName(), polePos: playerData[socket.id].pole.getPosition()});
	log();

	socket.on('shieldAngle', function (angle){
		playerData[socket.id].shield.setAngle(angle);
		mainScreenSocket.emit('drawShield', {id: socket.id, angle: angle});
	});
	
	socket.on('userName', function(name){
		if(!playerNames[name]) {
			playerNames[name] = true;
			playerData[socket.id].name = name;
			playerData[socket.id].player.setName(name);
		}else{
			socket.emit('userName', false);
		}
	});

	socket.on('ballAngle', function (velocityDirection){
		balls.getMember(0).getBody().setVelocityDirection(velocityDirection);
		drawToPlayers();
	});

	socket.on('disconnect', function (data){
		console.log('Player disconnected');
		delete playerData[socket.id]; //TODO remove all stuff
	});
};


//////////////////////
// HELPER FUNCTIONS //
//////////////////////


function addBall(){
	var ball = new Ball(10);
	ball.getBody().setVelocity(5);
	ball.getBody().setVelocityDirection(1.70 * Math.PI);
	ball.setPosition(100, 100);
	
	balls.addCollision(ball, balls, null, null);
	balls.addMember(ball);
};

function makePlayerObjects(socket){
	nrOfPlayers = Object.keys(playerData).length;
	nrOfRows = Math.floor(nrOfPlayers / maximumCol);

	var pole = new Pole(10);
	pole.setPosition(canvasWidth/2 + (canvasWidth * (nrOfPlayers%maximumCol)), canvasHeight / 2 + (canvasHeight * nrOfRows));
	poles.addMember(pole);
	poles.addCollision(pole, balls, pole.isHit, pole);

	var shield = new Shield(pole);
	shield.getBody().immovable = true;
	shields.addMember(shield);
	shields.addCollision(shield, balls, null, null);

	var player = new Player(socket.id); //Tijdelijk wordt de socket.id als playername gebruikt
	player.setPole(pole);
	player.setShield(shield);
	pole.setPlayer(player);
	players.addMember(player);

	playerDataObject = new PlayerDataObject(socket, socket.id, player, pole, shield)
	playerData[socket.id] = playerDataObject;
};

function updateGrid(socket){
	var x;
	var y;
	placed = false;
	for (i = 0; i < grid.length; i++) {
		if(grid[i].indexOf(-1) >  -1 || grid[i].length < maximumCol) {
			placed = true;
			if(grid[i].indexOf(-1) > -1){
				x = grid[i].indexOf(-1);
				grid[i][x] = socket.id;
			}else{
				x = grid[i].length;
				grid[i].push(socket.id)
			}
			y = i;
			break;
		}
	}
	if(!placed){
		grid.push(new Array());
		x = 0;
		y = grid.length - 1;
		grid[i].push(socket.id);
	}
	socket.emit('canvasPos', {left: x * canvasWidth, top: y*canvasHeight});

	updateMainScreenCanvasSize();
};

function updateMainScreenCanvasSize(){
	game.setWidth(grid[0].length * canvasWidth);
	game.setHeight(grid.length * canvasHeight);
	mainScreenSocket.emit('newCanvasSize', {width: grid[0].length * canvasWidth, height: grid.length * canvasHeight});
};

function log(){
	console.log('mainScreenSocket: ' + !!mainScreenSocket);
	console.log('maximumNrOfPlayers: '+ maximumNrOfPlayers);
	console.log('playerSockets: ' + Object.keys(playerData).length);
};
