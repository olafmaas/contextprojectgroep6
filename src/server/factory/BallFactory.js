if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');

	var IDDistributor = require('../../common/game/util/IDDistributor.js');
	var ColorGenerator = require('../../common/game/util/ColorGenerator');
	var Ball = require('../../common/game/gameobjects/Ball.js');

	var S = require('../../common/Settings.js');
}

var BallFactory = Base.extend({

	createNewBall: function(_radius){
		ball = new Ball(_radius);
		ball.setPosition(S.ball.x, S.ball.y);
		ball.getBody().setVelocity(S.ball.velocity);
		ball.getBody().setVelocityDirection(S.ball.velocityDirection);
		ball.setColor(ColorGenerator.returnColor());
		ball.setGlobalID(IDDistributor.getNewId());

		return ball;
	}
});

if(typeof module != 'undefined'){
    module.exports = BallFactory;
}
