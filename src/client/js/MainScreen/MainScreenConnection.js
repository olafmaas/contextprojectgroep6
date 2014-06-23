function MainScreenSocketHandler(){

	var socket = io.connect(Settings.server+":"+Settings.port).of('/mainscreen');
	var PUcontroller = new PowerUpController();
	var Pcontroller = new PlayerController();
	var Bcontroller = new BallController();
	var playerData = {};

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

	socket.on('updateCanvasSize', function (data) {
		game.setWidth(data.width);
		game.setHeight(data.height);
	});

	socket.on('updateScores', function (scores){
		hview.updateScores(scores);
	});

	socket.on('updateShieldAngle', function (data) {
		playerData[data.id].shield.setAngle(data.angle);
	});

	////////////////////
	// Player updates //
	////////////////////

	socket.on('newPlayer', function (data) {
		var res = Pcontroller.createPlayerObjects(data, socket);
		playerData[data.id] = res;
		playerData[data.id].pole.indicateJoin();
	});

	socket.on('removePlayer', function (socketID){	
		var client = playerData[socketID];	
		Pcontroller.removePlayerObjects(client);
		delete playerData[socketID]; 
	});

	socket.on('changePlayerPosition', function (data) {
		Pcontroller.updatePostition(data);
	});

	socket.on('poleIsHit', function (_pid) {
		Pcontroller.isHit(_pid);
	});

	/////////////////////
	// Powerup updates //
	/////////////////////	

	socket.on('powerupSpawned', function (_pid, _ptype, _plocation){
		PUcontroller.createPowerup(_pid, _ptype, _plocation);
	});

	socket.on('powerupClicked', function (_pid, _ptype) {
		PUcontroller.powerupClicked(_pid, _ptype);
	});

	//////////////////
	// Ball Updates //
	//////////////////
	//Listener which waits for an added ball from socketHandler
	socket.on('newBall', function (data){
		Bcontroller.create(data);
	});

	socket.on('removeBall', function (globalID){
		Bcontroller.remove(globalID);
	})

	socket.on(e.updateBall, function (data, index) { //TODO: ID instead of index
		Bcontroller.update(data, index);
	});

	socket.on('updateTop', function (newRanking) {
	
		// Set color, points and radius to that of a normal player
		for(i = 0; i < players.getMemberLength(); i++){
			var player = players.getMember(i);
			
			if(player != -1){
				player.getPole().setColor(Settings.pole.color);
				
				if(player.getPowerup() == null){
					player.getPole().setRadius(Settings.pole.size);
				}
			}
		}
		
		// Modify players in highscore
		var count = Settings.highScore.top;
		var colors = Settings.highScore.colors;
		
		for(i = 0; i < newRanking.length; i++){
			var player = players.getMemberByGlobalID(newRanking[i]);
			
			if(player != -1){
				player.getPole().setColor(colors[i]);
				
				if(player.getPowerup() == null){
					player.getPole().setRadius(Settings.pole.size + count*2);
				}
			}
			count--;
		}
	});

}
