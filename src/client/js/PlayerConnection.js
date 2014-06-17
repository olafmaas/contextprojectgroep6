
function startSocket() {

	var socket = io.connect(Settings.server+":"+Settings.port).of('/player');

	this.checkName = function (_name){
		//Emit to sockethandler
		socket.emit('userName', _name);
	}

	function showError (_error){
		var elem = document.getElementById("error");
		elem.innerHTML = _error;
	}

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
	});

	socket.on('message', function (message, callback) {
	    console.log('Message from server: ' + message);
	});

	socket.on('disconnect', function (data){
		console.info('Disconnected from server');
	});

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

	socket.on('updateScoreHit', function (_score){
		player.incrementScore(_score);
	});

	socket.on('updateHighscore', function (){
		highscoreLabel.setText('Highscore: ' + player.getHighscore());
	})

	//////////////////
	// Game updates //
	//////////////////

	var leftOffset = 0; 
	var topOffset = 0;
	var lastBall;
	var powerupRemovalTimer = null;
	var icon = null;

	socket.on('canvasPos', function (data){
		leftOffset = data.left;
		topOffset = data.top;
	});

	//Waits for a 'newBall' emit from drawhandler
	socket.on('addBall', function (data) {
		if(getBallIndex(data.gid) == -1){
			createBall(data);
		}
	});

	socket.on(e.updateBalls, function (ballData) { //TODO: ID instead of index
		lastBall = ballData;
		var d = new Date();
		var n = d.getTime();
		for(var b in ballData){
			var i = getBallIndex(b)
			if(i > -1){
				balls.getMember(i).setPosition(ballData[b].x - leftOffset, ballData[b].y - topOffset);
			}else{
				console.log("Ball with gid" + b + "not found.")
			}
		}
	});

	socket.on('newPlayer', function (_id){
		player.setGlobalID(_id);
	});

	//Listener for powerup
	socket.on('addPowerup', function (data) {
		createPowerup(data);
	});

	socket.on('removeBall', function (gid) {
		removeBall(gid);
	});

	socket.on('poleIsHit', function (data){
		if(data) pole.isHit();
	})

	socket.on('playAudio', function (trackName){
		audioManager.play(trackName);
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
		
		for(i = 0; i < data.newhs.length; i++){
			if(player.getGlobalID() == data.newhs[i]){
				player.getPole().setColor(colors[i]);
				player.setPoints(Settings.player.points + (Settings.player.step * count)); //Set points according to position in the highscore top
				
				if(player.getPowerup() == null){
					player.getPole().setRadius(Settings.pole.size + count*2);
				}
			}
			count--;
		}
	});


	window.ontouchstart = handleTouchStart;
	window.onmousemove = sendShieldAngle;
	window.ontouchmove = sendShieldAngle;
	window.onmousedown = handleMouseDown;

	function handleMouseDown(e){
		input.mouseMoveListener(e);
		checkPowerup(mouseX, mouseY);
	};

	function handleTouchStart(e){
		var touch = e.changedTouches[0]; //only first finger will be registered.
		checkPowerup(touch.screenX, touch.screenY);
	};

	function sendShieldAngle() {
		if(shield != undefined){
			socket.emit('shieldAngle', shield.getAngle());
		}
	};

	function getBallIndex(_gid) {
		for(var i = 0; i < balls.getMembers().length; i++){
			if(balls.getMember(i).getGlobalID() == _gid){
				return i;
			}
		}
		return -1; 
	}

	function removeBall(_gid) {
		var ind = getBallIndex(_gid);
		if(ind > -1){
			game.remove(balls.getMembers()[ind]);
			balls.removeMember(balls.getMembers()[ind]);
		}else{
			console.log("404 Ball Not Found");
		}
		return;
	}

	//Create nr of ball with the corresponding colors in the color-array
	function createBall(data){
		var ball = game.instantiate(new Ball(Settings.ball.size));
		ball.setPosition(data.pos.x, data.pos.y);
		ball.setColor(data.color);
		ball.setGlobalID(data.gid);
		//ball.getBody().setVelocity(5);

		balls.addMember(ball);
	};

	//The powerup stuff should be placed somewhere else I think..
	function createPowerup(data){
		if(player.getGlobalID() == data.id){

			if(powerup != null) removePowerup();
			var type = randomPowerType(); //choose a radom type
			powerup = game.instantiate(new Powerup(Settings.powerupSize, type));
			
			var chooser = Math.round(Math.random()); //random 0 or 1
			
			var width = Settings.canvasWidth;
			var height = Settings.canvasHeight;
			var shieldRadius = Settings.shield.radius;
			var powerupSize = Settings.powerupSize;
			
			var dx = Math.round(Math.random() * ((width - powerupSize) - (width/2 + shieldRadius + 2*powerupSize)) + ((shieldRadius + 2*powerupSize) * (1-chooser)));
			var dy = Math.round(Math.random() * ((height - powerupSize) - (height/2 + shieldRadius + 2*powerupSize)) + ((shieldRadius + 2*powerupSize) * chooser));
			
			if(Math.round(Math.random())) //randomly decide whether to make x-coordinate negative
				dx *= -1;
			if(Math.round(Math.random())) //randomly decide whether to make y-coordinate negative
				dy *= -1;

			powerup.setPosition(Settings.canvasWidth/2 + dx, Settings.canvasHeight/2 + dy);
			createIcon(type); //temporarily disabled

			powerupRemovalTimer = setTimeout(removePowerup, Settings.removalTime*1000); //set timer so powerup is removed after x seconds.

			powerupCoolDown((Settings.removalTime * 1000) / 90); //90 because we increment the angle by 4 (360/90 = 4)
		}
	};

	function randomPowerType(){

		var random = Math.random();
		var chanceOfSmallShield = Settings.smallShield.chance;
		var chanceOfBigShield = Settings.bigShield.chance;
		var chanceOfSmallPole = Settings.smallPole.chance;
		var chanceOfBigPole = Settings.bigPole.chance;
		var chanceOfRevert = Settings.revertShield.chance;
		
		var sum = chanceOfSmallShield + chanceOfBigShield + chanceOfSmallPole + chanceOfBigPole + chanceOfRevert;
		
		if(random < chanceOfSmallShield/sum){
		 	return e.smallShield;
		}
		else if(random < (chanceOfSmallShield + chanceOfBigShield)/sum){
			return e.bigShield;
		}
		else if(random < (chanceOfSmallShield + chanceOfBigShield + chanceOfSmallPole)/sum){
			return e.smallPole;
		}
		else if(random < (chanceOfSmallShield + chanceOfBigShield + chanceOfSmallPole + chanceOfBigPole)/sum){
			return e.bigPole;
		}
		else{
			return e.revertShield;
		}
	};

	//
	function createIcon(_type){
		switch(_type){
			case e.smallShield:
			icon = game.instantiate(new Sprite(Settings.smallShield.path));

			case e.bigShield:
			icon = game.instantiate(new Sprite(Settings.bigShield.path));

			case e.smallPole:
			icon = game.instantiate(new Sprite(Settings.smallPole.path));

			case e.bigPole:
			icon = game.instantiate(new Sprite(Settings.bigPole.path));

			case e.revertShield: 
			icon = game.instantiate(new Sprite(Settings.revertShield.path));
		}

		var size = Settings.powerupSize-2;
		icon.setPosition(powerup.getPosition());
		icon.setSize({x: size*2, y: size*2});
		icon.setAnchor({x: -size, y: -size});
	};

	function checkPowerup(_x, _y){
		if(powerup != null){ //only when a powerup is present!
			if(!scale) scale = 1;
			var powerupPos = powerup.getPosition();

			//Check whether distance between powerup center and click is less than radius
			var inX = Math.abs(powerupPos.x*scale - _x) <= powerup.getRadius();
			var inY = Math.abs(powerupPos.y*scale - _y) <= powerup.getRadius();

			if(inX && inY){
				clearTimeout(powerupRemovalTimer); //remove the timer
				player.setPowerup(powerup); 
				playerCoolDown((powerup.getTimer().getTime() * 1000) / 90);

				socket.emit('powerupClicked', player.getGlobalID(), powerup.getType());

				removePowerup();
			}
		}
	};

	/**
	* Removes the powerup + icon from the user's screen
	* 
	* @method PlayerConnection#removePowerup
	*/
	function removePowerup(){
		if(powerup != null){
			game.remove(powerup);
			powerup = null;
		}
		if(icon != null) { 
			game.remove(icon);
			icon = null;
		}
	}

	var powerupCDTimer = null;
	var playerCDTimer = null;

	/**
	* Instantiates the cooldown belonging to a powerup. 
	* It also removes any previous timeout that is present (to avoid cooldowns going to quick)
	*
	* @method PlayerConnection#powerupCoolDown
	* @param {number} _time - The time in milliseconds at which the setTimeout function is called
	*/
	function powerupCoolDown(_time) {
		clearTimeout(powerupCDTimer); //Clear any old poweruptimeout that might be present
        powerup.setCDAngle(0);
        powerupCDTimer = setTimeout(function() { coolDown(powerup, _time); }, _time);
	}
	
	/**
	* Instantiates the cooldown belonging to a player after a powerup has been activated. 
	* It also removes any previous timeout that is present (to avoid cooldowns going to quick)
	*
	* @method PlayerConnection#playerCoolDown
	* @param {number} _time - The time in milliseconds at which the setTimeout function is called
	*/
	function playerCoolDown(_time){
		clearTimeout(playerCDTimer); //Clear any old playertimeout that might be present
    	pole.setCDAngle(0);		
    	playerCDTimer = setTimeout(function() { coolDown(pole, _time); }, _time);
    }

    /**
    * The cooldown function that is called by playerCoolDown and powerupCoolDown
    * It handles the actual coolDown and makes sure the angles are set and the function
    * is called again (until the cooldown is over)
    *
    * @method PlayerConnection#coolDown
    * @param {Object} _object - The object which has the cooldown
    * @param {numer} _time - The time in milliseconds at which the setTimout function is called
    */
	function coolDown(_object, _time){
		if(_object != null){
			_object.incrementCDAngle(4);
			if(_object.getCDAngle() < 360) {
				if(_object instanceof Pole) {
					playerCDTimer = setTimeout(function() { coolDown(_object, _time); }, _time);
				} else {
					powerupCDTimer = setTimeout(function() { coolDown(_object, _time); }, _time);
				}
			}
		}
	}
}
