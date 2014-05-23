//Make socket.io connection
var port = 5050;
var server = 'http://localhost';
var socket = io.connect(server+":"+port).of('/player');

//Basic socket listeners
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

socket.on('userName', function(data){
	if(!data.free){
		userName = prompt("Please enter your name","User"+Math.floor(Math.random()*10000));
		player.setName(userName);
		socket.emit('userName', {name: player.getName()});
	}
})

//Game updates
var left = 0; //MOVE TO SERVER
var topf = 0; //MOVE TO SERVER
//MOVE TO SERVER
socket.on('canvasPos', function (data){
	left = data.left;
	topf = data.top;
})

socket.on('UpdateBall', function (pos) {
  ball.setPosition(pos.x - left, pos.y - topf);
})

socket.on('UpdateBallAngle', function (angle) {
  ball.getBody().setVelocityDirection(angle);
})

function sendShieldAngle() {
  socket.emit('shieldAngle', shield.getAngle());
}

window.onmousemove = sendShieldAngle;

function sendBallAngle() {
	socket.emit('ballAngle', ball.getBody().getVelocityDirection());
}
