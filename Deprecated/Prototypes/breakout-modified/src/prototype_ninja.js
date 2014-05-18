
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update});


function preload() {
    game.load.atlas('breakout', 'sprites/breakout.png', 'breakout.json');

    game.load.tilemap('map', 'src/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('sky', 'sprites/sky4.png');
    game.load.image('kenney', 'sprites/kenney.png');
}

function create() {

    //Set background
    var sky = game.add.image(0, 0, 'sky');
    sky.fixedToCamera = true;

    //Set ninja physics
    game.physics.startSystem(Phaser.Physics.NINJA);
    game.physics.ninja.gravity = 0;

    //Set tilemap
    map = game.add.tilemap('map');
    map.addTilesetImage('kenney');
    layer = map.createLayer('Tile Layer 1');

    //var slopeMap = { '32': 1, '77': 1, '95': 2, '36': 3, '137': 3, '140': 2 };

    //tiles = game.physics.ninja.convertTilemap(map, layer, slopeMap);

    ball = game.add.sprite(10, 10, 'breakout', 'ball_1.png');
    game.physics.ninja.enableCircle(ball, ball.width / 2);

    //  A little more bounce
    ball.body.bounce = 0.999;
    //ball.body.drag = 0;
    ball.body.friction = 0;
    ball.body.moveLeft(3000);
    ball.body.moveDown(3000);

    ball2 = game.add.sprite(50, 50, 'breakout', 'ball_1.png');
    game.physics.ninja.enableCircle(ball2, ball2.width / 2);

    //  A little more bounce
    ball2.body.bounce = 0.999;
    //ball.body.drag = 0;
    ball2.body.friction = 0;
    ball2.body.moveLeft(3000);
    ball2.body.moveDown(3000);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    /*for (var i = 0; i < tiles.length; i++)
    {
        ball.body.circle.collideCircleVsTile(tiles[i].tile);

    }
    */
}