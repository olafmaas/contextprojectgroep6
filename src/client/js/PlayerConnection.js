function PlayerSocketHandler() {

	var socket = io.connect(Settings.server+":"+Settings.port).of('/player');
	var PUController = new PowerUpController();
	var BController = new BallController();
	var leftOffset = 0; 
	var topOffset = 0;

	///////////////////
	// Player Change //
	///////////////////

	//Shows an error when the chosen username is already in use
	socket.on('userNameInUse', function (){
		showError("Username is already in use.");
	});

	//Sets the playername and shows the canvas when a username is accepted
	//by the server. It also removes the userform.
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

	//Emits the chosen name to the sockethandler to be checked
	this.checkName = function (_name){
		//Emit to sockethandler
		socket.emit('userName', _name);
	}

	//Shows the error on the screen of the player
	function showError (_error){
		var elem = document.getElementById("error");
		elem.innerHTML = _error;
	}

	//////////
	// Misc //
	//////////

	//Plays the audio
	socket.on('playAudio', function (trackName){
		audioManager.play(trackName);
	})

	//Updates the left- and top offset of the player screen
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

	//When a mouse/finger is dragged across the screen,
	//the shieldangle should be updated
	window.onmousemove = sendShieldAngle;
	window.ontouchmove = sendShieldAngle;

	//Sends the shield angle to the sockethandler
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

	//Updates the position of the balls on the player's screen
	socket.on(e.updateBalls, function (ballData) { 
		BController.update(ballData, leftOffset, topOffset);
	});

	//Removes a given ball from the player's screen
	socket.on('removeBall', function (gid) {
		BController.remove(gid);
	});

	//////////////
	// PowerUps //
	//////////////

	//Calls createPowerup method to create a new powerup
	//and sends the powerup position to the mainscreen
	socket.on('addPowerup', function () {
		res = PUController.createPowerup(leftOffset, topOffset);
		socket.emit('powerupSpawned', res.t, res.position)		
	});

	//Sets the global ID of this player
	socket.on('newPlayer', function (_id){
		player.setGlobalID(_id);
	});

	//For powerups, it should be able to click/tap on them
	window.ontouchstart = handleTouchStart;
	window.onmousedown = handleMouseDown;

	//Handles the mousedown event and checks whether a powerup is clicked.
	//If the powerup is clicked, it is sent to the server
	function handleMouseDown(e){
		input.mouseMoveListener(e);
		var res = PUController.checkPowerup(mouseX, mouseY);
		if(res){
			socket.emit('powerupClicked', res.gid, res.t);
		}	
	};

	//Handles the tap event and checks whether a powerup is tapped.
	//If the powerup is tapped, it is sent to the server.
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

	//When a pole is hit, show it to the player
	socket.on('poleIsHit', function (data){
		if(data) pole.isHit();
	})

	//When a player is in the current highscore top,
	//it handles the new radius and color of the player's pole
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

	//Increments the score of the player
	socket.on('updateScoreHit', function (_score){
		player.incrementScore(_score);
	});

	//Updates the highscore of the player 
	socket.on('updateHighscore', function (){
		highscoreLabel.setText('Highscore: ' + player.getHighscore());
	})

	////////////////////////////
	// Basic socket listeners //
	////////////////////////////

	//Log when a connection fails.
	socket.on('connect_failed', function (reason){ 
		console.error('connect_failed: ', reason);
	});

	//Log when an error occurs
	socket.on('error', function (reason){
		console.error('Error: ', reason);
	});

	//Log when the player is succesfully connected
	socket.on('connect', function (){
		console.info('Successfully established a working connection');
	});

	//Log when a message is received.
	socket.on('message', function (message, callback) {
	    console.log('Message from server: ' + message);
	});

	//Log when a disconnect is received
	socket.on('disconnect', function (data){
		console.info('Disconnected from server');
	});

}
