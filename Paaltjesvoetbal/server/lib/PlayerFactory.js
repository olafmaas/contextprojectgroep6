if(typeof module != 'undefined'){
	var Base = require('../../game/util/Base.js');
	var Player = require('../../game/Player.js');
	var Pole = require('../../game/Pole.js');
	var Shield = require('../../game/Shield.js');

}

var PlayerFactory = Base.extend({
	settings: false,


	constructor: function(_settings){
		this.settings = _settings;
	},

	createPlayer: function(polePos, id){
		var player = new Player(id)
		var pole = this.createPole(polePos);
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
	createPole: function(polePos){
		var pole = new Pole(10);
		pole.setPosition(polePos.left + this.settings.canvasWidth/2, polePos.top + this.settings.canvasHeight/2);

		return pole;
	},

	createShield: function(pole){	
		var shield = new Shield(pole);
		shield.getBody().immovable = true

		return shield;
	},
})

if(typeof module != 'undefined'){
    module.exports = PlayerFactory;
}
