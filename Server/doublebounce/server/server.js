var io = require('socket.io').listen(5050)
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

//TODO Rooms gebruiken
var mainScreenSocket;
var playerSockets = {};

var canvasWidth = 300;
var canvasHeight = 300;

var maxRowWidth = 2;
var grid = new Array();
grid.push(new Array());

var dx = 4;
var dy = 4;
var y = 150;
var x = 10;

setInterval(draw,10); 

function draw(){
  if( x<0 || x>grid[0].length * canvasWidth){
    dx=-dx;
  }
  if( y<0 || y>grid.length * canvasHeight){
    dy=-dy;
  }
  x+=dx;
  y+=dy;

  //TODO stuur alleen naar de clients die dat kunnen zien.
  io.sockets.emit('draw', {x: x, y:y})
}

io.sockets.on('connection', function (socket) {
  if(!mainScreenSocket){
    console.log('MainScreen connected');
    mainScreenConnects(socket);
  }
  else{
    console.log('Client connected');
    clientConnects(socket);
  }
});

function mainScreenConnects(socket){
  mainScreenSocket = socket;

  //Handle MainScreen Disconnet
  socket.on('disconnect', function (data){
    console.log('MainScreen disconnected');
    mainScreenSocket = null;
  })
};

function clientConnects(socket){ 
  playerSockets[socket.id] = socket;


  var x;
  var y;

  placed = false;
  for (i = 0; i < grid.length; i++) {
    if(grid[i].indexOf(-1) >  -1 || grid[i].length < maxRowWidth) {
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

  socket.emit('canvasPos', {left: x * canvasWidth, top: y*canvasHeight} )

  //Handle Client Disconnet
  socket.on('disconnect', function (data){
    console.log('Client disconnected');

    delete playerSockets[socket.id];
    grid[y][x] = -1;
  })
};
