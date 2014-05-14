var io = require('socket.io').listen(5050)
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

var clientList = {};
var idList = new Array();

var canvasWidth = 300;
var canvasHeight = 300;

var maxRowWidth = 2;
var grid = new Array();
grid.push(new Array());

var dx= 4;
var dy=4;
var y=150;
var x=10;

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

  io.sockets.emit('draw', {x: x, y:y})

}

io.sockets.on('connection', function (socket) {
  var x;
  var y;
  console.log('client connected');

  clientList[socket.id] = socket;
  idList.push(socket.id);
  

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

  //Get data and send it back.
  socket.on('getPoint', function (data) {
    socket.emit('getPoint',data);
  });

  //Return clientList to client
  socket.on('getClients', function (data){
    socket.emit('clientList', idList);
  })

  //Send message to client x
  socket.on('sendToClient', function (data){
    clientList[data.id].emit('messageFromClient', {id: socket.id, message: data});
  })

  //Handle Disconnet
  socket.on('disconnect', function (data){
    console.log('client disconnected');

    delete clientList[socket.id];
    grid[y][x] = -1;
    idList.splice(idList.indexOf(socket.id), 1);
  })
});


