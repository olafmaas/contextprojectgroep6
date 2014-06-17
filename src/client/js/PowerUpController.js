function PowerUpController(){

	var powerupCDTimer = null;
	var playerCDTimer = null;
	var powerupRemovalTimer = null;
	var icon = null;
	var powerup = null;

	//The powerup stuff should be placed somewhere else I think..
	this.createPowerup = function(leftOffset, topOffset){
		if(powerup != null) removePowerup();

		var type = randomPowerType(); //choose a radom type
		powerup = game.instantiate(new Powerup(Settings.powerupSize, type));
		
		randomPosition = getRandomPosition();
		powerup.setPosition(randomPosition.x, randomPosition.y);
		createIcon(type); //temporarily disabled

		powerupRemovalTimer = setTimeout(removePowerup, Settings.removalTime*1000); //set timer so powerup is removed after x seconds.
		powerupCoolDown((Settings.removalTime * 1000) / 90); //90 because we increment the angle by 4 (360/90 = 4)

		return {t: type, position: {
				x: randomPosition.x + leftOffset,
				y: randomPosition.y + topOffset,
		}};
	};

	function getRandomPosition(){
		var chooser = Math.round(Math.random()); //random 0 or 1

		var width = Settings.canvasWidth;
		var height = Settings.canvasHeight;
		var shieldRadius = Settings.shield.radius;
		var powerupSize = Settings.powerupSize;
		
		var dx = Math.round(Math.random() * ((width - powerupSize) - (width/2 + shieldRadius + 2*powerupSize)) + ((shieldRadius + 2*powerupSize) * (1-chooser)));
		var dy = Math.round(Math.random() * ((height - powerupSize) - (height/2 + shieldRadius + 2*powerupSize)) + ((shieldRadius + 2*powerupSize) * chooser));
		
		if(Math.round(Math.random())) //randomly decide whether to make x-coordinate negative
			dx *= -1;
		if(Math.round(Math.random())) //randomly decide whether to make y-coordinate negative
			dy *= -1;

		return {x: Settings.canvasWidth/2 + dx, y: Settings.canvasHeight/2 + dy};
	};

	function randomPowerType(){
		var random = Math.random();
		var chanceOfSmallShield = Settings.smallShield.chance;
		var chanceOfBigShield = Settings.bigShield.chance;
		var chanceOfSmallPole = Settings.smallPole.chance;
		var chanceOfBigPole = Settings.bigPole.chance;
		var chanceOfRevert = Settings.revertShield.chance;
		
		var sum = chanceOfSmallShield + chanceOfBigShield + chanceOfSmallPole + chanceOfBigPole + chanceOfRevert;
		
		if(random < chanceOfSmallShield/sum){
		 	return e.smallShield;
		}
		else if(random < (chanceOfSmallShield + chanceOfBigShield)/sum){
			return e.bigShield;
		}
		else if(random < (chanceOfSmallShield + chanceOfBigShield + chanceOfSmallPole)/sum){
			return e.smallPole;
		}
		else if(random < (chanceOfSmallShield + chanceOfBigShield + chanceOfSmallPole + chanceOfBigPole)/sum){
			return e.bigPole;
		}
		else{
			return e.revertShield;
		}
	};

	//
	function createIcon(_type){
		switch(_type){
			case e.smallShield:
			icon = game.instantiate(new Sprite(Settings.smallShield.path));

			case e.bigShield:
			icon = game.instantiate(new Sprite(Settings.bigShield.path));

			case e.smallPole:
			icon = game.instantiate(new Sprite(Settings.smallPole.path));

			case e.bigPole:
			icon = game.instantiate(new Sprite(Settings.bigPole.path));

			case e.revertShield: 
			icon = game.instantiate(new Sprite(Settings.revertShield.path));
		}

		var size = Settings.powerupSize-2;
		icon.setPosition(powerup.getPosition());
		icon.setSize({x: size*2, y: size*2});
		icon.setAnchor({x: -size, y: -size});
	};

	this.checkPowerup = function(_x, _y){
		if(powerup != null){ //only when a powerup is present!
			if(!scale) scale = 1;
			var powerupPos = powerup.getPosition();

			//Check whether distance between powerup center and click is less than radius
			var inX = Math.abs(powerupPos.x*scale - _x) <= powerup.getRadius();
			var inY = Math.abs(powerupPos.y*scale - _y) <= powerup.getRadius();

			if(inX && inY){
				clearTimeout(powerupRemovalTimer); //remove the timer
				player.setPowerup(powerup); 
				playerCoolDown((powerup.getTimer().getTime() * 1000) / 90);

				var type = powerup.getType();
				removePowerup();
				return {gid: player.getGlobalID(), t: type};
			}
		}
	};

	/**
	* Removes the powerup + icon from the user's screen
	* 
	* @method PlayerConnection#removePowerup
	*/
	function removePowerup(){
		if(powerup != null){
			game.remove(powerup);
			powerup = null;
		}
		if(icon != null) { 
			game.remove(icon);
			icon = null;
		}
	}



	/**
	* Instantiates the cooldown belonging to a powerup. 
	* It also removes any previous timeout that is present (to avoid cooldowns going to quick)
	*
	* @method PlayerConnection#powerupCoolDown
	* @param {number} _time - The time in milliseconds at which the setTimeout function is called
	*/
	function powerupCoolDown(_time) {
		clearTimeout(powerupCDTimer); //Clear any old poweruptimeout that might be present
        powerup.setCDAngle(0);
        powerupCDTimer = setTimeout(function() { coolDown(powerup, _time); }, _time);
	}
	
	/**
	* Instantiates the cooldown belonging to a player after a powerup has been activated. 
	* It also removes any previous timeout that is present (to avoid cooldowns going to quick)
	*
	* @method PlayerConnection#playerCoolDown
	* @param {number} _time - The time in milliseconds at which the setTimeout function is called
	*/
	function playerCoolDown(_time){
		clearTimeout(playerCDTimer); //Clear any old playertimeout that might be present
    	player.getPole().setCDAngle(0);		
    	playerCDTimer = setTimeout(function() { coolDown(pole, _time); }, _time);
    }

    /**
    * The cooldown function that is called by playerCoolDown and powerupCoolDown
    * It handles the actual coolDown and makes sure the angles are set and the function
    * is called again (until the cooldown is over)
    *
    * @method PlayerConnection#coolDown
    * @param {Object} _object - The object which has the cooldown
    * @param {numer} _time - The time in milliseconds at which the setTimout function is called
    */
	function coolDown(_object, _time){
		if(_object != null){
			_object.incrementCDAngle(4);
			if(_object.getCDAngle() < 360) {
				if(_object instanceof Pole) {
					playerCDTimer = setTimeout(function() { coolDown(_object, _time); }, _time);
				} else {
					powerupCDTimer = setTimeout(function() { coolDown(_object, _time); }, _time);
				}
			}
		}
	}
}