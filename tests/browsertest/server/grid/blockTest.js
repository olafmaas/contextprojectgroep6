function StubSock(){
	this.emit = function(x, y){return 0}
}

var fakeSok = new StubSock();

describe("Body", function(){
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

	describe("#blocksToSendBallTo", function(){
		it("Should add a ball if it is not already in the ball list")

		it("Should not add the ball if it isalready in the ball list")
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