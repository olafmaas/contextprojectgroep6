if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');

	var IDDistributor = require('../../common/game/util/IDDistributor.js');
	var Player = require('../../common/game/gameobjects/Player.js');
	var Pole = require('../../common/game/gameobjects/Pole.js');
	var Shield = require('../../common/game/gameobjects/Shield.js');

	var S = require('../../common/Settings.js');
}

var PlayerFactory = Base.extend({

	createPlayer: function(polePos, id){
		var player = new Player(id)
		var pole = this.createPole(polePos);
		var shield = this.createShield(pole);
		player.setPole(pole);
		player.setShield(shield);
		pole.setPlayer(player);
		player.setGlobalID(IDDistributor.getNewId());

		return player;
	},

	/**
	* Create new Pole
	* @method Group#update
	* @param {GroupManager} gm, group manager used to add pole
	*/
	createPole: function(polePos){
		var pole = new Pole(S.pole.size);
		pole.setPosition(polePos.left + S.canvasWidth/2, polePos.top + S.canvasHeight/2);

		return pole;
	},

	createShield: function(pole){	
		var shield = new Shield(pole);
		shield.getBody().immovable = true

		return shield;
	},
});

if(typeof module != 'undefined'){
    module.exports = PlayerFactory;
}
