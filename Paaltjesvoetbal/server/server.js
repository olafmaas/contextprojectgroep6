var io = require('socket.io').listen(5050);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug
var Game = require('../game/Game.js');
var Ball = require('../game/Ball.js');
var Pole = require('../game/Pole.js');
var Shield = require('../game/Shield.js');
var Player = require('../game/Player.js');
var Group = require('../game/Group.js');
var handleCollision = require('../game/CollisionDetection.js');

//////////
// GAME //
//////////

var game = new Game(loadContent, update, drawToClients);

//Groups
var balls;
var poles;
var shields;
var players;

var NROFBALLS = 1;
var NROFPOLES = 2;
var NROFSHIELDS = 2;
var NROFPLAYERS = 2; 

function loadContent(){

  balls = new Group(Ball);
  poles = new Group(Pole);
  shields = new Group(Shield);
  players = new Group(Player);

  //Create balls
  for(var i = 0; i < NROFBALLS; i++){
	var ball = new Ball(10);
    //ball.setColor(ColorGenerator.returnColor());
	ball.getBody().setVelocity(5);
	ball.getBody().setVelocityDirection(1.75 * Math.PI);
	ball.setPosition(30 + (i * 23), 64 + (i * 22));

	balls.addMember(ball);
  }


      //Create poles
    for(var i = 0; i < NROFPOLES; i++){
        var pole = new Pole(10);
        //pole.setColor(ColorGenerator.returnColor());
        pole.setPosition(150 + (300*i), 150);

        poles.addMember(pole);
        poles.addCollision(pole, balls, pole.isHit, pole); //pole to ball collision
    }

    //Create shields
    for(var i = 0; i < NROFSHIELDS; i++){
        var tempPole = poles.getMember(i);
        var shield = new Shield(tempPole);
        shield.getBody().immovable = true;

        shields.addMember(shield);
        shields.addCollision(shield, balls, null, null); //shield to ball collision
    }

    //Create players
    for(var i = 0; i < NROFPLAYERS; i++){
        var tempPole = poles.getMember(i);
        var tempShield = shields.getMember(i);
        var player = new Player("Player" + i);
        player.setPole(tempPole);
        player.setShield(tempShield);

        tempPole.setPlayer(player);
        players.addMember(player);
    }

  balls.addCollisionCombineAll(balls);
}

function update(){

  balls.update();
  poles.update();
  shields.update();
  players.update();

  balls.checkCollision();
  //Shield collision in handled by the client.
  //shields.checkCollision();

  if(poles.checkCollision()){
    drawToClients();	
  }

  if(balls.checkWorldBounds(game)){
    drawToClients();
  }

  drawToMainScreen();
}

function drawToClients(){
    io.of('/player').emit('UpdateBall', balls.getMember(0).getPosition());
    io.of('/player').emit('UpdateBallAngle', balls.getMember(0).getBody().getVelocityDirection());
};

function drawToMainScreen(){
  if(mainScreenSocket){
	mainScreenSocket.emit('drawBall', balls.getMember(0).getPosition());
	mainScreenSocket.emit('drawShield', shields.getMember(0).getAngle());
	//PLAYER 2
	mainScreenSocket.emit('drawShield2', shields.getMember(1).getAngle());
	//PLAYER 2
  }
};

function updateMainScreenCanvasSize(){
  game.setWidth(grid[0].length * canvasWidth);
  game.setHeight(grid.length * canvasHeight);
  if(mainScreenSocket){
	mainScreenSocket.emit('newCanvasSize', {width: grid[0].length * canvasWidth, height: grid.length * canvasHeight});
  }
};

/////////////////
// CONNECTIONS //
/////////////////

//PLAYER2
var PLAYER1 = false;

var mainScreenSocket;
var playerSockets = {};
var maximumPlayers = 0;


// GAME EN GRID GEBEUREN
var canvasWidth = 400;
var canvasHeight = 300;
var maximumCol;
var playerNames = new Array();
var grid = new Array();
grid.push(new Array());

io.of('/mainscreen').on('connection', function (socket) {
  if(!mainScreenSocket){
	console.info('MainScreen connected');
	connectMainScreen(socket);
  }
});

io.of('/player').on('connection', function (socket) {
  if(Object.keys(playerSockets).length < maximumPlayers){
	console.log('Client connected');
	connectClient(socket);
  }
  else{
	socket.send('Game is full!');
	socket.disconnect();
  } 
});

function connectMainScreen(socket){
  mainScreenSocket = socket;

  updateMainScreenCanvasSize();

  //Bepaalt het maximaal aantal spelers
  socket.on('screenSizeMainScreen', function(data){ 
	maximumPlayers = Math.floor(data.width / canvasWidth) * Math.floor(data.height / canvasHeight);
	maximumCol = Math.floor(data.width / canvasWidth);
  });

  //Handle MainScreen Disconnet
  socket.on('disconnect', function (data){
	console.log('MainScreen disconnected');
	mainScreenSocket = null;
  });
};

function connectClient(socket){ 
  playerSockets[socket.id] = socket;

  //
  // GRID GEBEUREN
  //
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
  socket.emit('userName', {free: false});


  updateMainScreenCanvasSize();
  log();

  if(!PLAYER1){
	PLAYER1 = true;
	socket.on('shieldAngle', function (angle){
	  shields.getMember(0).setAngle(angle);
	});
  } else {
	  socket.on('shieldAngle', function (angle){
	  shields.getMember(1).setAngle(angle);
	});
  }

  socket.on('userName', function(data){
	if(!playerNames[data.name]) {
	  playerNames[data.name] = true;
	  socket.emit('userName', {free: true});
	  console.info("Ok"+data.name);
	}else{
	  socket.emit('userName', {free: false});
	  console.info(data.name);
	}
  })

  socket.on('ballAngle', function (velocityDirection){
	balls.getMember(0).getBody().setVelocityDirection(velocityDirection);
  });

  //Handle Client Disconnet
  socket.on('disconnect', function (data){
	console.log('Client disconnected');
	delete playerSockets[socket.id];

	grid[y][x] = -1;
  });
};

function log(){
  console.log('mainScreenSocket: ' + !!mainScreenSocket);
  console.log('maximumPlayers: '+ maximumPlayers);
  console.log('playerSockets: ' + Object.keys(playerSockets).length);
};
