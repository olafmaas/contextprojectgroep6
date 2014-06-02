/**
* Library class 
* @class Lib
* @classdesc Library class which takes care of creating, updating and drawing everything.
*/

//Groups
var balls;
var poles;
var shields;
var players;
var sprites;

//Temporary: amount of balls in the screen (will be handled by the server later)
var NROFBALLS = 20;
var NROFPSP = 3; //Nr of Poles, Shields and Players (PSP) which should all be the same, hence one variable.

function initialize(){
    game.setDimensions(1000, 1000);

    //Create groups and fill them:
    createBalls();
    createSprites();
    createPoles();
    createShields();
    createPlayers();

    //Add collision from ball to each of the other balls
    balls.addCollisionCombineAll(balls);
}

/**
* Updates the position of the items on the canvas and checks for collisions
*
* @method Lib#update
*/
function update(){
    //Used for the pause functionality
    if(!mouseDown){
        updateGroups();
        checkCollisions();  
    }
    parentDraw();
}

/**
* Updates the groups
*
* @method Lib#updateGroups
*/
function updateGroups(){
    balls.update();
    poles.update();
    shields.update();
    players.update(); //Update score of the player on screen   
}

/**
* Checks for any collisions available in the group
*
* @method Lib#checkCollisions
*/
function checkCollisions(){
    balls.checkCollision();
    poles.checkCollision();
    shields.checkCollision();

    balls.checkWorldBounds(game);
}

/**
* Creates an amount of balls, depending on the values of NROFBALLS
* Note: For now the positions are hardcoded
*
* @method Lib#createBalls
*/
function createBalls(){
    balls = new Group(Ball);

    for(var i = 0; i < NROFBALLS; i++){
        var ball = game.instantiate(new Ball(10));
        window.testBall = ball;
        ball.setColor(ColorGenerator.returnColor());
        ball.getBody().setVelocity(5);
        ball.getBody().setVelocityDirection(1.75 * Math.PI);
        ball.setPosition(30 + (i * 23), 64 + (i * 22));

        balls.addMember(ball);
    }
}

function createSprites(){
    sprites = new Group(Sprite);

    var length = balls.getMemberLength();
    for(var i = 0; i < length; i++){
        var sprite = game.instantiate(new Sprite());
        sprite.loadContent("../img/pokeball.png");
        sprite.hookTo(balls.getMember(i));
        var r = balls.getMember(i).getRadius();
        sprite.setSize({x: r*2, y: r*2});
        sprite.setAnchor({x: -r, y: -r}); //circle x y is center, so we anchor the sprite to the top left corner of the circle
        sprite.setRotationDegrees(30);
        sprite.enableRotation(); 
        sprites.addMember(sprite);
    }
}

/**
* Creates an amount of poles, depending on the values of NROFPSP.
* It also adds appropriate pole to ball collision.
* Note: For now the positions are hardcoded
*
* @method Lib#createPoles
*/
function createPoles(){
    poles = new Group(Pole);

    for(var i = 0; i < NROFPSP; i++){
        var pole = game.instantiate(new Pole(10));
        pole.setColor(ColorGenerator.returnColor());
        pole.setPosition(300 + (300*i), 300);

        poles.addMember(pole);
        poles.addCollision(pole, balls, pole.isHit, pole); //pole to ball collision
    }
}

/**
* Creates an amount of shields, depending on the values of NROFPSP
* It also add appropriate shield to ball collision.
*
* @method Lib#createShields
*/
function createShields(){
    shields = new Group(Shield);

    for(var i = 0; i < NROFPSP; i++){
        var tempPole = poles.getMember(i);
        var shield = game.instantiate(new Shield(tempPole));
        shield.getBody().immovable = true;
        shield.setColor("white");
        shields.addMember(shield);
        shields.addCollision(shield, balls, null, null); //shield to ball collision
    }
}

/**
* Creates an amount of players, depending on the values of NROFPSP
* It also sets the appropriate shield and pole belonging to the player.
* Note: For now the player names are hardcoded
*
* @method Lib#createPlayers
*/
function createPlayers(){
    players = new Group(Player);

    for(var i = 0; i < NROFPSP; i++){
        var tempPole = poles.getMember(i);
        var tempShield = shields.getMember(i);
        var player = new Player("Player" + i);
        player.setPole(tempPole);
        player.setShield(tempShield);

        tempPole.setPlayer(player);
        players.addMember(player);
    }
}

function loadContent(){

}

//Draws everything on the canvas
function draw(){
    game.draw();
}
