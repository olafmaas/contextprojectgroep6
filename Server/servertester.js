var port = 1337
var server = 'http://localhost'
var socket = io.connect(server+":"+port);

socket.on('getPoint', function	(data) {
	document.getElementById('mousePos').innerHTML = "x:"+ data.x + " y:" + data.y;
})

function handleMouseMove(event) {
	socket.emit('getPoint', {x: event.clientX, y: event.clientY})
}

window.onmousemove = handleMouseMove;
