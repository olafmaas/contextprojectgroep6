var io = require('socket.io').listen(5050);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug
var Game = require('../game/Game.js');
var Ball = require('../game/Ball.js');
var Pole = require('../game/Pole.js');
var Shield = require('../game/ShieldServer.js');
var Player = require('../game/Player.js');
var handleCollision = require('../game/CollisionDetection.js');
var input = require('../game/Input.js');

//////////
// GAME //
//////////


var game = new Game(loadContent, update, drawToClients);

var pole;
var ball;
var shield;
var player;

//PLAYER2
var pole2;
var shield2;
var player2;
//PLAYER2

function loadContent(){

    pole = new Pole(10);
    pole.setColor("blue");
    pole.setPosition(150, 150);

    ball = new Ball(10);
    ball.setColor("green");
    ball.getBody().setVelocity(5);
    ball.getBody().setVelocityDirection(2.1 * Math.PI);
    ball.setPosition(100, 100);

    shield = new Shield(pole);
    shield.getBody().immovable = true;

    player = new Player("TestUser");
    player.setPole(pole);
    player.setShield(shield);

    pole.setPlayer(player);



    //PLAYER2
    pole2 = new Pole(10);
    pole2.setColor("blue");
    pole2.setPosition(450, 150);

    shield2 = new Shield(pole2);
    shield2.getBody().immovable = true;

    player2 = new Player("TestUser2");
    player2.setPole(pole2);
    player2.setShield(shield2);

    pole2.setPlayer(player2);
    //PLAYER2
}

function update(){
  //updateGameDimensions();
  //input.update();

  ball.update();
  pole.update();
  shield.update();
  player.update();

  if(handleCollision(ball, shield)){
      console.log('hit on server');
  }

  if(handleCollision(ball, pole)){
      pole.isHit();
  }

  ball.getBody().checkWorldBounds(game);


  //PLAYER2
  pole2.update();
  shield2.update();
  player2.update();

  if(handleCollision(ball, shield2)){
      console.log('hit on server');
  }

  if(handleCollision(ball, pole2)){
      pole2.isHit();
  }
  //PLAYER2

  //parentDraw();

  drawToClients();
  drawToMainScreen();
}

function drawToClients(){
  io.of('/player').emit('UpdateBall', ball.getPosition());
};

function drawToMainScreen(){
  if(mainScreenSocket){
    mainScreenSocket.emit('drawBall', ball.getPosition());
    mainScreenSocket.emit('drawShield', {x: shield.getMouseX(), y: shield.getMouseY()});
    //PLAYER 2
    console.log({x: shield2.getMouseX(), y: shield2.getMouseY()});
    mainScreenSocket.emit('drawShield2', {x: shield2.getMouseX(), y: shield2.getMouseY()});
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
var canvasWidth = 300;
var canvasHeight = 300;
var maximumCol;
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

  updateMainScreenCanvasSize();
  log();

  socket.on('shieldHit', function (data){
    console.log('shildhit on ' + socket.id);
  });

  if(!PLAYER1){
    PLAYER1 = true;
    socket.on('mouseMove', function (data){
      //console.log(data)
      shield.setMousePos(data.x, data.y);
    });
  } else {
    console.log('jher')
      socket.on('mouseMove', function (data){
      //console.log(data)
      shield2.setMousePos(data.x+300, data.y);
    });
  }

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
}