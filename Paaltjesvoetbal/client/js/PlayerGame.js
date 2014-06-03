var game = new Game(init, loadContent, update, draw, 450, 350, 450, 350);

var pole;
var shield;
var player;
var balls;
var label;

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

    player = game.instantiate(new Player(""));
    player.setPole(pole);
    player.setShield(shield);
    pole.setPlayer(player);

    //Testing label, only needed locally as the server keeps track of the actual score values.
    label = game.instantiate(new ScoreLabel(player, "Score: 0"));
    label.setPosition({x: 350, y: 340});
    label.setFontSize(10);
};

//Updates the position of the items on the canvas and checks for collisions
function update(){
    balls.update();
    pole.update();
    shield.update();
    player.update();
    label.update();
};

//Draws everything on the canvas
function draw(){
    game.draw(); 
};