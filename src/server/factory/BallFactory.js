if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');

	var IDDistributor = require('../../common/game/util/IDDistributor.js');
	var ColorGenerator = require('../../common/game/util/ColorGenerator');
	var Ball = require('../../common/game/gameobjects/Ball.js');
}

var BallFactory = Base.extend({

	createNewBall: function(_radius){
		ball = new Ball(_radius);
		ball.setPosition(100, 100);
		ball.getBody().setVelocity(5);
		ball.getBody().setVelocityDirection(1.70 * Math.PI);
		ball.setColor(ColorGenerator.returnColor());
		ball.setGlobalID(IDDistributor.getNewId());

		return ball;
	}
});

if(typeof module != 'undefined'){
    module.exports = BallFactory;
}
