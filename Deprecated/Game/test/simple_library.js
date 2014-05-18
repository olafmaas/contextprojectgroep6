var WIDTH = 0;
var HEIGHT = 0;

var ctx;
var c;
var ci;

function init() {
  c = document.getElementById("canvas"); 
  
  //Create ball
  ci = new Circle(c);
  ci.setPosition(320, 100);
  ci.setSpeed(2, 4);
  ci.setRadius(7)

  //Retrieve width / height of the current canvas 
  ctx = c.getContext("2d");
  WIDTH = c.width;
  HEIGHT = c.height;

  //Set the refresh rate of the canvas (stuff drawn every 10 ms)
  return setInterval(draw, 10);
}
 
//Clears the entire canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
 
//To make sure the javascript is executed after the canvas has been placed on the screen
window.onload = function() {
  init();
}



//TODO:
//checken of er niet al iets op die plek staat? dus dat je niet twee 'poles' kan hebben die half door elkaar heen gaan?