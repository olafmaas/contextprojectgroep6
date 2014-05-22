var port = 5050
var server = 'http://localhost'
var socket = io.connect(server+":"+port).of('/mainscreen');

socket.on('connect_failed', function (reason){ 
  console.error('connect_failed: ', reason);
});

socket.on('error', function(reason){
  console.error('Error: ', reason);
});

socket.on('connect', function (){
  console.info('Successfully established a working connection');
  socket.emit('screenSizeMainScreen', {height: screen.height, width: screen.width});
});

socket.on('message', function (message, callback) {
    console.log('Message from server: ' + message);
})

socket.on('disconnect', function(data){
  console.info('Disconnected from server')
});


socket.on('drawBall', function (data) {
  ball.setPosition(data.x, data.y);
});

socket.on('drawShield', function (data) {
  //console.log(data);
  shield.setMousePos(data.x, data.y);
  //console.log(input.getMouseX());
});

socket.on('drawShield2', function (data) {
  //console.log(data);
  shield2.setMousePos(data.x+300, data.y);
  //console.log(input.getMouseX());
});

socket.on('newCanvasSize', function (data) {
  game.setWidth(data.width);
  game.setHeight(data.height);
})
