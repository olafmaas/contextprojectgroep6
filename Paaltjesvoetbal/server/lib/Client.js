function Client (socket, name, player, pole, shield, ball){
	this.socket = socket;
	this.name = name; //maybe remove staat al in player?
	this.player = player;
	this.pole = pole;
	this.shield = shield;
	this.ball = ball;
}

if(typeof module != 'undefined'){
    module.exports = Client;
}
