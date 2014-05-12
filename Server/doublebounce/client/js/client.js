var port = 5050
var server = 'http://localhost'
var socket = io.connect(server+":"+port);
	sendMessage();
var clientList;

var context;

socket.on('draw', function (data) {
	console.log('draw!');
  context= myCanvas.getContext('2d');
  context.clearRect(0,0,300,300);
  context.beginPath();
  context.fillStyle="#0000ff";
  context.arc(data.x,data.y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
})

socket.on('getPoint', function	(data) {
	document.getElementById('mousePos').innerHTML = "x:"+ data.x + " y:" + data.y;
})

socket.on('clientList', function (data) {
	document.getElementById('clientList').innerHTML = "0:"+data[0]+" 1:"+data[1];
	console.log(data);
})

function sendMessage() {
	socket.emit('getClients');
}

function handleMouseMove(event) {
	socket.emit('getPoint', {x: event.clientX, y: event.clientY})
}

//window.onmousemove = handleMouseMove;
