var WIDTH = 0;
var HEIGHT = 0;
var MOUSEX = 0;
var MOUSEY = 0;
var NROFBALLS = 2;

var ctx;
var c;
var pole;
var shield;
var balls = new Group();

function init() {
  c = document.getElementById("canvas"); 
  ctx = c.getContext("2d");

  //Create pole
  pole = new Pole(25, 50);
  pole.setPosition(400, 300);

  //Create shield
  shield = new Shield(c, pole);
  shield.setRadius(50);

  //Simple ball adding (hardcoded places)
  for (var i = 0; i < NROFBALLS; i++){
    var ball = new Ball(20);
    ball.setPosition(10 + (300*i), 10 + (200*i));
    ball.setSpeed(6, 1);
    balls.add(ball);
    balls.addCollision(ball, null, checkWallCollision, null);
    balls.addCollision(ball, pole, checkPoleCollision, null);
  }

  //Retrieve width / height of the current canvas 
  ctx = c.getContext("2d");
  WIDTH = c.width;
  HEIGHT = c.height;

  //Handle the movement of the mouse (for shield)
  canvas.onmousemove = handleMouseMovement;

  var temp = balls.getMembers();
  temp.forEach(function (_ball){
    balls.addCollision(_ball, balls, checkBallCollision, null);
  });

  //Set the refresh rate of the canvas (stuff drawn every 10 ms)
  return setInterval(draw, 10);
}
 
//Clears the entire canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//Handles mouse movements in order to calculate the position / angle of the shield
function handleMouseMovement(e){
  MOUSEX = e.clientX;
  MOUSEY = e.clientY;
}
 
//To make sure the javascript is executed after the canvas has been placed on the screen
window.onload = function() {
  init();
}



//TODO:
//checken of er niet al iets op die plek staat? dus dat je niet twee 'poles' kan hebben die half door elkaar heen gaan?