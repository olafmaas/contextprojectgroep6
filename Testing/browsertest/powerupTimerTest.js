
describe("PowerupTimer", function(){

	describe("#startTimer", function(){
		var p = new Powerup(10, 0)

		it("Should start the timer and set the interval", function() {
			t = new PowerupTimer(20);
			expect(t.isPaused()).to.be.false;
		})

	})

	describe("#count", function(){
		var p = new Powerup(10, 0)

		it("Should decrease the time by 1", function() {
			t = new PowerupTimer(10);
			t.count(t);
			expect(t.getTime()).to.equal(9);
		})

		it("Should stop the timer when it reaches 0", function(){
			t = new PowerupTimer(1);
			t.count(t);
			expect(t.getTime()).to.equal(0);
			t.count(t);
			expect(expect(t.getTime()).to.equal(0));
		})
	})

})