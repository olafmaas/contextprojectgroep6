if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');

	var IDDistributor = require('../../common/game/util/IDDistributor.js');
	var ColorGenerator = require('../../common/game/util/ColorGenerator');
	var Ball = require('../../common/game/gameobjects/Ball.js');

	var S = require('../../common/Settings.js');
}

var BallFactory = Base.extend({

	createNewBall: function(_radius){
		var velocity = this.randomVelocity();
		var position = this.randomPosition();

		ball = new Ball(_radius);
		ball.setPosition(position.x, position.y);
		ball.getBody().setVelocity(velocity);
		ball.getBody().setVelocityDirection(S.ball.velocityDirection);
		ball.setColor(ColorGenerator.returnColor());
		ball.setGlobalID(IDDistributor.getNewId());

		console.log("Velocity: " + velocity);
		console.log("Position: " + ball.getPosition().x + " | " + ball.getPosition().y)
		return ball;
	},

	//Returns a random velocity depending on the velocity range in the settings.
	randomVelocity: function(){
		return Math.floor(Math.random() * (S.ball.velocityRange.to - S.ball.velocityRange.from+1)) + S.ball.velocityRange.from;		
	},

	//Returns a random position centered around the initial position in the settings.
	//The positions are (2 * ball radius) apart from eachother to prevent them from spawning half into another ball
	randomPosition: function() {
		var randomX = Math.floor(Math.random() * S.ball.nrOfNewBalls)
		var randomY = Math.floor(Math.random() * S.ball.nrOfNewBalls)
		
		return {x: S.ball.x + (randomX * S.ball.size * 2), y: S.ball.y + (randomY * S.ball.size * 2)};
	}
});

if(typeof module != 'undefined'){
    module.exports = BallFactory;
}
