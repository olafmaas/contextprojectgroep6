
describe("RandomTimer", function(){

	describe("#Constructor", function(){

		it("Should have created a timer with a random interval between 1 and 10 (inclusive)", function() {
			t = new RandomTimer(1, 10);
			expect(t.getTime()).to.be.least(1);
			expect(t.getTime()).to.be.most(10);
		})

		it("Should not create a timer when min is bigger than max (should yield time = 0)", function() {
			t = new RandomTimer(4, 2);
			expect(t.getTime()).to.equal(0);
		})

	})

	describe("#count", function(){

		it("Should decrease the time by 1", function() {
			t = new RandomTimer(4, 14);
			var randomTime = t.getTime();
			t.count(t);
			expect(t.getTime()).to.equal(randomTime - 1);
		})

		it("Should stop the timer when it reaches 0", function(){
			t = new RandomTimer(1, 1);
			t.count(t);
			expect(t.getTime()).to.equal(0);
			t.count(t);
			expect(expect(t.getTime()).to.equal(0));
		})
	})

	describe("#hasStopped", function(){

		it("Should not be stopped when a timer has just been created.", function() {
			t = new RandomTimer(4, 9);
			expect(t.hasStopped()).to.be.false;
		})

		it("Should have stopped when the timer reaches 0.", function() {
			t = new RandomTimer(1, 1);
			t.count(t);
			expect(t.getTime()).to.equal(0);
			expect(t.hasStopped()).to.be.true;
		})
	})

})