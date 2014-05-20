var io = require('socket.io').listen(5050);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

var Game = require('../game/Game.js');
var Ball = require('../game/Ball.js');

var ball;
var game = new Game(loadContent, update, drawToClients);

function loadContent(){
  ball = new Ball(10);
  ball.getBody().setVelocity(5);
  ball.getBody().setVelocityDirection(-1.75 * Math.PI);
  ball.setPosition(150, 150);
}

function update(){
  ball.update();
  ball.getBody().checkWorldBounds(game);
  drawToClients();
}

function drawToClients(){
  io.of('/player').emit('UpdateBall', ball.getPosition());
  if(mainScreenSocket){
    mainScreenSocket.emit('draw', ball.getPosition());
  }
}

var mainScreenSocket;
var playerSockets = {};
var maximumPlayers = 0;

// GAME EN GRID GEBEUREN
var canvasWidth = 300;
var canvasHeight = 300;
var maximumCol;
var grid = new Array();
grid.push(new Array());
var dx = 4;
var dy = 4;
var y = 150;
var x = 10;


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
    game.setWidth(data.width);
    game.setHeight(data.height);
    game.setWidth(600);
    game.setHeight(300);
  });

  //Handle MainScreen Disconnet
  socket.on('disconnect', function (data){
    console.log('MainScreen disconnected');
    mainScreenSocket = null;
  });
};

function updateMainScreenCanvasSize(){
  game.setWidth(grid[0].length * canvasWidth);
  game.setHeight(grid.length * canvasHeight);
  if(mainScreenSocket){
    mainScreenSocket.emit('newCanvasSize', {width: grid[0].length * canvasWidth, height: grid.length * canvasHeight});
  }
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

  socket.on('shieldHit', function (data){
    console.log(data);
  });

  //Handle Client Disconnet
  socket.on('disconnect', function (data){
    console.log('Client disconnected');
    delete playerSockets[socket.id];

    grid[y][x] = -1;
  });
};
