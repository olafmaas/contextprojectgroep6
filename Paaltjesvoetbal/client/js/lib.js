//Groups
var balls;
var poles;
var shields;
var players;

//Temporary amount of balls in the screen
var NROFBALLS = 1;
var NROFPOLES = 3;
var NROFSHIELDS = 3;
var NROFPLAYERS = 3; 
//Poles / Shields / Players zou gelijk moeten zijn aan elkaar, 
//dus kunnen ook gewoon 1 variabele ervoor gebruiken

function initialize(){
    balls = new Group(Ball);
    poles = new Group(Pole);
    shields = new Group(Shield);
    players = new Group(Player);

    //Create balls
    for(var i = 0; i < NROFBALLS; i++){
        var ball = game.instantiate(new Ball(10));
        ball.setColor(ColorGenerator.returnColor());
        ball.getBody().setVelocity(5);
        ball.getBody().setVelocityDirection(1.75 * Math.PI);
        ball.setPosition(30 + (i * 23), 64 + (i * 22));

        balls.addMember(ball);
    }

    //Create poles
    for(var i = 0; i < NROFPOLES; i++){
        var pole = game.instantiate(new Pole(10));
        pole.setColor(ColorGenerator.returnColor());
        pole.setPosition(300 + (300*i), 300);

        poles.addMember(pole);
        poles.addCollision(pole, balls, pole.isHit, pole); //pole to ball collision
    }

    //Create shields
    for(var i = 0; i < NROFSHIELDS; i++){
        var tempPole = poles.getMember(i);
        var shield = game.instantiate(new Shield(tempPole));
        shield.getBody().immovable = true;
        shield.setColor("white");
        shields.addMember(shield);
        shields.addCollision(shield, balls, null, null); //shield to ball collision
    }

    //Create players
    for(var i = 0; i < NROFPLAYERS; i++){
        var tempPole = poles.getMember(i);
        var tempShield = shields.getMember(i);
        var player = new Player("Player" + i);
        player.setPole(tempPole);
        player.setShield(tempShield);

        tempPole.setPlayer(player);
        players.addMember(player);
    }

    //Ball to all other balls collision
    balls.addCollisionCombineAll(balls);
}

function loadContent(){

}

//Updates the position of the items on the canvas and checks for collisions
function update(){
    //Used for the pause functionality
    if(!mouseDown){
        input.update();

        //Update groups
        balls.update();
        poles.update();
        shields.update();
        players.update(); //Update score of the player on screen

        balls.checkCollision();
        poles.checkCollision();
        shields.checkCollision();

        balls.checkWorldBounds(game);     
    }
}

//Draws everything on the canvas
function draw(){
    game.draw();
}

function not(_param){
    console.log("UUH HALLO? || _param: " + _param);
}