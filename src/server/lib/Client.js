function Client (socket, name, player, pole, shield){
	this.socket = socket;
	this.name = name; //maybe remove staat al in player?
	this.player = player;
	this.pole = pole;
	this.shield = shield;
}

if(typeof module != 'undefined'){
    module.exports = Client;
}
