var WIDTH;
var HEIGHT;
var ctx;
var c;
var ci;
var rc;
var rc2;
var rc3;

function init() {
  c = document.getElementById("canvas"); 
  
  ci = new Circle(c);
  ci.setPosition(320, 100);
  ci.setSpeed(2, 4);
  ci.setRadius(10)

  rc = new Rectangle(c);
  rc.setPosition(400, 300);
  rc.setWidth(50);
  rc.setHeight(100);

  rc2 = new Rectangle(c);
  rc2.setPosition(530, 50);
  rc2.setWidth(50);
  rc2.setHeight(100);

  rc3 = new Rectangle(c);
  rc3.setPosition(230, 350);
  rc3.setWidth(50);
  rc3.setHeight(100);

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

//TODO:
//checken of er niet al iets op die plek staat? dus dat je niet twee 'poles' kan hebben die half door elkaar heen gaan?