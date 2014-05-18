
function Ball(){
	var sprite;
	var direction;

	var startSpeed = 1;

	this.create= function(){
	    this.sprite = game.add.sprite(game.width * Math.random(), game.height * Math.random(), 'ball');
	    this.sprite.anchor.setTo(0.5, 0.5);

	    game.physics.ninja.enableCircle(this.sprite, this.sprite.width / 2);
	    this.sprite.body.bounce = 1;

	    this.direction = Math.random() * (2 * Math.PI);
	};

	this.update = function(){
		this.direction = this.direction % (2 * Math.PI);
	};
}

