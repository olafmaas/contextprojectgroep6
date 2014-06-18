function PowerUpController(){


	//The powerup stuff should be placed somewhere else I think..
	this.createPowerup = function(_ptype, _plocation){
		var powerupSprite = game.instantiate(new Sprite(Powerup.getPowerupSpritePath(_ptype)));
		powerupSprite.setPosition(_plocation);
		powerupSprite.setSize({x: 36, y: 36});

		setTimeout(function(){
			game.remove(powerupSprite);
		}, Settings.removalTime * 1000);
	};

	this.powerupClicked = function(_pid, _ptype){
		var p = players.getMemberByGlobalID(_pid);
		if(p != -1){ //if player has been found
			var powerup = new Powerup(Settings.powerupSize, _ptype); //NOT game.instantiate!!, as it should not exists outside this function!
			p.setPowerup(powerup);
		}
	}
}