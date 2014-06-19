var S = Settings;

describe("BallFactory", function(){
	describe("#createNewBall", function(){
		it("Should return a new ball", function(){
			var b = BallFactory.createNewBall(10);
			expect(b.getRadius()).to.equal(10);
			expect(b.getRadius()).to.be.not.null;
			expect(b.getBody().getVelocity()).to.be.not.null;
			expect(b.getBody().getVelocityDirection()).to.be.not.null;
			expect(b.getColor()).to.be.not.null;
			expect(b.getGlobalID()).to.be.not.null;
		})
	})

	describe("#randomVelocity", function(){
		it("returns a velocity between values from settings", function(){
			var v = BallFactory.randomVelocity();
			expect(v).to.be.least(S.ball.velocityRange.from);
			expect(v).to.be.most(S.ball.velocityRange.to);
		})
	})

	describe("#randomVelocityDirection", function(){
		it("Should return random direction", function(){
			var d = BallFactory.randomVelocityDirection();
			expect(d).to.be.least(0);
			expect(d).to.be.most(2*Math.PI);
		})
	})

	describe("#randomPosition", function(){
		it("Should return a random x y pos", function(){
			var p = BallFactory.randomPosition();
			expect(p.x).to.be.least(S.ball.x);
			expect(p.x).to.be.most(S.ball.x + (S.ball.nrOfNewBalls * S.ball.size * 2) );

			expect(p.y).to.be.least(S.ball.y);
			expect(p.y).to.be.most(S.ball.y + (S.ball.nrOfNewBalls * S.ball.size * 2));
		})
	})


})