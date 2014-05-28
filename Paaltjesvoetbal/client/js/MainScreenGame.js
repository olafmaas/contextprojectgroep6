var game = new Game(function(){},loadContent, update, draw, 400, 300);

var balls = new Group(Ball);
var poles = new Group(Pole);
var shields = new Group(Shield);
var players = new Group(Player);

function loadContent(){
    var ball = game.instantiate(new Ball(10));
    ball.setColor('green');
    ball.getBody().setVelocity(5);
    ball.getBody().setVelocityDirection(1.75 * Math.PI);
    balls.addMember(ball);

    //InitializeMainScreen();
};

//Updates the position of the items on the canvas and checks for collisions
function update(){
    canvas = document.getElementById('gameCanvas');
    canvas.setAttribute('width', game.getWidth());
    canvas.setAttribute('height', game.getHeight());

    balls.update();
    parentDraw();
};

//Draws everything on the canvas
function draw(canvasContext){
    //Draw groups
    game.draw();
    //players.draw(canvasContext); //Draw the score of the player on screen
};