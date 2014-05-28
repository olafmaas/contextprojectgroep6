var game = new Game(function(){},loadContent, update, draw);

var balls = game.instantiate(new Group(Ball));
var poles = game.instantiate(new Group(Pole));
var shields = game.instantiate(new Group(Shield));
var players = game.instantiate(new Group(Player));

function loadContent(){
    var ball = new Ball(10);
    ball.setColor('green');
    balls.addMember(ball);

    //InitializeMainScreen();
};

//Updates the position of the items on the canvas and checks for collisions
function update(){
    canvas = document.getElementById('gameCanvas');
    canvas.setAttribute('width', game.getWidth());
    canvas.setAttribute('height', game.getHeight());

    parentDraw();
};

//Draws everything on the canvas
function draw(canvasContext){
    //Draw groups
    game.draw();
    //players.draw(canvasContext); //Draw the score of the player on screen
};
