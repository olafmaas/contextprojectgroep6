var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var pole = new Pole();
var shield = new Shield(pole);
var ballManager = new BallManager();

function preload() {
    pole.preload();
    shield.preload();
    ballManager.preload();
}

function create() {
	game.physics.startSystem(Phaser.Physics.NINJA);

    pole.create();
    shield.create();
}

function update() {
   pole.update();
   shield.update();
   ballManager.update();
}
