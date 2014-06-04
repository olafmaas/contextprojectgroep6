var socket = io.connect(server+":"+port).of('/player');

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

socket.on('canvasPos', function (data){
	leftOffset = data.left;
	topOffset = data.top;
});

//Waits for a 'newBall' emit from drawhandler
socket.on('addBall', function (data) {
	console.log("Ball Added")
	createBall(data);
});

socket.on('updateBalls', function (ballData) { //TODO: ID instead of index
	lastBall = ballData;
	var d = new Date();
	var n = d.getTime();
	console.log("Update Received" + n);
	for(var b in ballData){
		getBall(b).setPosition(ballData[b].x - leftOffset, ballData[b].y - topOffset);
	}
});

//Listener for powerup
socket.on('dropPowerup', function (data) {
	createPowerup(data);
});

socket.on('removeBall', function (nr, colors) {
	//TODO
});

window.onmousemove = sendShieldAngle;
window.ontouchmove = sendShieldAngle;

function sendShieldAngle() {
	if(shield != undefined){
		socket.emit('shieldAngle', shield.getAngle());
	}
};

function getBall(_gid) {
	for(i = 0; i < balls.getMember.length; i++){
		if(balls.getMember(i).getGlobalID() == _gid){
			return balls.getMember(i);
		}
	}
}

//Create nr of ball with the corresponding colors in the color-array
function createBall(data){
	var ball = game.instantiate(new Ball(10));
	ball.setPosition(data.pos.x, data.pos.y);
	ball.setColor(data.color);
	ball.setGlobalID(data.gid);
	//ball.getBody().setVelocity(5);

	balls.addMember(ball);
};

function createPowerup(data){
	data.type = Math.floor(Math.random()*4);
	var p = game.instantiate(new Powerup(data.radius, data.type));
	
	var dx = Math.floor(Math.random()*225)
	var dy = Math.floor(Math.random()*175)
	dx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	dy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	
	p.setPosition(data.position.x + dx, data.position.y + dy);
	
};
