var S = Settings;
var polePos = {left:100, top:100}

describe("PlayerFactory", function(){
	describe("#createPlayer", function(){
		it("Should return a new player", function(){
			var p = PlayerFactory.createPlayer(polePos , 1, null, null);
			expect(p.getType()).to.equal("Player");

		})
	})

	describe("#createPole", function(){
		it("returns a pole on position", function(){
			var pole = PlayerFactory.createPole(polePos);
			expect(pole.getPosition().x).to.equal(Math.round(polePos.left * S.canvasWidth + S.canvasWidth/2));
			expect(pole.getPosition().y).to.equal(Math.round(polePos.top * S.canvasHeight + S.canvasHeight/2));
		})
	})

	describe("#createShield", function(){
		it("Should return a shield", function(){
			var shield = PlayerFactory.createPole(PlayerFactory.createPole(polePos));
			expect(shield.getBody().immovable).to.be.true;
		})
	})
	
})
