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

//Temporary: amount of balls in the screen (will be handled by the server later)
var NROFBALLS = 20;
var NROFPSP = 3; //Nr of Poles, Shields and Players (PSP) which should all be the same, hence one variable.

/**
* Creates everything (balls, poles, shield) and add them together into groups.
* Also creates the appropriate collisions that will be checked on each update.
*
* @method Lib#loadContent
*/
function loadContent(){

    //Create groups and fill them:
    createBalls();
    createPoles();
    createShields();
    createPlayers();

    //Add collision from ball to each of the other balls
    balls.addCollisionCombineAll(balls);

    Initialize();
}

/**
* Updates the position of the items on the canvas and checks for collisions
*
* @method Lib#update
*/
function update(){
    //Used for the pause functionality
    if(!mouseDown){
        updateGameDimensions();
        input.update();

        updateGroups();
        checkCollisions();  
    }
    parentDraw();
}

/**
* Draws everything on the canvas
*
* @method Lib#draw
*/
function draw(canvasContext){
    //Draw groups
    balls.draw(canvasContext);
    poles.draw(canvasContext);
    shields.draw(canvasContext);
    players.draw(canvasContext); //Draw the score of the player on screen
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
        var ball = new Ball(10);
        ball.setColor(ColorGenerator.returnColor());
        ball.getBody().setVelocity(5);
        ball.getBody().setVelocityDirection(1.75 * Math.PI);
        ball.setPosition(30 + (i * 23), 64 + (i * 22));

        balls.addMember(ball);
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
        var pole = new Pole(10);
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
        var shield = new Shield(tempPole);
        shield.getBody().immovable = true;

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