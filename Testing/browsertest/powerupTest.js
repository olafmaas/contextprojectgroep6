describe("Powerup", function(){

	describe("#Create", function(){

		var p = new Powerup(10, 0)

		it("Should set the radius of this Powerup to be 10 and type to be 0", function() {
			expect(p.getRadius()).to.equal(10);
			expect(p.getType()).to.equal(0);
		})

	})


	describe("Type", function(){
		//type veranderen en opvragen
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