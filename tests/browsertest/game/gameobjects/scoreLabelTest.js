describe("ScoreLabel", function(){

	describe("#constructor", function(){
		it("Should initialize the objects values", function(){
			var stubPlayer = sinon.stub();
			var lbl = new ScoreLabel(stubPlayer, "test");

			expect(lbl.player).to.equal(stubPlayer);
			expect(lbl.text).to.equal("test");
		})
	})

	describe("#update", function(){
		var sl;

		beforeEach(function(){
			var player = sinon.stub();
			player.getScore = sinon.stub();
			player.getScore.returns(42);
			sl = new ScoreLabel(player, "");
		})

		it("Should print the score on the label", function(){
			sl.update();
			expect(sl.getText()).to.equal("Score: " + 42);
		})

	})

})