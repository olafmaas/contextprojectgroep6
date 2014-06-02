var pole;
var shield;
var player;
var balls;

function init(){
    balls = new Group(Ball);
}

function loadContent(){

    pole = game.instantiate(new Pole(10));
    pole.setColor("blue");
    pole.setPosition(225, 175);

    shield = game.instantiate(new Shield(pole));
    shield.getBody().immovable = true;
    shield.setColor("white");

    //Username is -1 omdat player hier pas aangemaakt wordt...
    player = game.instantiate(new Player(-1));
    player.setPole(pole);
    player.setShield(shield);
    pole.setPlayer(player);

    //Initialize();
    //updateGameDimensions();
};

//Updates the position of the items on the canvas and checks for collisions
function update(){
    balls.update();
    pole.update();
    shield.update();
    player.update();

    if(balls.checkCollision()){
        sendBallAngle();
    }

    parentDraw();
};

//Draws everything on the canvas
function draw(){
    game.draw(); //<< welke game is dit?
};