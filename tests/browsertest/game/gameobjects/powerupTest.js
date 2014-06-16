describe("Powerup", function(){

	describe("#Constructor", function(){

		var p = new Powerup(10, 0);

		it("Should set the radius of the Powerup to be 10 and the type to be 0", function() {
			expect(p.getRadius()).to.equal(10);
			expect(p.getType()).to.equal(0);
		})
	})
	
	describe("#Equals", function(){
		var p = new Powerup(10, 3);
		var p2 = new Powerup(10, 3);
		
		it("Should return true when matched with the same object", function(){
			expect(p.equals(p)).to.equals(true);
		})
		
		it("Should return false when matched with another object", function(){
			expect(p.equals(p2)).to.equals(false);
		})
	})
	
	describe("#Execute/Stop", function(){
		var p = new Powerup(5, 1);
		var stubPlayer = sinon.stub();
		var mockedActivate = sinon.stub(p, 'power');
		
		it("Should activate the powerup on the given player and stop it", function(){
			p.execute(stubPlayer);
			expect(mockedActivate).to.have.been.called;
			p.stop();
			expect(p.power).to.equals(null);
		})		
	})
	
	describe("#CreateTimer", function(){
		var p = new Powerup(10, 1);

		it("Check if the timer is created.", function(){
			expect(p.getTimer()).to.be.not.null;
		})
	})
	
	describe("#getTimer", function(){

		it("Should create a PowerUpTimer with smallShield time", function() {
			p = new Powerup(10, 0);
			expect(p.getTimer().time).to.equals(Settings.smallShield.time);
		})
		
		it("Should create a PowerUpTimer with bigShield time", function() {
			p = new Powerup(10, 1);
			expect(p.getTimer().time).to.equals(Settings.bigShield.time);
		})

		it("Should create a PowerUpTimer with smallPole time", function() {
			p = new Powerup(10, 2);
			expect(p.getTimer().time).to.equals(Settings.smallPole.time);
		})

		it("Should create a PowerUpTimer with bigPole time", function() {
			p = new Powerup(10, 3);
			expect(p.getTimer().time).to.equals(Settings.bigPole.time);
		})

		it("Should create a PowerUpTimer with revertShield time", function() {
			p = new Powerup(10, 4);
			expect(p.getTimer().time).to.equals(Settings.revertShield.time);
		})		
	})
	
	describe("#CreatePower", function(){
		it("Should create the actual power -- TBD");
	})

	describe("#setRadius/getRadius", function(){
		var p = new Powerup(10, 2);
		
		it("Should return the default radius", function(){
			expect(p.getRadius()).to.equal(10);
		})

		it("Should set and get the correct radius", function(){
			p.setRadius(25);
			expect(p.getRadius()).to.equals(25);
		})
	})

	
	describe("#setColor/getColor", function(){
		var p = new Powerup(10, 3);

		it("For type 3, the standard color should be aqua", function(){
			expect(p.getColor()).to.equal("aqua");
		})

		it("Should change the default aqua color to blue", function(){
			p.setColor("blue");
			expect(p.getColor()).to.equal("blue");
		})
	})
	
	describe("#setPosition/getPosition", function(){
		var p = new Powerup(10, 4);

		it("Should change the position of the powerup", function(){
			expect(p.getPosition().x).to.equal(0);
			expect(p.getPosition().y).to.equal(0);
			p.setPosition(100, 30);
			expect(p.getPosition().x).to.equal(100);
			expect(p.getPosition().y).to.equal(30);
		})
	})
	
	describe("#setType/getType", function(){
		
		var p = new Powerup(10, 2);

		it("Should change the powerup-type from 2 to 0", function() {
			expect(p.getType()).to.equal(2);
			p.setType(1);
			expect(p.getType()).to.equal(1);
		})
	})
	
	describe("#getID", function(){
		
		var p = new Powerup(10, 2);
		var p2 = new Powerup(10, 0);

		it("Should get the correct ID", function(){
			expect(p.getID()).to.be.a("number");
			expect(p.getID()).to.not.equal(p2.getID());
		})
	})
})