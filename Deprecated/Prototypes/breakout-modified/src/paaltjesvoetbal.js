
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Paaltjesvoetbal', { preload: preload, create: create, update: update });

function preload() {
	//Tile sprites
    game.load.atlas('breakout', 'sprites/breakout.png', 'breakout.json');
    //explosion sprites
    game.load.spritesheet('kaboom', 'sprites/explode.png', 128, 128);
    //Background image
    game.load.image('starfield', 'sprites/starfield.jpg');

    game.load.image('pole', 'sprites/pole.png');
    game.load.image('shield', 'sprites/shield.png')
}

//Variables

//Groups
var balls;
var shields;
var poles;
var explosions;

var nrOfBalls = 2; //Number of balls, currently 2

var ball;
var shield;

//Game states
var lives = 1;
var score = 0;
var highscore = 0;
var hit = false;
var released = false;

//Texts
var scoreText;
var introText;
var highscoreText;

var s;

setInterval( scoreTimer, 1000 ); //run the timer every second to update score

function create(){

	//For now: collisions on each side of the screen
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Game background
	s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

	//Adds a group for the poles
	poles = game.add.group();
    poles.enableBody = true;
    poles.physicsBodyType = Phaser.Physics.ARCADE;

    //Add a group for the balls
    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.ARCADE;

    //Adds a group for the explosions
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
	explosions.forEach(setupExplosion, this);

    var pole;
    //add 1 pole (x, y, breakout, image)
 	//this pole should be protected
	pole = poles.create(game.world.centerX, game.world.centerY, 'pole');
    pole.body.bounce.set(1);
    pole.body.immovable = true;
    pole.anchor.setTo(0.5, 0.5);

    //Add a shield
    shield = game.add.sprite(game.world.centerX, game.world.centerY, 'shield');
    shield.anchor.setTo(0.5, 0.5); //anchor the shield

    //Enable ARCADE physics
    game.physics.enable(shield, Phaser.Physics.ARCADE);

    //Set shield properties
    shield.body.collideWorldBounds = true;
    shield.body.bounce.set(1);
    shield.body.immovable = true;

    //Add balls 
    for (var i = 0; i < nrOfBalls; i++)
    {
    	ball = balls.create(Math.floor(Math.random()*100), Math.floor(Math.random()*100), 'breakout', 'ball_1.png');
    	ball.anchor.set(0.5);
    	ball.checkWorldBounds = true;
        ball.body.bounce.set(1);

    	//Enable physics for ball
    	game.physics.enable(ball, Phaser.Physics.ARCADE);

    	//Ball collide with bounds and bounce
    	ball.body.collideWorldBounds = true;
    	ball.body.bounce.set(1);

    	//Set ball animations
    	ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);
    }
	
    //Score
    scoreText = game.add.text(32, 550, 'Time: 0:00', { font: "20px Arial", fill: "#ffffff", align: "left" });
    highscoreText = game.add.text(620, 550, 'Highscore: 0:00', { font: "20px Arial", fill: "#ffffff", align: "left" });
    
    //On game input, release the ball
    game.input.onDown.add(releaseBall, this);
}

//Hook the explosions to each of the poles
function setupExplosion (_pole) {
    _pole.anchor.x = 0.5;
    _pole.anchor.y = 0.5;
   	_pole.animations.add('kaboom');
}

function scoreTimer() {
    var timeText = 'Time: 0:00';

    if(!hit && released){
        score++;
        if(score < 10)
        {
            timeText = 'Time: 0:0' + score;
        }
        else if(score < 60)
        {
            timeText ='Time: 0:' + score;
        }
        else 
        {
            var min = Math.floor(score / 60);
            var sec = score % 60;
            if(sec < 10) { sec = '0' + sec; }
            timeText = 'Time: ' + min + ':' + sec;
        }
         scoreText.text = timeText;
    }
}

function update(){
	//  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    //Define where the shield can be (360 degrees around pole with a radius of ?? )
    /*shield.body.x = game.input.x;
    shield.body.y = game.input.y; //so you can move the shield anywhere on the screen

    if (shield.x < 24)
    {
        shield.x = 24;
    }
    else if (shield.x > game.width - 24)
    {
        shield.x = game.width - 24;
    }
*/
var mousePointerPos = game.input.activePointer.position;
    shield.rotation = -Math.atan2(mousePointerPos.x - game.world.centerX, mousePointerPos.y - game.world.centerY) - 0.75 * Math.PI;

    balls.forEach(function (ball) {
        game.physics.arcade.collide(ball, shield, ballHitShield, null, this); //if a ball hits a shield
        game.physics.arcade.collide(ball, poles, ballHitPole, null, this); //if a ball hits a pole
        game.physics.arcade.collide(ball, balls, ballHitBall, null, this); //if a ball hits another ball
    });
}

function releaseBall () {

    if(!released){
        released = true;
        hit = false;
        balls.forEach(function (ball) {
            ball.body.velocity.y = -300;
            ball.body.velocity.x = -75;
            ball.animations.play('spin');
        });
    }
}

function gameOver () {
	ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;
}

function ballHitPole (_ball, _pole) {

    _pole.kill();

    //Create an explosion on impact:)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(_pole.body.x, _pole.body.y);
    explosion.play('kaboom', 30, false, true);

    hit = true;
    scoreText.text = 'Time: 0:00';

    var timeText = 'Highscore: 0:00';
    if(score > highscore){
        highscore = score;

        if(highscore < 10)
        {
            timeText = 'Highscore: 0:0' + highscore;
        }
        else if (highscore < 60)
        {
            timeText = 'Highscore: 0:' + highscore;
        }
        else 
        {
            var min = Math.floor(score / 60);
            var sec = score % 60;
            if(sec < 10) { sec = '0' + sec; }
            timeText = 'Highscore: ' + min + ':' + sec;
        }

        highscoreText.text = timeText;
    }
}

function ballHitBall (_ball, _ball2) {
    var diff = 0;
    //!! Because both balls go through this function on collision, only the
    //!! velocity of _ball should be changed
    //Ball hits ball2 on the left side
    if (_ball.x < _ball2.x)
    {
        diff = _ball2.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    //Ball hits ball2 on the right side
    else if (_ball.x > _ball2.x)
    {
        diff = _ball.x - _ball2.x;
        _ball.body.velocity.x = (10 * diff);
    }
    //Ball hits ball2 exactly in the middle
    else 
    {
        _ball.body.velocity.x = 2 + Math.random() * 35;
    }
}

function ballHitShield (_ball, _shield) {

    var diff = 0;

    if (_ball.x < _shield.x)
    {
        //  Ball is on the left-hand side of the shield
        diff = _shield.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
        console.error("S-X: " + _shield.x + " | B-X: " + _ball.x + " | diff: " + diff);
    }
    else if (_ball.x > _shield.x)
    {
        //  Ball is on the right-hand side of the shield
        diff = _ball.x -_shield.x;
        _ball.body.velocity.x = (10 * diff);
        console.error("S-X: " + _shield.x + "B-X: " + _ball.x + " | diff: " + diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

}

