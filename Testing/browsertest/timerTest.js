describe("Timer", function(){

	describe("#startTimer", function(){

		it("Should start the timer and set the interval", function() {
			t = new Timer();
			expect(t.isPaused()).to.be.false;
		})

	})

	describe("#count", function(){

		it("Should increase the time by one", function() {
			t = new Timer();
			t.count();
			expect(t.getTime()).to.equal(1);
		})
	})


	describe("#pause", function(){

		it("Should pause the time if it is not already paused", function() {
			t = new Timer();
			t.pause();
			expect(t.isPaused()).to.be.true;
		})

		it("Should keep the state of the timer if it is already paused", function() {
			t = new Timer();
			t.pause();
			t.pause();
			expect(t.isPaused()).to.be.true;
		})
	})

	describe("#resume", function(){

		it("Should keep the time on if it is not already paused", function() {
			t = new Timer();
			t.resume()
			expect(t.isPaused()).to.be.false;
		})

		it("Should resume the timer if it is already paused", function() {
			t = new Timer();
			t.pause();
			t.resume()
			expect(t.isPaused()).to.be.false;
		})
	})

	describe("#reset", function(){

		it("Should restart the timer", function() {
			t = new Timer();
			for (var i = 0; i < 10; i++) {
				t.count();
			};
			t.reset();
			t.pause();
			expect(t.getTime()).to.be.below(10);
		})
	})

	describe("#getMinutes", function(){

		it("Should give the numbe of minutes rounded down", function(){
			t = new Timer();
			for (var i = 0; i < 100; i++) {
				t.count();
			};
			expect(t.getMinutes()).to.equal(1);
		})


		it("Should give the numbe of minutes rounded down", function(){
			t = new Timer();
			for (var i = 0; i < 120; i++) {
				t.count();
			};
			expect(t.getMinutes()).to.equal(2);
		})

		it("Should give the numbe of minutes rounded down", function(){
			t = new Timer();
			for (var i = 0; i < 59; i++) {
				t.count();
			};
			expect(t.getMinutes()).to.equal(0);
		})
	})

	describe("#getMinutes", function(){

		it("Should give the number of seconds between 0 and 59", function(){
			t = new Timer();
			for (var i = 0; i < 60; i++) {
				t.count();
			};
			expect(t.getSeconds()).to.equal("00");
		})

		it("Should give the number of seconds between 0 and 59", function(){
			t = new Timer();
			for (var i = 0; i < 59; i++) {
				t.count();
			};
			expect(t.getSeconds()).to.equal(59);
		})


		it("Should give the number of seconds between 0 and 59", function(){
			t = new Timer();
			for (var i = 0; i < 110; i++) {
				t.count();
			};
			expect(t.getSeconds()).to.equal(50);
		})
	})
})