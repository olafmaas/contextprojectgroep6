/**
* Creates the client for the game
* @method Client#Client
*/
function Client (socket, player, pole, shield){
	this.socket = socket;
	this.player = player;
	this.pole = pole;
	this.shield = shield;
}

if(typeof module != 'undefined'){
    module.exports = Client;
}
