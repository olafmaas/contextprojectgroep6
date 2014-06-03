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

socket.on('canvasPos', function (data){
	leftOffset = data.left;
	topOffset = data.top;
});

//Waits for a 'newBall' emit from drawhandler
socket.on('newBall', function (nr, colors) {
	createBall(nr, colors);
})

socket.on('updateBall', function (pos, index) { //TODO: ID instead of index
	if(balls.getMember(index) != null)
		balls.getMember(index).setPosition(pos.x - leftOffset, pos.y - topOffset);
});

socket.on('removeBall', function (nr, colors) {
	//TODO
})

window.onmousemove = sendShieldAngle;
window.ontouchmove = sendShieldAngle;

function sendShieldAngle() {
	if(shield != undefined){
		socket.emit('shieldAngle', shield.getAngle());
	}
};

//Create nr of ball with the corresponding colors in the color-array
function createBall(nr, colors){
	for(var i = balls.getMemberLength(); i < nr; i++){
		var ball = game.instantiate(new Ball(10));
		if(i == nr-1) ball.setPosition(100, 100);
		ball.setColor(colors[i]);
		//ball.getBody().setVelocity(5);

		balls.addMember(ball);
	}
};
