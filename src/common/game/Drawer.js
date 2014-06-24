/**
* Drawer class
* @class Drawer
* @classdesc Class which draws everything in the playing field.
*/
Drawer = function(_canvasContext){
	canvasContext = _canvasContext;

	/**
	* Function which calls the correct drawing method
	* @method Drawer#draw
	* @param {object} _element - The object to be drawn
	*/
	this.draw = function(_element){
		if(_element instanceof Pole) this.drawBall(_element, true);
		else if(_element instanceof Ball) this.drawBall(_element, false);
		else if(_element instanceof Shield) this.drawShield(_element);
		else if(_element instanceof Label) this.drawLabel(_element);
		else if(_element instanceof Powerup) this.drawPowerup(_element);
		else if(_element instanceof Sprite) this.drawSprite(_element);
	};

	/**
	* Function which draws the actual ball object
	* @method Drawer#drawBall
	* @param {object} _ball - The ball object to be drawn
	*/
	this.drawBall = function(_ball, _isPole){
		if(_isPole) { this.drawPowerupSkin(_ball); }

		canvasContext.beginPath();
		canvasContext.arc(_ball.getBody().position.x, _ball.getBody().position.y, _ball.radius, 0, Math.PI*2, true);
		canvasContext.closePath();

		canvasContext.fillStyle = _ball.color;
		canvasContext.fill();
	};

	/**
	* Function which draws the actual sprite object
	* @method Drawer#drawSprite
	* @param {object} _sprite - The sprite object to be drawn
	*/
	this.drawSprite = function(_sprite){
		canvasContext.drawImage(_sprite.getTexture(), _sprite.getPosition().x + _sprite.getAnchor().x, _sprite.getPosition().y + _sprite.getAnchor().y, _sprite.getSize().x, _sprite.getSize().y);
	};

	/**
	* Function which draws the actual shield object
	* @method Drawer#drawShield
	* @param {object} _shield - The shield object to be drawn
	*/
	this.drawShield = function(_shield){
		var revert = 1;
		if(_shield.isRevert()) revert = -1;

		canvasContext.beginPath();
  		canvasContext.arc(_shield.getPosition().x, _shield.getPosition().y, _shield.getRadius(), (revert * _shield.getAngle()) - (_shield.getSize() / _shield.getShieldLength()), (revert * _shield.getAngle()) + (_shield.getSize() / _shield.getShieldLength()));
  		canvasContext.strokeStyle = _shield.getColor();
  		canvasContext.lineWidth = Settings.shield.shieldWidth;
  		canvasContext.stroke();
	};

	/**
	* Function which draws the actual label object
	* @method Drawer#drawLabel
	* @param {object} _label - The label object to be drawn
	*/
	this.drawLabel = function(_label){
		canvasContext.fillStyle = _label.getColor();
		canvasContext.font = _label.getFontSize() + "px " + _label.getFont();
		canvasContext.fillText(_label.getText(), _label.getPosition().x, _label.getPosition().y);
	};

	/**
	* Function which draws the actual powerup object
	* @method Drawer#drawPowerup
	* @param {object} _powerup - The powerup object to be drawn
	*/
	this.drawPowerup = function (_powerup){
		this.drawCoolDown(_powerup, 0); //powerup should have a cooldown effect
	};

	/**
	* Draws the ring around the pole when a powerup is active
	* Note: this only happens when the pole is allowed to have a ring (so not on mainscreen)
	*
	* @method Draw#drawPowerupSkin
	* @param {object} _pole - The pole around which the ring will be drawn
	*/
	this.drawPowerupSkin = function (_pole){
		var powerup = _pole.player.getPowerup();
		if(powerup != null && _pole.getPowerupDraw()){
			this.drawCoolDown(_pole, Settings.pole.ring, powerup.getColor());
		}
	}

	/**
	* Draws the powerup / pole with a cooldown effect
	*
	* @method Drawer#drawCoolDown
	* @param {Object} _object - The object for which the cooldown is drawn
	* @param {number} _offset - The offset which actually shows the ring around the object
	* @param {string} _color - Optional; the color of the cooldown ring, or the color of the object if not specified
	*/
	this.drawCoolDown = function (_object, _offset, _color){	
		if(_object.getCDAngle() > 0){
			var startAngle = Settings.startAngle;
			var endAngle = (startAngle + _object.getCDAngle()) % 360;

			canvasContext.fillStyle = _color || _object.getColor();
			canvasContext.moveTo(_object.getPosition().x, _object.getPosition().y)
			canvasContext.beginPath();
			canvasContext.arc(
				_object.getBody().position.x, _object.getBody().position.y, _object.getRadius() + _offset, startAngle * Math.PI / 180,
				endAngle * Math.PI / 180, true
			);
			canvasContext.lineTo(_object.getPosition().x, _object.getPosition().y);
			
			canvasContext.fill();	
			canvasContext.closePath();
    	}
	}
}
