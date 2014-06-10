var S = require('../common/Settings.js');
var SocketHandler = require('./SocketHandler.js');
var Server = require('./ServerGame.js');
var io = require('socket.io').listen(S.port);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

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
		console.log('Player connected - id: ' + socket.id);
		sh.handlePlayerConnection(socket);
	}
	else{
		socket.send('Game is full!');
		socket.disconnect();
	} 
});
