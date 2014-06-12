describe("Shield", function(){
	describe("#constructor", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("should set the good pole", function(){
			expect(shield.getPole()).to.equals(pole);
		})

		it("should set the good position", function(){
			expect(shield.getPosition()).to.deep.equals({x: 0, y: 0});
		})

		it("should have a body", function(){
			expect(shield.getBody()).to.not.be.null;
		})
	})

	describe("#update", function(){

	})

	describe("#equals", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("should return true when matched with itself", function(){
			expect(shield.equals(shield)).to.equals(true);
		})

		it("should return false when matched with something else", function(){
			var other = sinon.stub();
			other.getID = sinon.stub();
			other.getID.returns(shield.getID() + 1);

			expect(shield.equals(other)).to.equals(false);
		})
	})

	describe("#revertShield", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("should set the correct value", function(){
			shield.revertShield(true);
			expect(shield.isRevert()).to.equals(true);
			shield.revertShield(false);
			expect(shield.isRevert()).to.equals(false);
		})
	})
})