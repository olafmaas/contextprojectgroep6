var io = require('socket.io').listen(5050)

 var clientList = {};
var idList = new Array();

var dx= 4;
var dy=4;
var y=150;
var x=10;

io.sockets.on('connection', function (socket) {
  console.log('client connected');

  clientList[socket.id] = socket;
  idList.push(socket.id);

  for(id in idList){
    console.log(idList[id]);
  }

  setInterval(draw,10); 

  function draw(){
    if( x<0 || x>600){
      dx=-dx;
    }
    if( y<0 || y>300){
      dy=-dy;
    }
    x+=dx;
    y+=dy;

    
    if(idList.length == 2){
      if(x<300){
        clientList[idList[0]].emit('draw', {x: x, y: y});
      }
      else{
        clientList[idList[1]].emit('draw', {x: x-300, y: y});
      }
    }
    //socket.emit('draw', {x: x, y: y});
  }

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
    idList.splice(idList.indexOf(socket.id), 1);
  })
});


