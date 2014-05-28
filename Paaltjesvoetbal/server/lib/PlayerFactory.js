if(typeof module != 'undefined'){
	var Base = require('../../game/Base.js');
	var Player = require('../../game/Player.js');
	var Pole = require('../../game/Pole.js');
	var Shield = require('../../game/Shield.js');

}

var PlayerFactory = Base.extend({
	settings: false,


	constructor: function(_settings){
		this.settings = _settings;
	},

	createPlayer: function(nrOfPlayers, nrOfRows, maxNrOfColumns, id){
		var player = new Player(id)
		var pole = this.createPole(nrOfPlayers, nrOfRows, maxNrOfColumns);
		var shield = this.createShield(pole);
		player.setPole(pole);
		player.setShield(shield);
		pole.setPlayer(player);

		return player;
	},

	/**
	* Create new Pole
	* @method Group#update
	* @param {GroupManager} gm, group manager used to add pole
	*/
	createPole: function(nrOfPlayers, nrOfRows, maxNrOfColumns){
		var pole = new Pole(10);
		polePos = this.calculatePolePosition(nrOfPlayers, nrOfRows, maxNrOfColumns);
		pole.setPosition(polePos.x, polePos.y);


		return pole;
	},

	createShield: function(pole){	
		var shield = new Shield(pole);
		shield.getBody().immovable = true

		return shield;
	},

	calculatePolePosition: function(nrOfPlayers, nrOfRows, maxNrOfColumns){
		console.log(nrOfPlayers);
		var xpos = this.settings.canvasWidth/2 + (this.settings.canvasHeight * (nrOfPlayers%maxNrOfColumns));
		var ypos = this.settings.canvasHeight/2 + (this.settings.canvasHeight * (nrOfRows-1));
		return {x:xpos, y:ypos};
	}
})

if(typeof module != 'undefined'){
    module.exports = PlayerFactory;
}
