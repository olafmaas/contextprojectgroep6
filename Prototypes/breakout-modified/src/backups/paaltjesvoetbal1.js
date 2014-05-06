
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Paaltjesvoetbal', { preload: preload, create: create, update: update });

function preload() {
	//Tile sprites
    game.load.atlas('breakout', 'sprites/breakout.png', 'breakout.json');
    //explosion sprites
    game.load.spritesheet('kaboom', 'sprites/explode.png', 128, 128);
    //Background image
    game.load.image('starfield', 'sprites/starfield.jpg');

}

var ball_1;
var ball_2;
var ball_3;
var shield;
var poles;

//var ballOnPaddle = true;

var lives = 1;
var score = 0;

var scoreText;
var livesText;
var introText;
var explosions;

var s;


function create(){

	//For now: collisions on each side of the screen
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Game background
	s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

	//Adds a group for the poles
	poles = game.add.group();
    poles.enableBody = true;
    poles.physicsBodyType = Phaser.Physics.ARCADE;

    /*balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.ARCADE;
	*/
    var pole;

    //Adds a group for the explosions
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
	explosions.forEach(setupExplosion, this);

    //add 1 pole (x, y, breakout, image)
 	//this pole should be protected
	pole = poles.create(game.world.centerX, 250, 'breakout', 'brick_1_1.png');
    pole.body.bounce.set(1);
    pole.body.immovable = true;

    //Add a shield
    shield = game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
    shield.anchor.setTo(0.5, 0.5); //anchor the shield

    //Enable ARCADE physics
    game.physics.enable(shield, Phaser.Physics.ARCADE);

    //Set shield properties
    shield.body.collideWorldBounds = true;
    shield.body.bounce.set(2);
    shield.body.immovable = true;

    //Add balls
    /*
    for (var i = 0; i < 4; i++)
    {
    	ball = balls.create(Math.floor(Math.random()*100), Math.floor(Math.random()*100), 'breakout', 'ball_1.png');
    	ball.anchor.set(0.5);
    	ball.checkWorldBounds = true;

    	//Enable physics for ball
    	game.physics.enable(ball, Phaser.Physics.ARCADE);

    	//Ball collide with bounds and bounce
    	ball.body.collideWorldBounds = true;
    	ball.body.bounce.set(1);

    	//Set ball animations
    	ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);
    }
	*/

	paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'paddle_big.png');
    paddle.anchor.setTo(0.5, 0.5);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

	ball_1 = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
    ball_1.anchor.set(0.5);
    ball_1.checkWorldBounds = true;

    game.physics.enable(ball_1, Phaser.Physics.ARCADE);

    ball_1.body.collideWorldBounds = true;
    ball_1.body.bounce.set(1);

    ball_1.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    //SECOND BALL

	ball_2 = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
    ball_2.anchor.set(0.5);
    ball_2.checkWorldBounds = true;

    game.physics.enable(ball_2, Phaser.Physics.ARCADE);

    ball_2.body.collideWorldBounds = true;
    ball_2.body.bounce.set(1);

    ball_2.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

    //Score / lives / etc texts
    scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
    livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });

    //On game input, release the ball
    game.input.onDown.add(releaseBall, this);
}

//Hook the explosions to each of the poles
function setupExplosion (_pole) {
    _pole.anchor.x = 0.5;
    _pole.anchor.y = 0.5;
   	_pole.animations.add('kaboom');
}

function update(){
	//  Fun, but a little sea-sick inducing :) Uncomment if you like!
    // s.tilePosition.x += (game.input.speed.x / 2);

    shield.body.x = game.input.x;
    shield.body.y = game.input.y; //so you can move the shield anywhere on the screen

    if (shield.x < 24)
    {
        shield.x = 24;
    }
    else if (shield.x > game.width - 24)
    {
        shield.x = game.width - 24;
    }

    game.physics.arcade.collide(ball_1, shield, ballHitShield, null, this);
    game.physics.arcade.collide(ball_1, poles, ballHitPole, null, this);
    game.physics.arcade.collide(ball_2, shield, ballHitShield, null, this);
    game.physics.arcade.collide(ball_2, poles, ballHitPole, null, this);
}

function releaseBall () {

	ball_1.body.velocity.y = -Math.floor(Math.random()*300);
	ball_1.body.velocity.x = -Math.floor(Math.random()*75);
	ball_1.animations.play('spin');


	ball_2.body.velocity.y = -Math.floor(Math.random()*300);
	ball_2.body.velocity.x = -Math.floor(Math.random()*75);
	ball_2.animations.play('spin');
}

function gameOver () {
	ball_1.body.velocity.setTo(0, 0);

    ball_2.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;
}

function ballHitPole (_ball, _pole) {

    _pole.kill();

    score += 10;

    scoreText.text = 'score: ' + score;

    //Create an explosion on impact:)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(_pole.body.x, _pole.body.y);
    explosion.play('kaboom', 30, false, true);


    //  Are there any poles left?
    /*
    if (poles.countLiving() == 0)
    {
        //  New level starts
        score += 1000;
        scoreText.text = 'score: ' + score;

        //  Let's move the ball back to the shield
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = shield.x + 16;
        ball.y = shield.y - 16;
        ball.animations.stop();

        //  And bring the poles back from the dead :)
        poles.callAll('revive');
    }
    */

}

function ballHitShield (_ball, _shield) {

    var diff = 0;

    if (_ball.x < _shield.x)
    {
        //  Ball is on the left-hand side of the shield
        diff = _shield.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _shield.x)
    {
        //  Ball is on the right-hand side of the shield
        diff = _ball.x -_shield.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

}

