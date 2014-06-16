
describe("ColorGenerator", function(){

	describe("#returnColor", function(){

		it("Should return a string which consists of a '#' and 6 characters", function(){
			var color = ColorGenerator.returnColor();
			expect(color.length).to.equal(7);
			expect(color.charAt(0)).to.equal("#");
		})
	})

})