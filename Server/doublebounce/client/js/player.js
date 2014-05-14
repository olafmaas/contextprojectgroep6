var port = 5050
var server = 'http://localhost'
var socket = io.connect(server+":"+port);

var left = 0;
var topf = 0;

var context;


socket.on('canvasPos', function (data){
	left = data.left;
	topf = data.top;
})

socket.on('draw', function (data) {
  context= myCanvas.getContext('2d');
  context.clearRect(0,0,300,300);
  context.beginPath();
  context.fillStyle="#0000ff";
  context.arc(data.x - left,data.y - topf,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
})
