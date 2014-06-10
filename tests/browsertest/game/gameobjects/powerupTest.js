describe("Powerup", function(){

	describe("#Create", function(){

		var p = new Powerup(10, 0);

		it("Should set the radius of this Powerup to be 10 and type to be 0", function() {
			expect(p.getRadius()).to.equal(10);
			expect(p.getType()).to.equal(0);
		})

	})

	describe("#Type", function(){
		
		var p = new Powerup(10, 2);

		it("Should change the powerup-type from 2 to 1", function() {
			expect(p.getType()).to.equal(2);
			p.setType(1);
			expect(p.getType()).to.equal(1);
		})
	})

	describe("#Color", function(){
		var p = new Powerup(10, 3);

		it("For type 3, the standard color should be aqua instead of red", function(){
			expect(p.getColor()).to.equal("aqua");
		})

		it("Should change the default aqua color to blue", function(){
			p.setColor("blue");
			expect(p.getColor()).to.equal("blue");
		})

	})

	describe("#Position", function(){
		var p = new Powerup(10, 4);

		it("Should change the position of the powerup", function(){
			expect(p.getPosition().x).to.equal(0);
			expect(p.getPosition().y).to.equal(0);
			p.setPosition(100, 30);
			expect(p.getPosition().x).to.equal(100);
			expect(p.getPosition().y).to.equal(30);
		})
	})

	describe("#Timer", function(){
		var p = new Powerup(10, 1);

		it("Check if the timer is created.", function(){
			expect(p.getTimer()).to.be.not.null;
		})
	})

})