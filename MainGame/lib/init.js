var pole;
var ball;
var shield;

function init(){

    pole = new Ball(10);
    pole.getBody().isStatic = true;
    pole.setColor("#CDF99E");
    pole.setPosition(300, 300);

    ball = new Ball(10);
    ball.setPosition(0, 0);
    ball.setColor("#9EB9F9");
    ball.getBody().setVelocity(1);
    ball.getBody().setVelocityDirection(1.75 * Math.PI);
    ball.setPosition(150, 150);

    shield = new Shield(pole);
}
function loadContent(){

}

function update(){
	pole.update();
	ball.update();
	shield.update();

	ball.getBody().HandleCollision(pole);
	ball.getBody().checkWorldBounds(game);

	if(shield.collidesWith(ball)){
		game.setBackgroundColor("red");
	}else{
		game.setBackgroundColor("black");
	}
}

function draw(canvasContext){
	pole.draw(canvasContext);
	ball.draw(canvasContext);
	shield.draw(canvasContext);
}
