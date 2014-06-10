Drawer = function(_canvasContext){
	canvasContext = _canvasContext;

	this.draw = function(_element){
		if(_element instanceof Ball) this.drawBall(_element);
		else if(_element instanceof Pole) this.drawBall(_element);
		else if(_element instanceof Shield) this.drawShield(_element);
		else if(_element instanceof Label) this.drawLabel(_element);
		else if(_element instanceof Powerup) this.drawPowerup(_element);
		else if(_element instanceof Sprite) this.drawSprite(_element);
	};

	this.drawBall = function(_ball){
		canvasContext.beginPath();
		canvasContext.arc(_ball.getBody().position.x, _ball.getBody().position.y, _ball.radius, 0, Math.PI*2, true);
		canvasContext.closePath();

		canvasContext.fillStyle = _ball.color;
		canvasContext.fill();
	};

	this.drawSprite = function(_sprite){
		canvasContext.drawImage(_sprite.getTexture(), _sprite.getPosition().x + _sprite.getAnchor().x, _sprite.getPosition().y + _sprite.getAnchor().y, _sprite.getSize().x, _sprite.getSize().y);
	};

	this.drawShield = function(_shield){
		var revert = 1;
		if(_shield.isRevert()) revert = -1;

		canvasContext.beginPath();
  		canvasContext.arc(_shield.getPosition().x, _shield.getPosition().y, _shield.getRadius(), (revert * _shield.getAngle()) - (_shield.getSize() / _shield.getShieldLength()), (revert * _shield.getAngle()) + (_shield.getSize() / _shield.getShieldLength()));
  		canvasContext.strokeStyle = _shield.getColor();
  		canvasContext.lineWidth = Settings.shield.shieldWidth;
  		canvasContext.stroke();
	};

	this.drawLabel = function(_label){
		canvasContext.fillStyle = _label.getColor();
		canvasContext.font = _label.getFontSize() + "px " + _label.getFont();
		canvasContext.fillText(_label.getText(), _label.getPosition().x, _label.getPosition().y);
	};

	this.drawPowerup = function (_powerup){
		canvasContext.beginPath();
		canvasContext.arc(_powerup.getPosition().x, _powerup.getPosition().y, _powerup.getRadius(), 0, Math.PI*2, true);
		canvasContext.closePath();
		
		canvasContext.fillStyle = _powerup.getColor();
		canvasContext.fill();
	};
}
