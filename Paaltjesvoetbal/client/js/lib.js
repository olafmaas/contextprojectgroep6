//Vars
var pole;
var ball;
var ball2;
var shield;
var player;

//Groups
var balls;

//Nr of balls
var NROFBALLS = 20;

function loadContent(){

    pole = new Pole(10);
    pole.setColor("blue");
    pole.setPosition(300, 300);

   balls = new Group(Ball);

    for(var i = 0; i < NROFBALLS; i++){
        ball = new Ball(10);
        var color = "#000000";
        if(i % 6 == 0)
            color = "#FF0000";
        else if(i % 5 == 0)
            color = "#00FF00";
        else if(i % 4 == 0)
            color = "#0000FF";
        else if(i % 3 == 0)
            color = "#FFFF00";
        else if(i % 2 == 0)
            color = "#00FFFF";
        else
            color = "#FF00FF";

        ball.setColor(color);
        ball.getBody().setVelocity(5);
        ball.getBody().setVelocityDirection(1.75 * Math.PI);
        ball.setPosition(50 + (i * 20), 50 + (i * 20));

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