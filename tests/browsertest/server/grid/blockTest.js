function StubSock(){
	this.emit = function(x, y){return 0}
}

var fakeSok = new StubSock();

describe("Block", function(){
	describe("#addBall", function(){
		it("Should add a ball and emit it to the player", function(){
			_socket = sinon.stub(fakeSok, "emit");
			b = new Block(fakeSok, 0, 0) 
			ball = new Ball(10);
			b.addBall(ball);
			ball.setGlobalID(10);
			expect(_socket).to.be.called;
			expect(b.getBallIndex(ball) > -1);
		})
	})

	describe("#ballIncoming", function(){
		it("Should add a ball if it is not already in the ball list", function(){
			b = new Block(fakeSok, 0, 0) 
			ball = new Ball(10);
			b.ballIncoming(ball);

			ball.setGlobalID(10);
			expect(b.getBallIndex(ball) > -1);
		})

		it("Should not add the ball if it isalready in the ball list", function(){
			b = new Block(fakeSok, 0, 0) 
			ball = new Ball(10);
			b.ballIncoming(ball);
			b.ballIncoming(ball);

			ball.setGlobalID(10);
			expect(b.getBallsList().length).to.equal(1);
		})
	})

	describe("#directionsToSendBallTo", function(){
		it("Should return an array with element left if a ball should be send to the left", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(9, 10);
			ball.getBody().setXYSpeed(-1,-1);
			var res = b.blocksToSendBallTo(ball);
			expect(res[0]).to.equal("left");
			expect(res.length).to.equal(1);
		})

		it("Shouldn't return an array with element left if a ball should be send to the left", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(9, 10);
			ball.getBody().setXYSpeed(1,1);
			var res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("left")).to.equal(-1);
			expect(res.length).to.equal(0);
			
		})

		it("Should return an array with element right if a ball should be send to the right", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(Settings.canvasWidth - 9, 10);
			ball.getBody().setXYSpeed(1, 1);
			res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("right")).to.equal(0);
			expect(res.length).to.equal(1);
		})

		it("Shouldn't return an array with element right if a ball shouldn't be send to the right", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(Settings.canvasWidth - 9, 10);
			ball.getBody().setXYSpeed(-1, -1);
			res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("right")).to.equal(-1);
			expect(res.length).to.equal(0);
		})

		it("Should return an array with element top if a ball should be send to the top", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(11, 8);
			ball.getBody().setXYSpeed(-1, -1);
			res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("top")).to.equal(0);
			expect(res.length).to.equal(1);
		})

		it("Shouldn't return an array with element top if a ball shouldn't be send to the top", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(11, 8);
			ball.getBody().setXYSpeed(1, 1);
			res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("top")).to.equal(-1);
			expect(res.length).to.equal(0);
		})

		it("Should return an array with element bottom if a ball should be send to the bottom", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(Settings.canvasHeight - 9,Settings.canvasHeight -  9);
			ball.getBody().setXYSpeed(1, 1);
			res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("bottom")).to.equal(0);
			expect(res.length).to.equal(1);
		})

		it("Shouldn't return an array with element bottom if a ball shouldn't be send to the bottom", function(){
			b = new Block(false, 0, 0);
			ball = new Ball(10);
			ball.setPosition(9, Settings.canvasHeight -  9);
			ball.getBody().setXYSpeed(1, -1);
			res = b.blocksToSendBallTo(ball);
			expect(res.indexOf("bottom")).to.equal(-1);
			expect(res.length).to.equal(0);
		})
	})

	describe("#update", function(){
		it("Should check if a ball should be removed.", function(){
			b = new Block(fakeSok, 0, 0) 
			ball = new Ball(10);
			var stubbedRemove = sinon.stub(b, "shouldBeRemoved")
			b.addBall(ball);
			b.update();
			expect(stubbedRemove).to.be.called;
		})
	})
})