describe("Sprite", function(){

	describe("#Constructor", function(){
		var s = new Sprite("");

		it("Should have created a new Sprite ", function(){
			expect(s).to.be.an.instanceof(Sprite);
		})

		it("Should have created a sprite at (0,0)", function(){
			expect(s.getPosition()).to.deep.equal({x: 0, y: 0});
		})
	})

	describe("#Equals", function(){
		var s = new Sprite("");

		it("Should be equals to itself", function(){
			expect(s.equals(s)).to.be.true;
		})

		it("Should not be equal to another sprite", function(){
			var s2 = new Sprite("");
			expect(s.equals(s2)).to.be.false;
		})
	})

	describe("Set/getPosition", function(){
		var s = new Sprite("");

		it("Should retrieve the initial position of the sprite (0,0)", function(){
			expect(s.getPosition()).to.deep.equal({x: 0, y: 0});
		})

		it("Should be possible to set the position of the sprite after it has been created", function(){
			var pos = {x: 300, y: 800};
			s.setPosition(pos);
			expect(s.getPosition()).to.deep.equal(pos);
		})
	})

	describe("Set/getScale", function(){
		var s = new Sprite("");

		it("Should retrieve the initial scale of the sprite (1,1)", function(){
			expect(s.getScale()).to.deep.equal({x: 1, y: 1});
		})

		it("Should be possible to set the scale of the sprite", function(){
			var scale = {x: 5, y: 3}
			s.setScale(scale);
			expect(s.getScale()).to.deep.equal(scale);
		})
	})

	describe("Set/getSize", function(){
		var s = new Sprite("");

		it("Should retrieve the initial size of the sprite (0,0)", function(){
			expect(s.getSize()).to.deep.equal({x: 0, y: 0});
		})

		it("Should be possible to set the size of the sprite", function(){
			var size = {x: 100, y: 88}
			s.setSize(size);
			expect(s.getSize()).to.deep.equal(size);
		})
	})

	describe("Set/getAnchor", function(){
		var s = new Sprite("");

		it("Should retrieve the initial anchor of the sprite (0,0)", function(){
			expect(s.getAnchor()).to.deep.equal({x: 0, y: 0});
		})

		it("Should be possible to set the size of the sprite", function(){
			var anchor = {x: 100, y: 88}
			s.setAnchor(anchor);
			expect(s.getAnchor()).to.deep.equal(anchor);
		})
	})

	describe("getID", function(){
		var s = new Sprite("");
		var s2 = new Sprite("");

		it("The sprite should have a unique ID", function(){
			expect(s.getID()).to.be.a("number");
			expect(s.getID()).to.not.equal(s2.getID());
		})
	})
	
	describe("getTexture", function(){
		var s = new Sprite("");

		it("Should return the texturepath of the sprite - TBD");
	})
})