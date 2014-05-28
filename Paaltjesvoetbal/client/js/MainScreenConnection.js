//Make socket.io connection
var port = 5050;
var server = 'http://localhost';
var socket = io.connect(server+":"+port).of('/mainscreen');

//Basic socket listeners
socket.on('connect_failed', function (reason){ 
	console.error('connect_failed: ', reason);
});

socket.on('error', function (reason){
	console.error('Error: ', reason);
});

socket.on('connect', function (){
	console.info('Successfully established a working connection');
	//Send fullscreen size naar de server
	socket.emit('screenSizeMainScreen', {height: screen.height, width: screen.width});
});

socket.on('message', function (message, callback) {
		console.log('Message from server: ' + message);
});

socket.on('disconnect', function (data){
	console.info('Disconnected from server')
});

//Game updates
socket.on('drawBall', function (data) {
	//console.log("X: " + data.x + "Y: " + data.y + " | (mainscreenconnection:31)");
	balls.getMember(0).setPosition(data.x, data.y);
});

socket.on('drawShield', function (data) {
	playerData[data.id].shield.setAngle(data.angle);
});

socket.on('newCanvasSize', function (data) {
	game.setWidth(data.width);
	game.setHeight(data.height);
});

socket.on('newPlayer', function (data) {
	makePlayerObjects(data);
});

var playerData = {};
var canvasWidth = 300;
var nrOfPlayers = 0;

function makePlayerObjects(data){
	var pole = new Pole(10);
	pole.setColor("blue");
	pole.setPosition(data.polePos.x, data.polePos.y);

	poles.addMember(pole);
	poles.addCollision(pole, balls, pole.isHit, pole);

	var shield = new Shield(pole);
	shield.getBody().immovable = true;
	shields.addMember(shield);
	shield.setColor("white");
	shields.addCollision(shield, balls, null, null);

	var player = new Player(data.id);
	player.setPole(pole);
	player.setShield(shield);
	pole.setPlayer(player);
	players.addMember(player);

	playerDataObject = new PlayerDataObject(socket, data.id, player, pole, shield)
	playerData[data.id] = playerDataObject;
};
