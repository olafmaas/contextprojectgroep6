
function Shield(pole){
	var sprite;
	var pole;

	this.pole = pole;
	pole.shield = this;

	this.preload = function(){  
    	game.load.image('shield', 'assets/shield.png');

	};

	this.create= function(){
	    this.sprite = game.add.sprite(pole.sprite.x, pole.sprite.y, 'shield');
	    this.sprite.anchor.setTo(0.5, 0.5);
	};

	this.update = function(){
		var mousePointerPos = game.input.activePointer.position;
    	this.sprite.rotation = -Math.atan2(mousePointerPos.x - this.pole.sprite.x, mousePointerPos.y - this.pole.sprite.y) - 0.75 * Math.PI;

	};
}

