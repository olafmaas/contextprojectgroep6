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

        group.addMember(ball);
        console.log(group.getMemberLength());
    }

/*    ball.setColor("green");
    ball.getBody().setVelocity(5);
    ball.getBody().setVelocityDirection(1.75 * Math.PI);
    ball.setPosition(150, 150);

    ball2 = new Ball(10);
    ball2.setColor("black");
    ball2.getBody().setVelocity(5);
    ball2.getBody().setVelocityDirection(1.25 * Math.PI);
    ball2.setPosition(250, 150);
*/
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

        balls.update();
        pole.update();
   //     ball.update();
   //     ball2.update();
        shield.update();
        player.update(); //Update score of the player on screen

   //     handleCollision(ball, ball2);
   //     handleCollision(ball, shield);
   //     handleCollision(ball2, shield);

   //     if(handleCollision(ball2, pole) || handleCollision(ball, pole))
   //         pole.isHit();

 //       ball.getBody().checkWorldBounds(game); //ball1 to worldBounds
 //       ball2.getBody().checkWorldBounds(game); //ball2 to worldBounds

        
    }
    parentDraw();
}

//Draws everything on the canvas
function draw(canvasContext){
    pole.draw(canvasContext);
  //  ball.draw(canvasContext);
 //   ball2.draw(canvasContext);
    shield.draw(canvasContext);
    group.draw(canvasContext);
    player.draw(canvasContext); //Draw the score of the player on screen
}