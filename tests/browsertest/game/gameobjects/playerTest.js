describe("Player", function(){

	describe("#incrementPoints", function(){

		it("Should increment the number of points by the given amount", function(){
			p = new Player("Jan");
			p.incrementPoints(10);
			expect(p.getPoints()).to.equal(15);
		})
	})

	describe("#incrementScore", function(){

		it("Should increment the score by the given amount", function(){
			p = new Player("Klaas");
			p.incrementScore(2);
			expect(p.getScore()).to.equal(2);
		})
	})

	describe("#update", function(){

		it("Should get te score and print it on a label -- TBD ")
	})
})