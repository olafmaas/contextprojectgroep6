var WIDTH;
var HEIGHT;
var ctx;


function init() {
  var c = document.getElementById("canvas");  
  ctx = c.getContext("2d");
  WIDTH = c.width;
  HEIGHT = c.height;
  return setInterval(draw, 10);
}
 
function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
 
function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}
 
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
 
window.onload = function() {
  init();
}