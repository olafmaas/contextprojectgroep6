
var game = new Game(init, loadContent, update, draw, Settings.canvasWidth, Settings.canvasHeight, Settings.canvasWidth, Settings.canvasHeight);

var pole;
var shield;
var player;
var balls;
var powerup = null;
var scoreLabel;
var nameLabel;
var audioManager
var tempImage;

function init(){
    balls = new Group(Ball);
    audioManager = new AudioManager()
    audioManager.addTrack("ballCollision", "./assets/collide.wav")
};

function createTempImage(){
    tempImage = game.instantiate(new Sprite('./img/beginplaatje.svg'));
    tempImage.setPosition({x: Settings.canvasWidth/2 - 110, y: Settings.canvasHeight/2 - 110});
    tempImage.setSize({x: 200, y: 200});
}

function deleteTempImage(){
    game.remove(tempImage);
}

function loadContent(){
    pole = game.instantiate(new Pole(Settings.pole.size));
    pole.setColor(Settings.pole.color);
    pole.setPosition(Settings.canvasWidth /2 , Settings.canvasHeight /2);

    shield = game.instantiate(new Shield(pole));
    shield.getBody().immovable = true;
    shield.setColor(Settings.shield.color);

    player = game.instantiate(new Player(""));
    player.setPole(pole);
    player.setShield(shield);
    pole.setPlayer(player);

    //Player labels, name is set once again when the user has
    scoreLabel = game.instantiate(new ScoreLabel(player, "Score: 0"));
    scoreLabel.setPosition(Settings.label.score);

    nameLabel = game.instantiate(new Label("Unknown Player"));
    nameLabel.setPosition(Settings.label.name);

    createTempImage();
    setTimeout(deleteTempImage, 3000);

};

//Updates the position of the items on the canvas and checks for collisions
function update(){

};

//Draws everything on the canvas
function draw(){
    game.draw(); 
};
