if(typeof module != 'undefined'){
	var Base = require('../../game/util/Base.js');
	var Ball = require('../../game/Ball.js');
	var IDDistributor = require('../../game/util/IDDistributor.js');
	var ColorGenerator = require('../../game/util/ColorGenerator');
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
