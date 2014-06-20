describe("ShieldBody", function(){
	
	describe("#equals", function(){
		
		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});
			shield = new Shield(pole);
			sb = new ShieldBody(shield);
			
			pole2 = sinon.stub();
			pole2.getPosition = sinon.stub();
			pole2.getPosition.returns({x: 0, y: 0});
			shield2 = new Shield(pole2);
			sb2 = new ShieldBody(shield2);
		})
		
		it("Should compare two different objects", function(){
			expect(sb.equals(sb2)).to.equal(false);
		})
		it("Should compare the same objects", function(){
			expect(sb.equals(sb)).to.equal(true);
		})
	})
	
	describe("#update", function(){

		it("Should set Angle and Radius -- TBD ")
	})
	
	describe("#setAngle", function(){
	
		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			sb = new ShieldBody(shield)
		})
			
		it("Should set the angle of the ShieldBody", function(){
			sb.setAngle(1.5);
			expect(sb.getAngle()).to.equal(1.5);
		})
	})
	
	describe("#getAngle", function(){
	
		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			sb = new ShieldBody(shield)
		})
		
		it("Should get the angle of the ShieldBody", function(){
			expect(sb.getAngle()).to.equal(0);
		})
	})
	
	describe("#setRadius", function(){

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			sb = new ShieldBody(shield)
		})
		
		it("Should set the radius of the ShieldBody", function(){
			sb.setRadius(15);
			expect(sb.getRadius()).to.equal(15);
		})
	})
	
	describe("#getRadius", function(){

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			sb = new ShieldBody(shield)
		})
		
		it("Should get the radius of the ShieldBody", function(){
			expect(sb.getRadius()).to.equal(70);
		})
	})
	
	describe("#setParentShield", function(){

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			sb = new ShieldBody(shield)
			
			parentShield = new Shield(pole);
		})
		
		it("Should set the shield to which the body belongs", function(){
			sb.setParentShield(parentShield);
			expect(sb.getParentShield()).to.equal(parentShield);
		})
	})
	
	describe("#getParentShield", function(){

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			sb = new ShieldBody(shield)
		})
		
		it("Should get the shield to which the body belongs", function(){
			expect(sb.getParentShield()).to.equal(shield);
		})
	})
	
	describe("#getID", function(){

		beforeEach(function(){
			pole = sinon.stub();
			pole.getPosition = sinon.stub();
			pole.getPosition.returns({x: 0, y: 0});			
			shield = new Shield(pole);
			
			sb = new ShieldBody(shield)
			sb2 = new ShieldBody(shield);
		})
		
		it("Should get the ID of the hieldBody", function(){
			expect(sb.getID()).to.be.a("number");
			expect(sb.getID()).to.not.equal(sb2.getID());
		})
	})
})