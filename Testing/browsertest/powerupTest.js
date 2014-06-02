describe("Powerup", function(){

	describe("#Create", function(){

		var p = new Powerup(10, 0);

		it("Should set the radius of this Powerup to be 10 and type to be 0", function() {
			expect(p.getRadius()).to.equal(10);
			expect(p.getType()).to.equal(0);
		})

	})


	describe("Type", function(){
		var p = new Powerup(10, 0);

		it("Should change the powerup-type from 0 to 1", function() {
			expect(p.getType()).to.equal(0);
			p.setType(1);
			expect(p.getType()).to.equal(1);
		})
	})

	describe("Timer", function(){
		//timer opvragen terwijl hij niet in gebruik is
		//timer opvragen terwijl hij afloopt
		//timer opvragen nadat hij is afgelopen
	})


	describe("Color", function(){
		//kleur aanpassen en opvragen

	})

	describe("Position", function(){
		//positie veranderen en opvragen
	})

})