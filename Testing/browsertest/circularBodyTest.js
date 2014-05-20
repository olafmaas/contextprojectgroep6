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
		it("Should detect a collision with an other ball")
		it("Should throw an exception if an collision with an other object is detected")
	})

	describe("#CollidesWithBall", function(){
		var b = new Ball(10);
		var mockedBall = sinon.stub(b, 'setPosition');

		it("Should detect a collision with an other ball if they collide")

		it("Shouldn't detect a collision with an other ball if they don't collide")
	})
})