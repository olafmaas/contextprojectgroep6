
function BallManager(){
	var ballCount = 0;
	var balls = [];

	this.preload = function(){
	    game.load.image('ball', 'assets/pole.png');
	};

	this.create= function(){
	    
	};

	this.update = function(){
		if(ballCount < 1 || game.input.keyboard.justPressed(Phaser.Keyboard.S, 10)){
			this.spawnBall();
		}

		for(var i = 0; i < balls.length; i++){
			balls[i].update();
		}
	};

	this.spawnBall = function(){
		var ball = new Ball();
		ball.create();
		balls.push(ball);
		ballCount++;
	};
}

