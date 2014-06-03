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

socket.on('userName', function(free){
	if(!free){
		userName = prompt("Please enter your name", "User"+Math.floor(Math.random()*10000));
		player.setName(userName); 
		socket.emit('userName', userName); //player.getName());
	}
});

//Game updates
var left = 0; //MOVE TO SERVER
var topf = 0; //MOVE TO SERVER
//MOVE TO SERVER

socket.on('canvasPos', function (data){
	left = data.left;
	topf = data.top;
})

//TODO: ID instead of index
socket.on('UpdateBall', function (pos, index) {
	if(balls.getMember(index) != null)
		balls.getMember(index).setPosition(pos.x - left, pos.y - topf);
})

//TODO: ID instead of index
socket.on('UpdateBallAngle', function (angle, index) {
	if(balls.getMember(index) != null)
		balls.getMember(index).getBody().setVelocityDirection(angle);
})

socket.on('drawBall', function (data, index) {
	if(balls.getMember(index) != undefined)
		balls.getMember(index).setPosition(data.x, data.y);
})

function sendShieldAngle() {
	if(shield != undefined){
		socket.emit('shieldAngle', shield.getAngle());
	}
}

window.onmousemove = sendShieldAngle;
window.ontouchmove = sendShieldAngle;

function sendBallAngle() {
	for(var i = 0; i < balls.getMemberLength(); i++){
		socket.emit('ballAngle', balls.getMember(i).getBody().getVelocityDirection(), i);
	}
}

//Waits for a 'BallAdded' emit from sockethandler
socket.on('BallAdded', function (nr, colors) {
	createBall(nr, colors);
})

//Create nr of ball with the corresponding colors in the color-array
function createBall(nr, colors){
	for(var i = balls.getMemberLength(); i < nr; i++){
		var ball = game.instantiate(new Ball(10));
		if(i == nr-1) ball.setPosition(100, 100);
		ball.setColor(colors[i]);
		//ball.getBody().setVelocity(5);

		balls.addMember(ball);
	}
}

//TODO: function to remove balls from the list when they are no longer in the screen of the player.
function removeBalls(){

}
