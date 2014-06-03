var io = require('socket.io').listen(5050);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

var SocketHandler = require('./lib/SocketHandler.js');
var Server = require('./lib/ServerGame.js');

var server = new Server();
var sh = new SocketHandler(server, io);

server.createGame(server.loadContent, sh.update, 0, 0);

io.of('/mainscreen').on('connection', function (socket) {
	if(!sh.hasMainScreen()){
		console.log('MainScreen connected');
		sh.handleMainScreen(socket);
	} 
	else{
		socket.send('There is already a mainScreen.');
		socket.disconnect();
	} 
});

io.of('/player').on('connection', function (socket) {
	if(server.getNumberOfPlayers() < server.getMaxNrOfPlayers()){
		console.log('Player #' + (server.getNumberOfPlayers() + 1) + ' connected');
		sh.handlePlayerConnection(socket);
	}
	else{
		socket.send('Game is full!');
		socket.disconnect();
	} 
});
