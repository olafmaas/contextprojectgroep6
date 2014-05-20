var pole;
    var ball;
    var ball2;
    var shield;

    //Initializes the balls, poles and shield on the screen
    function init(){


    }
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

        shield = new Shield(pole);
        shield.getBody().immovable = true;

        Initialize();
    }

    //Updates the position of the items on the canvas and checks for collisions
    function update(){
        //Used for the pause functionality
        if(!mouseDown){
            updateGameDimensions();
            input.update();

            pole.update();
            ball.update();
            ball2.update();
            shield.update();

            //Bit messy for now, but we don't have groups yet for which we can set the collisions,
            //so we just do it manually here
            ball.getBody().handleCollision(pole); //ball1 to pole
            ball.getBody().handleCollision(ball2); //ball1 to ball2
            ball.getBody().checkWorldBounds(game); //ball1 to worldBounds
            ball2.getBody().checkWorldBounds(game); //ball2 to worldBounds
            ball2.getBody().handleCollision(pole); //ball2 to pole
            //pole.getBody().handleCollision(ball);
            //pole.getBody().handleCollision(ball2)

            //Shield collision handling is not yet implemented
            if(shield.getBody().handleCollision(ball) || shield.getBody().handleCollision(ball2)){
                game.setBackgroundColor("red");
            }else{
                game.setBackgroundColor("white");
            }
        }
        parentDraw();
    }

    //Draws everything on the canvas
    function draw(canvasContext){
        pole.draw(canvasContext);
        ball.draw(canvasContext);
        ball2.draw(canvasContext);
        shield.draw(canvasContext);
    }