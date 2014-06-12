var mouseDown = false;
describe("Body", function(){
	describe("#Update()", function(){
		var b = new Body();
		b.position = {x: 50, y: 50};
		b.setVelocity(10);
		
		beforeEach(function(){
			b.position = {x: 50, y:50};
			b.immovable = false;
		})

		it("Should ignore the velocity if the object is immovable", function(){
			b.immovable = true;
			b.update();
			expect(b.position.x).to.equal(50);
			expect(b.position.y).to.equal(50);
		})

		it("Should change the velocity if the object is movable in the x-direction", function(){
			b.update();
			expect(b.position.x).to.equal(60);
			expect(b.position.y).to.equal(50);
		})

		it("Should change the velocity if the object is movable in the y-direction", function(){
			b.setVelocityDirection(0.5*Math.PI)
			b.update();
			expect(b.position.x).to.equal(50);
			expect(b.position.y).to.equal(40);
		})
	})

	describe("#setVelocity(_vel)", function(){
		var b = new Body();
		b.position = {x: 50, y: 50};
		
		it("Should set the velocity right in the x-direction", function(){
			b.setVelocity(10);
			expect(b.vectorVelocity.x).to.equal(10);
			expect(b.vectorVelocity.y).to.equal(0);
		})

		it("Should set the velocity right in the y-direction", function(){
			b.setVelocityDirection(0.5*Math.PI)
			b.setVelocity(10);
			expect(Math.floor(b.vectorVelocity.x)).to.equal(0);
			expect(b.vectorVelocity.y).to.equal(-10);
		})
	})

	describe("#setVelocityDirection(_direction)", function() {
		var b = new Body();
		b.position = {x: 50, y: 50};
		b.setVelocity(10);

		it("Should set the velocity right in the x-direction", function(){
			b.setVelocityDirection(0);
			expect(b.getVelocityDirection()).to.equal(0)
			expect(b.vectorVelocity.x).to.equal(10);
			expect(b.vectorVelocity.y).to.equal(0);
		})

		it("Should set the velocity right in the x-direction", function(){
			b.setVelocityDirection(0.5*Math.PI);
			expect(b.getVelocityDirection()).to.equal(0.5*Math.PI)
			expect(Math.floor(b.vectorVelocity.x)).to.equal(0);
			expect(b.vectorVelocity.y).to.equal(-10);
		})
	})

	describe("#revertX/Yspeed()", function() {
		var b = new Body();
		b.position = {x: 50, y: 50};
		b.vectorVelocity = {x:10, y:10}

		it("Should set the speed right in the x-direction", function(){
			b.revertXSpeed();
			expect(b.vectorVelocity.x).to.equal(-10);
		})

		it("Should set the speed right in the x-direction", function(){
			b.revertYSpeed();
			expect(b.vectorVelocity.y).to.equal(-10);
		})
	})

	describe("#calculateVDirection()", function() {
		var b = new Body();
		b.vectorVelocity = {x:10, y:10};


		it("Should given a vector calculate the right angle", function (){
			//45 degrees
			expect(b.calculateVDirection()).to.equal(-0.25*Math.PI);
		})
	})

	describe("#calculateVelocity()", function() {
		var b = new Body();
		b.vectorVelocity = {x:10, y:10};


		it("Should given a velocityVector calculate the right speed", function (){
			//45 degrees
			expect(b.calculateVelocity()).to.equal(Math.sqrt(200));
		})
	})

	describe("#setXYSpeed()", function() {
		var b = new Body();


		it("Should given a velocityVector calculate the right speed", function (){
			//45 degrees
			b.setXYSpeed(10, 10)
			expect(b.velocity).to.equal(Math.sqrt(200));
			expect(b.getVelocityDirection()).to.equal(-0.25*Math.PI);
		})
	})

	describe("#getAngleTo()", function(){
		var b = new Body();
		b.position = {x: 50, y: 50};
		
		beforeEach(function(){
			b.position = {x: 50, y:50};
			b.immovable = false;
		})

		it("Should return the correct angle of another object", function(){
			var t = {
				getPosition: function(){
					return {x: 0, y: 0};
				}
			}

			expect(b.getAngleTo(t)).to.equal(-0.75*Math.PI);
		})
	})
})