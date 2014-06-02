
describe("PlayerTimer", function(){

	describe("#startTimer", function(){
		var p = new Player("Test");

		it("Should start the timer and set the interval", function() {
			t = new PlayerTimer(p);
			expect(t.isPaused()).to.be.false;
		})

	})

	describe("#count", function(){

		var p = new Player("Test");

		it("Should increase the time by one and update the player's score by 1", function() {
			t = new PlayerTimer(p);
			expect(p.getScore()).to.equal(0);
			t.count();
			expect(t.getTime()).to.equal(1);
			expect(p.getScore()).to.equal(1);
		})
	})

})