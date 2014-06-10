var socket = io.connect(Settings.server+":"+Settings.port).of('/player');

////////////////////////////
// Basic socket listeners //
////////////////////////////

socket.on('connect_failed', function (reason){ 
	console.error('connect_failed: ', reason);
});

socket.on('error', function(reason){
	console.error('Error: ', reason);
});

socket.on('connect', function(){
	console.info('Successfully established a working connection');
});

socket.on('message', function (message, callback) {
    console.log('Message from server: ' + message);
});

socket.on('disconnect', function(data){
	console.info('Disconnected from server');
});

socket.on('userName', function(free){
	if(!free){
		userName = prompt("Please enter your name", "User"+Math.floor(Math.random()*10000));
		player.setName(userName); 
		socket.emit('userName', userName); //player.getName());
	}
});

//Sets the name label whenever a valid name is chosen by the player
socket.on('showPlayerName', function(){
	nameLabel.setText(player.getName());
});

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
})

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

		if(powerup != null) game.remove(powerup);
		var type = Math.floor(Math.random() * Settings.nrOfPowerups); //choose a radom type
		powerup = game.instantiate(new Powerup(Settings.powerupSize, type));
		
		var chooser = Math.round(Math.random()); //random 0 or 1
		
		var width = Settings.canvasWidth;
		var height = Settings.canvasHeight;
		var shieldRadius = Settings.shieldRadius;
		var powerupSize = Settings.powerupSize;
		
		var dx = Math.round(Math.random() * ((width - powerupSize) - (width/2 + shieldRadius + 2*powerupSize)) + ((shieldRadius + 2*powerupSize) * (1-chooser)));
		var dy = Math.round(Math.random() * ((height - powerupSize) - (height/2 + shieldRadius + 2*powerupSize)) + ((shieldRadius + 2*powerupSize) * chooser));
		
		if(Math.round(Math.random())) //randomly decide whether to make x-coordinate negative
			dx *= -1;
		if(Math.round(Math.random())) //randomly decide whether to make y-coordinate negative
			dy *= -1;

		powerup.setPosition(Settings.canvasWidth/2 + dx, Settings.canvasHeight/2 + dy);
		createIcon(type);

		powerupRemovalTimer = setTimeout(removePowerup, Settings.removalTime); //set timer so powerup is removed after x seconds.
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

	var size = Settings.powerupSize;
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
			powerup.isClicked();
			player.setPowerup(powerup); //weghalen, want moet door server geregeld worden.

			socket.emit('powerupClicked', player.getGlobalID(), powerup.getType());
			removePowerup();
		}
	}
};

function removePowerup(){
	if(powerup != null){
		game.remove(icon); 
		game.remove(powerup);
		powerup = null;
	}
}
