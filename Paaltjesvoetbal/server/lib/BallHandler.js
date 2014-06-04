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
})