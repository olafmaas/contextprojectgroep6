function PlayerSocketHandler() {

	var socket = io.connect(Settings.server+":"+Settings.port).of('/player');
	var PUController = new PowerUpController();
	var BController = new BallController();
	var leftOffset = 0; 
	var topOffset = 0;

	///////////////////
	// Player Change //
	///////////////////

	socket.on('userNameInUse', function (){
		showError("Username is already in use.");
	});

	socket.on('showPlayerName', function (_name){
		player.setName(_name);
		player.setScore(0);
		nameLabel.setText(_name);

		//Remove the username part
		var elem = document.getElementById("removeAfterStart");
		elem.outerHTML = "";
		//Make the canvas visible for the user
		var gameElem = document.getElementById("gameCanvas");
		gameElem.style.display="block";
	});

	this.checkName = function (_name){
		//Emit to sockethandler
		socket.emit('userName', _name);
	}

	//////////
	// Misc //
	//////////

	socket.on('playAudio', function (trackName){
		audioManager.play(trackName);
	})


	socket.on('canvasPos', function (data){
		leftOffset = data.left;
		topOffset = data.top;
	});

	//////////////////
	// Game updates //
	//////////////////

	///////////////////
	// Update Shield //
	///////////////////

	window.onmousemove = sendShieldAngle;
	window.ontouchmove = sendShieldAngle;

	function sendShieldAngle() {
		if(shield != undefined){
			socket.emit('shieldAngle', shield.getAngle());
		}
	};

	//////////////////
	// BallHandling //
	//////////////////

	//Waits for a 'newBall' emit from drawhandler
	socket.on('addBall', function (data) {
		BController.create(data);
	});

	socket.on(e.updateBalls, function (ballData) { //TODO: ID instead of index
		BController.update(ballData, leftOffset, topOffset);
	});

	socket.on('removeBall', function (gid) {
		BController.remove(gid);
	});

	//////////////
	// PowerUps //
	//////////////

	socket.on('addPowerup', function () {
		res = PUController.createPowerup(leftOffset, topOffset);
		socket.emit('powerupSpawned', res.t, res.position)		
	});

	socket.on('newPlayer', function (_id){
		player.setGlobalID(_id);
	});

	window.ontouchstart = handleTouchStart;
	window.onmousedown = handleMouseDown;

	function handleMouseDown(e){
		input.mouseMoveListener(e);
		var res = PUController.checkPowerup(mouseX, mouseY);
		if(res){
			socket.emit('powerupClicked', res.gid, res.t);
		}
		
	};

	function handleTouchStart(e){
		var touch = e.changedTouches[0]; //only first finger will be registered.
		var res = PUController.checkPowerup(touch.screenX, touch.screenY);
		if(res){
			socket.emit('powerupClicked', res.gid, res.t);
		}
	};

	////////////////
	// Highscores //
	////////////////

	socket.on('poleIsHit', function (data){
		if(data) pole.isHit();
	})

	socket.on('updateTop', function (data) {
		
		// Set color, points and radius to that of a normal player
		player.getPole().setColor(Settings.pole.color);
		player.setPoints(Settings.player.points);
				
		if(player.getPowerup() == null){
			player.getPole().setRadius(Settings.pole.size);
		}
		
		// Modify if player is in highscore
		var count = Settings.highScore.top;
		var colors = Settings.highScore.colors;
		
		for(i = 0; i < data.length; i++){
			if(player.getGlobalID() == data[i]){
				player.getPole().setColor(colors[i]);
				player.setPoints(Settings.player.points + (Settings.player.step * count)); //Set points according to position in the highscore top
				
				if(player.getPowerup() == null){
					player.getPole().setRadius(Settings.pole.size + count*2);
				}
			}
			count--;
		}
	});

	socket.on('updateScoreHit', function (_score){
		player.incrementScore(_score);
	});

	socket.on('updateHighscore', function (){
		highscoreLabel.setText('Highscore: ' + player.getHighscore());
	})




	////////////////////////////
	// Basic socket listeners //
	////////////////////////////

	function showError (_error){
		var elem = document.getElementById("error");
		elem.innerHTML = _error;
	}

	socket.on('connect_failed', function (reason){ 
		console.error('connect_failed: ', reason);
	});

	socket.on('error', function (reason){
		console.error('Error: ', reason);
	});

	socket.on('connect', function (){
		console.info('Successfully established a working connection');
	});

	socket.on('message', function (message, callback) {
	    console.log('Message from server: ' + message);
	});

	socket.on('disconnect', function (data){
		console.info('Disconnected from server');
	});

}
