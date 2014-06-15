if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');

	var IDDistributor = require('../../common/game/util/IDDistributor.js');
	var ColorGenerator = require('../../common/game/util/ColorGenerator');
	var Ball = require('../../common/game/gameobjects/Ball.js');

	var S = require('../../common/Settings.js');
}

var BallFactory = Base.extend({

	createNewBall: function(_radius){
		var velocity = Math.floor(Math.random() * (S.ball.velocityRange.to - S.ball.velocityRange.from+1)) + S.ball.velocityRange.from;		
		var randomX = Math.floor(Math.random() * S.ball.nrOfNewBalls)
		var randomY = Math.floor(Math.random() * S.ball.nrOfNewBalls)
		var position = {x: S.ball.x + (randomX * _radius * 2), y: S.ball.y + (randomY * _radius * 2)};

		ball = new Ball(_radius);
		ball.setPosition(position.x, position.y);
		ball.getBody().setVelocity(velocity);
		ball.getBody().setVelocityDirection(S.ball.velocityDirection);
		ball.setColor(ColorGenerator.returnColor());
		ball.setGlobalID(IDDistributor.getNewId());

		console.log("Velocity: " + velocity);
		console.log("Position: " + ball.getPosition().x + " | " + ball.getPosition().y)
		return ball;
	}
});

if(typeof module != 'undefined'){
    module.exports = BallFactory;
}
