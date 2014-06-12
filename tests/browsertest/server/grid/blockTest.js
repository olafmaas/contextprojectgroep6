function StubSock(){
	this.emit = function(x, y){return 0}
}

var fakeSok = new StubSock();

describe("Body", function(){
	describe("#addBall", function(){
		it("It should add a ball and emit it to the player", function(){
			function StubSock(){
				this.emit = function(x, y){return 0}
			}

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
		it("It should add a ball if it is not already in the ball list", function(){
			b = new Block(fakeSok, 0, 0) 
			ball = new Ball(10);
			b.ballIncoming(ball);

			ball.setGlobalID(10);
			expect(b.getBallIndex(ball) > -1);
		})

		it("It should not add the ball if it isalready in the ball list", function(){
			b = new Block(fakeSok, 0, 0) 
			ball = new Ball(10);
			b.ballIncoming(ball);
			b.ballIncoming(ball);

			ball.setGlobalID(10);
			expect(b.getBallsList().length).to.equal(1);
		})
	})

	describe("#blocksToSendBallTo", function(){
		it("It should add a ball if it is not already in the ball list")

		it("It should not add the ball if it isalready in the ball list")
	})
})