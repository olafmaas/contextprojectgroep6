var socket = io.connect(server+":"+port).of('/mainscreen');

////////////////////////////
// Basic socket listeners //
////////////////////////////

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


//////////////////
// Game updates //
//////////////////

var playerData = {};

socket.on('updateCanvasSize', function (data) {
	game.setWidth(data.width);
	game.setHeight(data.height);
});

socket.on('newPlayer', function (data) {
	createPlayerObjects(data);
});

//Listener which waits for an added ball from socketHandler
socket.on('newBall', function (data){
	createBall(data);
});

socket.on('removePlayer', function (socketID){		
	removePlayerObjects(socketID);
});

socket.on('removeBall', function (globalID){
	removeBall(globalID);
})

socket.on('updateBall', function (data, index) { //TODO: ID instead of index
	if(balls.getMember(index) != undefined)
		balls.getMember(index).setPosition(data.x, data.y);
});

socket.on('updateShieldAngle', function (data) {
	playerData[data.id].shield.setAngle(data.angle);
});

function createPlayerObjects(data){
	var pole;
	var shield;
	var player;

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

	playerDataObject = new Client(socket, data.id, player, pole, shield, null)
	playerData[data.id] = playerDataObject;
};

function removePlayerObjects(socketID){

	var client = playerData[socketID];

	poles.removeMember(client.pole);
	shields.removeMember(client.shield);
	players.removeMember(client.player);

	game.remove(client.pole);
	game.remove(client.shield);
	game.remove(client.player);
	delete playerData[socketID]; 
};

function createBall(data){
	var ball = game.instantiate(new Ball(10));
	ball.setPosition(100, 100);
	ball.setColor(data.color);
	ball.setGlobalID(data.gid);
	balls.addMember(ball);
};

function removeBall(globalID){
	var members = balls.getMembers();
	for(var i = 0; i < members.length; i++){
		if(members[i].getGlobalID() === globalID){
			game.remove(members[i]);
			balls.removeMember(members[i]);
			return;
		}
	}
	console.log("404 Ball not found")
	return;
}

function createPowerup(data){
	data.type = Math.floor(Math.random()*4);
	//var p = game.instantiate(new Powerup(data.radius, data.type));
	//p.setPosition(data.position.x, data.position.y+30);
};
