//Make socket.io connection
var port = 5050;
var server = 'http://localhost';
var socket = io.connect(server+":"+port).of('/mainscreen');

//Basic socket listeners
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

//Game updates
socket.on('drawBall', function (data) {
	ball.setPosition(data.x, data.y);
});

socket.on('drawShield', function (angle) {
	shield.setAngle(angle);
});

socket.on('drawShield2', function (angle) {
	shield2.setAngle(angle);
});

socket.on('newCanvasSize', function (data) {
	game.setWidth(data.width);
	game.setHeight(data.height);
});
