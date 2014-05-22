var pole;
var ball;
var ball2;
var shield;
var player;

var balls = [];

function loadContent(){
    pole = new Pole(10);
    pole.setColor("blue");
    pole.setPosition(300, 300);

    ball = new Ball(10);
    ball.setColor("green");
    ball.getBody().setVelocity(5);
    ball.getBody().setVelocityDirection(1.75 * Math.PI);
    ball.setPosition(150, 150);

    ball2 = new Ball(10);
    ball2.setColor("black");
    ball2.getBody().setVelocity(5);
    ball2.getBody().setVelocityDirection(1.25 * Math.PI);
    ball2.setPosition(250, 150);

    balls.push(ball);
    balls.push(ball2);

    shield = new Shield(pole);
    shield.getBody().immovable = true;

    player = new Player("TestUser");
    player.setPole(pole);
    player.setShield(shield);

    pole.setPlayer(player);

    Initialize();
}

//Updates the position of the items on the canvas and checks for collisions
function update(){
    //Used for the pause functionality
    if(!mouseDown){
        updateGameDimensions();
        input.update();

        pole.update();

        for (var i = 0; i < balls.length; ++i) {
            balls[i].update();
        }

        shield.update();
        player.update(); //Update score of the player on screen

        handleCollision(ball, ball2);
        handleCollision(ball, shield);
        handleCollision(ball2, shield);

        if(handleCollision(ball2, pole) || handleCollision(ball, pole))
            pole.isHit();

        ball.getBody().checkWorldBounds(game); //ball1 to worldBounds
        ball2.getBody().checkWorldBounds(game); //ball2 to worldBounds

        
    }
    parentDraw();
}

//Draws everything on the canvas
function draw(canvasContext){
    pole.draw(canvasContext);
    ball.draw(canvasContext);
    ball2.draw(canvasContext);
    shield.draw(canvasContext);
    player.draw(canvasContext); //Draw the score of the player on screen
}