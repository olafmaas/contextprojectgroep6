describe("CircularBody", function(){

	describe("#Update", function(){
		
		
		var b = new Ball(10);
		var mockedBall = sinon.stub(b, 'setPosition');

		it("Should update his Ball object on update", function() {
			cb = new CircularBody(b);
			cb.Update();
			expect(mockedBall).to.have.been.called;
		})
		
	})

	describe("#CollidesWith", function(){
		var b = new Ball(10);

		

		it("Should detect if the other object is a ball and pass it to another function", function(){
			var othercb = new CircularBody(b);
			cb = new CircularBody(b);
			var stubbedHandleBall = sinon.stub(cb, 'handleBallCollision')
			cb.handleCollision(othercb);
			expect(stubbedHandleBall).to.have.been.called;
		})

		it("Should detect if the other object is a shield and pass it to another function", function(){
			cb = new CircularBody(b);
			var stubbedHandleBall = sinon.stub(cb, 'handleShieldCollision');
			cb.handleCollision(sinon.createStubInstance(ShieldBody));
			expect(stubbedHandleBall).to.have.been.called;
		})
	})

	describe("#CollidesWithBall", function(){
		var b = new Ball(10);
		var mockedBall = sinon.stub(b, 'setPosition');

		it("Should detect a collision with an other ball if they collide")

		it("Shouldn't detect a collision with an other ball if they don't collide")
	})
})