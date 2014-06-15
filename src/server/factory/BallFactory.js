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
		ball = new Ball(_radius);
		ball.setPosition(S.ball.x, S.ball.y);
		ball.getBody().setVelocity(velocity);
		ball.getBody().setVelocityDirection(S.ball.velocityDirection);
		ball.setColor(ColorGenerator.returnColor());
		ball.setGlobalID(IDDistributor.getNewId());

		console.log("Velocity: " + velocity);
		return ball;
	}
});

if(typeof module != 'undefined'){
    module.exports = BallFactory;
}
