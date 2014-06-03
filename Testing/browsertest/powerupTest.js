describe("Powerup", function(){

	describe("#Create", function(){

		var p = new Powerup(10, 0);

		it("Should set the radius of this Powerup to be 10 and type to be 0", function() {
			expect(p.getRadius()).to.equal(10);
			expect(p.getType()).to.equal(0);
		})

	})


	describe("Type", function(){
		
		var p = new Powerup(10, 2);

		it("Should change the powerup-type from 2 to 1", function() {
			expect(p.getType()).to.equal(2);
			p.setType(1);
			expect(p.getType()).to.equal(1);
		})
	})

	describe("Color", function(){
		var p = new Powerup(10, 3);

		it("For type 3, the standard color should be red", function(){
			expect(p.getColor()).to.equal("red");
		})

		it("Should change the default red color to blue", function(){
			p.setColor("blue");
			expect(p.getColor()).to.equal("blue");
		})

	})

	describe("Position", function(){
		var p = new Powerup(10, 4);

		it("Should change the position of the powerup", function(){
			expect(p.getPosition().x).to.equal(0);
			expect(p.getPosition().y).to.equal(0);
			p.setPosition(100, 30);
			expect(p.getPosition().x).to.equal(100);
			expect(p.getPosition().y).to.equal(30);
		})
	})
/*
	describe("Timer", function(){

		var p = new Powerup(10, 1);
		var mockedTimer = sinon.stub(p.getTimer(), 'count');

		it("For type 1, the powerup timer is 30 sec and should be set on creation", function(){
			expect(p.getTimeLeft()).to.equal(30);
			expect(p.isActive()).to.be.false;
		})

		it("When a powerup timer is started, it should count down", function(){
			expect(p.isActive()).to.be.false;
			p.startCountdown();
			expect(mockedTimer).to.have.been.called;
			excpect(p.isActive()).to.be.true;
		})

		it("When the timer has finished, the powerup should not be active anymore", function(){
			p.startCountdown();
			p.getTimer().stop();
			expect(p.isActive()).to.be.false;
		})
	})
*/
})