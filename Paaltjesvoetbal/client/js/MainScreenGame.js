var game = new Game(function(){},loadContent, update, draw);

var balls = game.instantiate(new Group(Ball));
var poles = game.instantiate(new Group(Pole));
var shields = game.instantiate(new Group(Shield));
var players = game.instantiate(new Group(Player));

function loadContent(){
    var ball = new Ball(10);
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
    //Drav everything
    game.draw();
};
