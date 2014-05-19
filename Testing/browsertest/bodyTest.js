describe("Body" function(){
	describe("Update" function{
		it("Should ignore the velocity if an object is Immutable" function(){
			b = new Body({x: 0, y: 0}, true, false, 1, Math.pi(), {1, 1})
			b.update().position.should.equal({0,0}})
		})
	})
})