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
	
	describe("#equals", function(){
		var pole = new Pole(10);
		var pole2 = new Pole(15);
		
		it("Should return true when matched with the same object", function(){
			expect(pole.equals(pole)).to.equals(true);
		})
		
		it("Should return false when matched with another object", function(){
			expect(pole.equals(pole2)).to.equals(false);
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
	
	describe("#setHitBy/getHitBy", function(){
		var pole = new Pole(10);
		
		it("Should set and get the correct hitBy ID", function(){
			expect(pole.getHitBy()).to.equal(-1);
			pole.setHitBy(5);
			expect(pole.getHitBy()).to.equal(5);
		})
	})
	
	describe("#getTimer", function(){
		var pole = new Pole(10);
		
		it("Should return the alive timer of the pole", function(){
			expect(pole.getTimer()).to.equal(0);
		})
	})
	
	describe("#getType", function(){
		var pole = new Pole(10);
		
		it("Should return the correct type", function(){
			expect(pole.getType()).to.equal("Pole");
		})
	})
})