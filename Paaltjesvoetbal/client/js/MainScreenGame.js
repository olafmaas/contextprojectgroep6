var game = new Game(loadContent, update, draw);

var balls = new Group(Ball);
var poles = new Group(Pole);
var shields = new Group(Shield);
var players = new Group(Player);

function loadContent(){
    var ball = new Ball(10);
    ball.setColor('green');
    balls.addMember(ball);

    InitializeMainScreen();
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
    balls.draw(canvasContext);
    poles.draw(canvasContext);
    shields.draw(canvasContext);
    //players.draw(canvasContext); //Draw the score of the player on screen
};
