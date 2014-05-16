var pole;
var ball;
var ball2;
var shield;

function init(){

    pole = new Ball(10);
    pole.getBody().isStatic = true;
    pole.setColor("#CDF99E");
    pole.setPosition(300, 300);

    ball = new Ball(10);
    ball.setColor("#9EB9F9");
    ball.getBody().setVelocity(3);
    ball.getBody().setVelocityDirection(1.75 * Math.PI);
    ball.setPosition(150, 150);

    ball2 = new Ball(10);
    ball2.setColor("#FFFF66");
    ball2.getBody().setVelocity(3);
    ball2.getBody().setVelocityDirection(1.25 * Math.PI);
    ball2.setPosition(250, 150);

    shield = new Shield(pole);
}
function loadContent(){

}

function update(){
	pole.update();
	ball.update();
	ball2.update();
	shield.update();

	//Bit messy for now, but we don't have groups yet for which we can set the collisions,
	//so we just do it manually here
	ball.getBody().HandleCollision(pole); //ball1 to pole
	ball.getBody().HandleCollision(ball2); //ball1 to ball2
	ball.getBody().checkWorldBounds(game); //ball1 to worldBounds
	ball2.getBody().checkWorldBounds(game); //ball2 to worldBounds
	ball2.getBody().HandleCollision(pole); //ball2 to pole

	if(shield.collidesWith(ball)){
		game.setBackgroundColor("red");
	}else{
		game.setBackgroundColor("black");
	}
}

function draw(canvasContext){
	pole.draw(canvasContext);
	ball.draw(canvasContext);
	ball2.draw(canvasContext);
	shield.draw(canvasContext);
}
