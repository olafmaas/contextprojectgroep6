var WIDTH;
var HEIGHT;
var ctx;
var c;
var ci;
var rc;

function init() {
  c = document.getElementById("canvas"); 
  
  ci = new Circle(c);
  ci.x = 320;
  ci.y = 100;
  ci.dx = 2;
  ci.dy = 4;
  ci.radius = 10; 

  rc = new Rectangle(c);
  rc.x = 400;
  rc.y = 300;
  rc.width = 50;
  rc.height = 100;

  ctx = c.getContext("2d");
  WIDTH = c.width;
  HEIGHT = c.height;
  return setInterval(draw, 10);
}
 
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
 
window.onload = function() {
  init();
}