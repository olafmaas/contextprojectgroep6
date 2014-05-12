var io = require('socket.io').listen(1337)
var clientList = {};
var idList = new Array();


io.sockets.on('connection', function (socket) {
  
  clientList[socket.id] = socket;
  idList.push(socket.id);

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
  	delete clientList[socket.id];
  	idList.splice(idList.indexOf(socket.id), 1);
  })
});