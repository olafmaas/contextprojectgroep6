var port = 1337
var server = 'http://localhost'
var socket = io.connect(server+":"+port);
var clientList;

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
	sendMessage();
}

window.onmousemove = handleMouseMove;
