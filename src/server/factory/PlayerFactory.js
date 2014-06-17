var IDDistributor = require('../../common/game/util/IDDistributor.js');
var Player = require('../../common/game/gameobjects/Player.js');
var Pole = require('../../common/game/gameobjects/Pole.js');
var Shield = require('../../common/game/gameobjects/Shield.js');

var S = require('../../common/Settings.js');

var PlayerFactory = {


	createPlayer: function(polePos, id, callback, context){
		var player = new Player(id)
		var pole = this.createPole(polePos);
		var shield = this.createShield(pole);
		player.setPole(pole);
		player.setShield(shield);
		pole.setPlayer(player);
		player.setGlobalID(IDDistributor.getNewId());
		player.setUpdateCallBack(callback, context);

		return player;
	},

	/**
	* Create new Pole
	* @method PlayerFactory#createPole
	* @param {GroupManager} gm, group manager used to add pole
	*/
	createPole: function(polePos){
		var pole = new Pole(S.pole.size);
		pole.setPosition(polePos.left * S.canvasWidth + S.canvasWidth/2, polePos.top * S.canvasHeight + S.canvasHeight/2);

		return pole;
	},

	createShield: function(pole){	
		var shield = new Shield(pole);
		shield.getBody().immovable = true

		return shield;
	},
};

module.exports = PlayerFactory;
