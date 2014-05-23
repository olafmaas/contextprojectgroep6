//Vars
var pole;
var ball;
var ball2;
var shield;
var player;

//Temporary amount of balls in the screen
var NROFBALLS = 20;

function loadContent(){

    pole = new Pole(10);
    pole.setColor("blue");
    pole.setPosition(300, 300);

    balls = new Group(Ball);

    for(var i = 0; i < NROFBALLS; i++){
        ball = new Ball(10);
        ball.setColor(ColorGenerator.returnColor());
        ball.getBody().setVelocity(5);
        ball.getBody().setVelocityDirection(1.75 * Math.PI);
        ball.setPosition(30 + (i * 23), 64 + (i * 22));

        balls.addMember(ball);
    }


    shield = new Shield(pole);
    shield.getBody().immovable = true;

    player = new Player("TestUser");
    player.setPole(pole);
    player.setShield(shield);

    pole.setPlayer(player);

    balls.addCollision(pole, balls, pole.isHit, pole);
    balls.addCollision(shield, balls, null, null);
    balls.addCollisionCombineAll(balls);

    Initialize();
}

//Updates the position of the items on the canvas and checks for collisions
function update(){
    //Used for the pause functionality
    if(!mouseDown){
        updateGameDimensions();
        input.update();

        //Update group
        balls.update();

        pole.update();
        shield.update();
        player.update(); //Update score of the player on screen

        balls.checkCollision();
        balls.checkWorldBounds(game);
        
    }
    parentDraw();
}

//Draws everything on the canvas
function draw(canvasContext){
    pole.draw(canvasContext);
    shield.draw(canvasContext);

    //Draw group
    balls.draw(canvasContext);
    player.draw(canvasContext); //Draw the score of the player on screen
}