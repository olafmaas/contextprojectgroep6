describe("Pole", function(){

	describe("#isHit", function(){
		var p = new Pole(10)
		var player = new Player("Jan")
		p.setPlayer(player);
		player.setScore(10);

		it("Should change the color, save the highscore and change the color on a hit", function(){
			p.isHit();

			expect(p.getColor()).to.equal('darkOrange');
			expect(p.player.getHighscore()).to.equal(10);
			expect(p.player.getScore()).to.equal(0);
		})
	})

	describe("#setPlayer", function(){
		var p = new Pole(10)
		var player = new Player("Jan")

		it("Should start the timer if a new player is set.", function(){
			p.setPlayer(player);
			expect(p.getTimer().isPaused()).to.be.false;
		})
	})


	describe("#saveHighscore", function(){
		var p = new Pole(10)
		var player = new Player("Jan")
		p.setPlayer(player);
		player.setScore(10);


		it("Should, given the current score is a highscore, save the higscore and set the score to zero", function(){
			player.setScore(10);
			p.saveHighscore();
			expect(p.player.getHighscore()).to.equal(10);
			expect(p.player.getScore()).to.equal(0);
		})

		it("Should, given the score is not a highscore, set the score to zero", function(){
			player.setScore(5);
			p.saveHighscore();
			expect(p.player.getHighscore()).to.equal(10);
			expect(p.player.getScore()).to.equal(0);
		})
	})
})