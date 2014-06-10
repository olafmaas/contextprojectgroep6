var socket = io.connect(Settings.server+":"+Settings.port).of('/mainscreen');

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

socket.on('updateScores', function (scores){

    var scoreText = "";
    for (i=0; i < scores.length; ++i) {
        scoreText += scores[i].Score + ': ' + scores[i].Name + " |----| ";
    }
	document.getElementById("highScores").innerHTML = scoreText; //JSON.stringify(highScores);
});

socket.on('updateTop', function (data) {
	
	for(i = 0; i < data.oldhs.length; i++){
		var player = players.getMemberByGlobalID(data.oldhs[i]);
		player.getPole().setColor('Blue');
	}
	
	if(data.newhs.length < 5){
		var count = Settings.highScore3.top;
	}
	else{
		var count = Settings.highScore.top;
	}
	
	for(i = 0; i < data.newhs.length; i++){
		var player = players.getMemberByGlobalID(data.newhs[i]);
		player.getPole().setColor('White');
		player.getPole().setRadius(Settings.pole.size + count*2);
		count--;
	}
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

socket.on(e.updateBall, function (data, index) { //TODO: ID instead of index
	if(balls.getMember(index) != undefined)
		balls.getMember(index).setPosition(data.x, data.y);
});

socket.on('updateShieldAngle', function (data) {
	playerData[data.id].shield.setAngle(data.angle);
});

socket.on('powerupClicked', function (_pid, _ptype) {
	var p = players.getMemberByGlobalID(_pid);
	if(p != -1){ //if player has been found
		var powerup = new Powerup(Settings.powerupSize, _ptype); //NOT game.instantiate!!, as it should not exists outside this function!
		p.setPowerup(powerup);
	}
});

function createPlayerObjects(data){
	var pole;
	var shield;
	var player;

	pole = game.instantiate(new Pole(Settings.pole.size));
	pole.setColor(Settings.pole.color);
	pole.setPosition(data.polePos.x, data.polePos.y);
	poles.addMember(pole);

	shield = game.instantiate(new Shield(pole));
	shield.getBody().immovable = true;
	shields.addMember(shield);
	shield.noCalc();
	shield.setColor(Settings.shield.color);

	player = game.instantiate(new Player(data.id));
	player.setPole(pole);
	player.setShield(shield);
	player.setGlobalID(data.gpid);
	pole.setPlayer(player);
	players.addMember(player);

	playerDataObject = new Client(socket, data.id, player, pole, shield)
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
	var ball = game.instantiate(new Ball(Settings.ball.size));
	ball.setPosition(Settings.ball.x, Settings.ball.y);
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
};
