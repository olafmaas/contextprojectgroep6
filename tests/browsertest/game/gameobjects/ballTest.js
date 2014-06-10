describe("Ball", function(){

	//constructor
	//update -> body
	//equals
	//enablebody
	//set/getposition
	//set/getradius
	//set/getglobalID
	//set/getcolor
	//getbody
	//getID

	describe("#Constructor()", function(){
		var b = new Ball(10);

		it("It should have created a new ball with radius 10, an ID and a circularBody.", function(){
			expect(b.getRadius()).to.equal(10);
			expect(b.getID()).to.be.not.null;
			expect(b.getBody()).to.be.not.null;
		})		
	})

	describe("#Equals()", function() {
		var b = new Ball(10);

		it("The ball should be equal with itself", function(){
			expect(b.equals(b)).to.be.true;
		})

		it("The ball should not be equal to another ball", function(){
			var b2 = new Ball(8);
			expect(b.equals(b2)).to.be.false;
		})
	})

	describe("#EnableBody()", function(){
		var b = new Ball(10);

		it("The body that is instantiated should be of the type 'CircularBody' ", function(){
			expect(b.getBody()).to.be.not.null;
			expect(b.getBody() instanceof CircularBody).to.be.true;
		})
	})

	describe("#set/getPosition", function(){
		var b = new Ball(5);

		it("The ball should be instantiated on (0,0)", function(){
			expect(b.getPosition()).to.deep.equal({x: 0, y: 0});
		})

		it("The ball should be able to be set to position (100, 300)", function(){
			expect(b.getPosition()).to.deep.equal({x: 0, y: 0});
			b.setPosition(100, 300);
			expect(b.getPosition()).to.deep.equal({x: 100, y: 300});
		})

		it("The ball should be able to be set to a negative position (-10, -400)", function(){
			expect(b.getPosition()).to.deep.equal({x: 100, y: 300}); //previous test has set the position to (100,300)
			b.setPosition(-10, 400);
			expect(b.getPosition()).to.deep.equal({x: -10, y: 400});
		})
	})

	describe("#set/getRadius", function(){
		var b = new Ball(3);

		it("The ball should have a radius of 3 after it's instantiated", function(){
			expect(b.getRadius()).to.equal(3)
		})
	})

	describe("#set/getGlobalID", function(){
		var b = new Ball(4);

		it("The ball should initially have no globalID (-1)", function(){
			expect(b.getGlobalID()).to.equal(-1);
		})

		it("It should be able to set and retrieve a global ID", function(){
			b.setGlobalID(4);
			expect(b.getGlobalID()).to.equal(4);
		})
	})

	describe("#set/getColor", function(){
		var b = new Ball(2)
		
		it("The ball should be black as an initial color", function(){
			expect(b.getColor()).to.equal("#000000");
		})

		it("It should be possible to set a new color for the ball", function(){
			b.setColor("red");
			expect(b.getColor()).to.equal("red");
		})
	})

})
