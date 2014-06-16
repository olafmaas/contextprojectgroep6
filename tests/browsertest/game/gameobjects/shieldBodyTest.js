describe("ShieldBody", function(){

	/*describe("#Update", function(){
		
		//Both mockedShields don't work.
		var pole = new Pole(10);
		var shield = new Shield(pole);
		var mockedShield = sinon.stub('setAngle');
		var mockedShield2 = sinon.stub('setRadius');

		it("Should update the angle and radius", function() {
			sb = new ShieldBody(shield);
			sb.update();
			expect(mockedShield).to.have.been.called;
			expect(mockedShield2).to.have.been.called;
		})
	})*/
	
	describe("#Equals", function(){
		
		it("Should compare two objects", function(){
		pole = new Pole(10);
		shield = new Shield(pole);
		sb = new ShieldBody(shield);
		
		pole2 = new Pole(10);
		shield2 = new Shield(pole2);
		sb2 = new ShieldBody(shield2);
		
		expect(sb.equals(sb2)).to.equal(false);
		expect(sb.equals(sb)).to.equal(true);
		})
	})
})