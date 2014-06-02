
describe("PlayerTimer", function(){

	describe("#startTimer", function(){
		var p = new Player("Test");

		it("Should start the timer and set the interval", function() {
			t = new PlayerTimer(p);
			expect(t.isPaused()).to.be.false;
		})

	})

})