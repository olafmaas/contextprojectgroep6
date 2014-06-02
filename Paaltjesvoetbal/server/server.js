var io = require('socket.io').listen(5050);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

var PlayerDataObject = require('./PlayerDataObject.js');
var Client= require('./lib/Client.js');
var GameGrid = require('./lib/GameGrid.js');
var GroupManager = require('./lib/GroupManager.js');
var Log = require('./lib/LogHandler.js');
var PlayerFactory = require('./lib/PlayerFactory.js');
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
		console.log('Player connected');
		sh.handlePlayerConnection(socket);
	}
	else{
		socket.send('Game is full!');
		socket.disconnect();
	} 
});

