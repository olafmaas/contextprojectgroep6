var io = require('socket.io').listen(1337)

io.sockets.on('connection', function (socket) {
  socket.on('getPoint', function (data) {
  	socket.emit('getPoint',data);
  });
});