
function Pole(){
	var sprite;
	var shield;

	this.preload = function(){
	    game.load.image('pole', 'assets/pole.png');
	};

	this.create= function(){
	    this.sprite = game.add.sprite(300, 300, 'pole');
	    this.sprite.anchor.setTo(0.5, 0.5);
	};

	this.update = function(){

	};
}

