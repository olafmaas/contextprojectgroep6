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
//TODO: ID instead of index
socket.on('drawBall', function (data, index) {
	if(balls.getMember(index) != undefined)
		balls.getMember(index).setPosition(data.x, data.y);
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

//Listener which waits for an added ball from socketHandler
socket.on('BallAdded', function (color){
	createBall(color);
});

//Listener for powerup
socket.on('newPowerup', function (data) {
	makePowerup(data);
});

function makePowerup(data){
	data.type = Math.floor(Math.random()*4);
	var p = game.instantiate(new Powerup(data.radius, data.type));
	p.setPosition(200, 200);
}

socket.on('removePlayer', function (socketID){	
	var client = playerData[socketID];
	// //group("Balls").removeMember(client.ball);	//TODO remove ball
	poles.removeMember(client.pole);
	shields.removeMember(client.shield);
	players.removeMember(client.player);
	game.remove(client.pole);
	game.remove(client.shield);
	game.remove(client.player);
	delete playerData[socketID]; 
});

var playerData = {};
var canvasWidth = 300;
var nrOfPlayers = 0;

function createBall(color){
	var ball = game.instantiate(new Ball(10));
	ball.setPosition(100, 100);

	ball.setColor(color);

	balls.addMember(ball);
}

var pole;
var shield;
var player;

function makePlayerObjects(data){
	pole = game.instantiate(new Pole(10));
	pole.setColor("blue");
	pole.setPosition(data.polePos.x, data.polePos.y);
	poles.addMember(pole);

	shield = game.instantiate(new Shield(pole));
	shield.getBody().immovable = true;
	shields.addMember(shield);
	shield.setColor("white");

	player = game.instantiate(new Player(data.id));
	player.setPole(pole);
	player.setShield(shield);
	pole.setPlayer(player);
	players.addMember(player);

	playerDataObject = new PlayerDataObject(socket, data.id, player, pole, shield)
	playerData[data.id] = playerDataObject;
};
