describe("CircularBody", function(){

	describe("#Update", function(){
		
		
		var b = new Ball(10);
		var mockedBall = sinon.stub(b, 'setPosition');

		it("Should update his Ball object on update", function() {
			cb = new CircularBody(b);
			cb.update();
			expect(mockedBall).to.have.been.called;
		})
		
	})

	describe("#HandleCollision", function(){
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

	describe("#handleBallCollision", function(){
		var b = new Ball(10);

		it("Should handle the ball collision and set a new direction", function(){
			cb = new CircularBody(b);
			cb.setVelocityDirection(1);
			stubbedBall = sinon.stub(b, "getPosition", function(){return {x: 0, y:0}} )
			
			cb.handleBallCollision(b);

			expect(stubbedBall).to.have.been.calledTwice;
			expect(cb.getVelocityDirection()).to.equal(-1);
		})

	})

	describe("#handleShieldCollision", function(){
		it("Should handle the shield  collision and set a new direction  -- TBD")
	})

	describe("#checkWorldBounds", function() {
		var b = new Ball(10);
		b.setPosition(100, 100);

		it("Should check if the ball collides with the world", function() {
			cb = new CircularBody(b);
			cb.setVelocity(1);
			si = function(){
				this.getDimensions = function(){ return {width: 1000, height: 1000} }
			};
			cb.checkWorldBounds(new si());
			expect(cb.getVelocity()).to.equal(1);
		})

		it("Should if the ball collides with the world handle it", function() {
			b.setPosition(0, 0);
			cb = new CircularBody(b);
			cb.setVelocity(1);
			si = function(){
				this.getDimensions = function(){ return {width: 1000, height: 1000} }
			};
			cb.checkWorldBounds(new si());
			expect(cb.getVelocity()).to.equal(1);
		})
	})
})