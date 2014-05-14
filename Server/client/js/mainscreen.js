var port = 5050
var server = 'http://localhost'
var socket = io.connect(server+":"+port);

socket.emit('screenSizeMainScreen', {height: screen.height, width: screen.width});

var canvasSize = {
  width: 100,
  height: 100
}

var context;

socket.on('draw', function (data) {
  context = myCanvas.getContext('2d');
  context.clearRect(0, 0, canvasSize.width, canvasSize.height);

  context.beginPath();
  context.fillStyle="#0000ff";
  context.arc(data.x ,data.y ,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
})

socket.on('newCanvasSize', function (data) {
  canvasSize.width = data.width;
  canvasSize.height = data.height;

  canvas = document.getElementById('myCanvas');
  canvas.setAttribute('width', data.width);
  canvas.setAttribute('height', data.height);
})
