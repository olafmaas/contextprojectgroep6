
var game = new Game(init, loadContent, update, draw, 450, 350, 450, 350);

var pole;
var shield;
var player;
var balls;
var powerup = null;
var scoreLabel;
var nameLabel;

function init(){
    balls = new Group(Ball);
};

function loadContent(){
    pole = game.instantiate(new Pole(10));
    pole.setColor("blue");
    pole.setPosition(225, 175);

    shield = game.instantiate(new Shield(pole));
    shield.getBody().immovable = true;
    shield.setColor("white");

    player = game.instantiate(new Player(""));
    player.setPole(pole);
    player.setShield(shield);
    pole.setPlayer(player);

    //Player labels, name is set once again when the user has
    scoreLabel = game.instantiate(new ScoreLabel(player, "Score: 0"));
    scoreLabel.setPosition(UserSettings.scorePosition);

    nameLabel = game.instantiate(new Label("Unknown Player"));
    nameLabel.setPosition(UserSettings.namePosition);

};

//Updates the position of the items on the canvas and checks for collisions
function update(){

};

//Draws everything on the canvas
function draw(){
    game.draw(); 
};
