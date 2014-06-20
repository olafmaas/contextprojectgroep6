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

		it("Should update body and set angle -- TBD ")
	})
	
	describe("#enableBody/getBody", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("The body that is instantiated should be of the type 'ShieldBody'", function(){
			expect(shield.getBody()).to.be.not.null;
			expect(shield.getBody() instanceof ShieldBody).to.be.true;
		})
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
	
	describe("#calculateAngle", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})
		
		it("Should calculate the angle of the shield", function(){
			shield.calculateAngle();
			expect(shield.getAngle()).to.be.a("number");
		})
	})

	describe("#revertShield/isRevert", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct boolean value", function(){
			shield.revertShield(true);
			expect(shield.isRevert()).to.equals(true);
			
			shield.revertShield(false);
			expect(shield.isRevert()).to.equals(false);
		})
	})
	
	describe("#setAngle/getAngle", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct angle", function(){
			shield.setAngle(1.5);
			expect(shield.getAngle()).to.equals(1.5);
		})
	})
	
	describe("#setShieldLength/getShieldLength", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct length", function(){
			shield.setShieldLength(20);
			expect(shield.getShieldLength()).to.equals(20);
		})
	})
	
	describe("#setRadius/getRadius", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct radius", function(){
			shield.setRadius(10);
			expect(shield.getRadius()).to.equals(10);
		})
	})
	
	describe("#setColor/getColor", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct color", function(){
			shield.setColor("Green");
			expect(shield.getColor()).to.equals("Green");
		})
	})
	
	describe("#setSize/getSize", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct size", function(){
			shield.setSize(3);
			expect(shield.getSize()).to.equals(3);
		})
	})
	
	describe("#setPosition/getPosition", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should set and get the correct position", function(){
			newPole = new Pole(10);
			newPole.setPosition(35, 45);
			
			shield.setPosition(newPole);
			expect(shield.getPosition().x).to.equals(35);
			expect(shield.getPosition().y).to.equals(45);
		})
	})
	
	describe("#getPole", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should get the correct pole", function(){
			expect(shield.getPole()).to.equals(pole);
		})
	})
	
	describe("#getID", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
			shield2 = new Shield(pole);
		})

		it("Should get the correct ID", function(){
			expect(shield.getID()).to.be.a("number");
			expect(shield.getID()).to.not.equal(shield2.getID());
		})
	})
	
	describe("#getType", function(){
		var pole;
		var shield;

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});

			shield = new Shield(pole);
		})

		it("Should get the correct object type", function(){
			expect(shield.getType()).to.equals('Shield');
		})
	})
})