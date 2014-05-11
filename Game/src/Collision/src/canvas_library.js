var WIDTH = 0;
var HEIGHT = 0;
var MOUSEX = 0;
var MOUSEY = 0;

var ctx;
var c;
var ci;
var ci2;
var rc;
var sh;

function init() {
  c = document.getElementById("canvas"); 
  
  //Create ball
  ci = new Circle(c);
  ci.setPosition(320, 100);
  ci.setSpeed(2, 4);
  ci.setRadius(7)

  ci2 = new Circle(c);
  ci2.setPosition(20, 500);
  ci2.setSpeed(2, 4);
  ci2.setRadius(7)

  //Create pole
  rc = new Rectangle(c);
  rc.setPosition(400, 300);
  rc.setWidth(25);
  rc.setHeight(50);

  //Create shield
  sh = new Shield(c, rc);
  sh.setRadius(50);

  //Retrieve width / height of the current canvas 
  ctx = c.getContext("2d");
  WIDTH = c.width;
  HEIGHT = c.height;

  //Handle the movement of the mouse (for shield)
  canvas.onmousemove = handleMouseMovement;

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