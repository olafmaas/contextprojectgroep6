describe("Player", function(){
	
	describe("#constructor", function(){
		
		it("Should assign a name and a unique ID", function(){
			p = new Player("Miep");
			expect(p.getName()).to.equal("Miep");
			expect(p.getID()).to.be.a("number");
		})
	})
	
	describe("#update", function(){
	
		it("Should update the player i.e call deletePowerup - TBD");
	})

	describe("#incrementPoints", function(){

		it("Should increment the number of points by the given amount", function(){
			p = new Player("Jan");
			p.incrementPoints(10);
			expect(p.getPoints()).to.equal(Settings.player.points + 10);
		})
	})

	describe("#incrementScore", function(){

		it("Should increment the score by the given amount", function(){
			p = new Player("Klaas");
			p.incrementScore(2);
			expect(p.getScore()).to.equal(2);
		})
	})
	
	describe("#revert/saveState", function(){
	
			var player = new Player("Truus");
		    pole = new Pole(10);
			shield = new Shield(pole);
			player.setShield(shield);
			player.setPole(pole);

		it("Should revert the player to its original state", function(){

			player.getShield().revertShield(false);
			player.getShield().setShieldLength(1);
			player.getPole().setRadius(15);
			player.saveState();
			
			expect(player.getShield().isRevert()).to.equal(false);
			expect(player.getShield().getShieldLength()).to.equal(1);
			expect(player.getPole().getRadius()).to.equal(15);
			
			player.getShield().revertShield(true);
			player.getShield().setShieldLength(5);
			player.getPole().setRadius(20);
			player.revert();
			
			expect(player.getShield().isRevert()).to.equal(false);
			expect(player.getShield().getShieldLength()).to.equal(1);
			expect(player.getPole().getRadius()).to.equal(15);
		})
	})
	
	describe("#set/getGlobalID", function(){

		it("Should set and get the correct global ID", function(){
			p = new Player("Guus");
			p.setGlobalID(4);
			expect(p.getGlobalID()).to.equal(4);
		})
	})
	
	describe("#set/getTimer", function(){

		it("Should set and get the correct timer", function(){
			p = new Player("Guus");
			t = new PlayerTimer(p);
			p.setTimer(t);
			expect(p.getTimer()).to.equal(t);
		})
	})
	
	describe("#set/getName", function(){

		it("Should set and get the correct name", function(){
			p = new Player("Guus");
			p.setName("NewName");
			expect(p.getName()).to.equal("NewName");
		})
	})
	
	describe("#set/getPole", function(){

		it("Should set and get the correct pole", function(){
			player = new Player("Guus");
			pole = new Pole(10);
			
			player.setPole(pole);
			expect(player.getPole()).to.equal(pole);
		})
	})
	
	describe("#set/getShield", function(){

		it("Should set and get the correct shield", function(){
			player = new Player("Guus");
			pole = new Pole(10);
			shield = new Shield(pole);
			
			player.setShield(shield);
			expect(player.getShield()).to.equal(shield);
		})
	})
	
	describe("#set/getPoints", function(){

		it("Should set and get the correct amount of points the player is worth", function(){
			player = new Player("Guus");
			
			player.setPoints(25);
			expect(player.getPoints()).to.equal(25);
		})
	})
	
	describe("#set/getScore", function(){

		it("Should set and get the correct score", function(){
			player = new Player("Guus");
			
			player.setScore(80);
			expect(player.getScore()).to.equal(80);
		})
	})
	
	describe("#set/getPoints", function(){

		it("Should set and get the correct highscore", function(){
			player = new Player("Guus");
			
			player.setHighscore(150);
			expect(player.getHighscore()).to.equal(150);
		})
	})
	
	describe("#getPowerup", function(){

		it("Should get the active powerup (which is null by default)", function(){
			player = new Player("Guus");
			
			expect(player.getPowerup()).to.be.null;
		})
	})
	
	describe("#getID", function(){

		it("Should get the correct ID", function(){
			p1 = new Player("Piet");
			p2 = new Player("Jochum");
			
			expect(p1.getID()).to.be.a("number");
			expect(p1.getID()).to.not.equal(p2.getID());
		})
	})
	
	
	describe("#getType", function(){
		p1 = new Player("NewPlayer");
		
		it("Should return the player type", function(){
			expect(p1.getType()).to.equal("Player");
		})
	})
})