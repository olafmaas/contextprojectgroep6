var game = new Game(initialize, loadContent, update, draw);

var balls = game.instantiate(new Group(Ball));
var poles = game.instantiate(new Group(Pole));
var shields = game.instantiate(new Group(Shield));
var players = game.instantiate(new Group(Player));

function initialize(){
};

function loadContent(){
    
};

//Updates the position of the items on the canvas and checks for collisions
function update(){
    canvas = document.getElementById('gameCanvas');
    var windowWidth = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	var windowHeight = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

	//canvas.style.width =  windowWidth+ "px";
	//canvas.style.height = windowHeight + "px";
	canvas.style.width =   "100%";
	canvas.style.height = "100%";
    if(canvas.getAttribute('width') != game.getWidth() ||
        canvas.getAttribute('height') != game.getHeight()){
        canvas.setAttribute('width', game.getWidth());
        canvas.setAttribute('height', game.getHeight());
    }

};

//Draws everything on the canvas
function draw(canvasContext){
    game.draw();
};
