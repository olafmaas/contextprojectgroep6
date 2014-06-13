var S = require('../common/Settings.js');
var SocketHandler = require('./SocketHandler.js');
var ServerGame = require('./ServerGame.js');
var io = require('socket.io').listen(S.port);
io.set('log level', 2);   // 0 - error | 1 - warn | 2 - info | 3 - debug

var sg = new ServerGame();
var sh = new SocketHandler(sg, io);
sg.addSH(sh);

sg.createGame(sg.loadContent, sh.update, 0, 0);

io.of('/mainscreen').on('connection', function (socket) {
	if(!sh.hasMainScreen()){
		console.log('MainScreen connected');
		sh.setMainScreenListeners(socket);
		sg.addMainScreen();
	} 
	else{
		socket.send('There is already a mainScreen.');
		socket.disconnect();
	} 
});

io.of('/player').on('connection', function (socket) {
	if(sg.getNumberOfPlayers() < sg.getMaxNrOfPlayers()){
		console.log('Player connected - id: ' + socket.id);
		sh.handlePlayerConnection(socket);
		sg.addClient(socket.id, socket); //TODO socket moet verwijderd worden. maar is nu nog nodig voor de grid
	}
	else{
		socket.send('Game is full!');
		socket.disconnect();
	} 
});
