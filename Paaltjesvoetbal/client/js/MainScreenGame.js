var game = new Game(function(){},loadContent, update, draw);

var balls = game.instantiate(new Group(Ball));
var poles = game.instantiate(new Group(Pole));
var shields = game.instantiate(new Group(Shield));
var players = game.instantiate(new Group(Player));

function loadContent(){
    //var ball = new Ball(10);

    //NOTE: Setvelocity en direction zorgen voor dat spastische karakter van de bal. Dit wordt afgehandeld aan de server kant (servergame.addball)
    //ball.getBody().setVelocity(5); 
    //ball.getBody().setVelocityDirection(1.70 * Math.PI);
    //balls.addMember(ball);

    //InitializeMainScreen();
};

//Updates the position of the items on the canvas and checks for collisions
function update(){
    canvas = document.getElementById('gameCanvas');

    if(canvas.getAttribute('width') != game.getWidth() ||
        canvas.getAttribute('height') != game.getHeight()){
        canvas.setAttribute('width', game.getWidth());
        canvas.setAttribute('height', game.getHeight());
    }

};

//Draws everything on the canvas
function draw(canvasContext){
    //Drav everything
    game.draw();
};
