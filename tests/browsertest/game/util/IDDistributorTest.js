
describe("IDDistributor", function(){

	describe("#getNewID", function(){

		it("Should return a number", function(){
			expect(IDDistributor.getNewId()).to.be.a("number");
		})

		it("Should add 1 to the previous returned ID", function() {
			var id = IDDistributor.getNewId();
			expect(IDDistributor.getNewId()).to.equal(id + 1);
		})

		it("Should keep unique ID's, even though it has been called 100 times", function(){
			var id = IDDistributor.getNewId();
			for(var i = 0; i < 99; i++){
				IDDistributor.getNewId();
			}
			expect(IDDistributor.getNewId()).to.equal(id + 100);
		})

	})

})