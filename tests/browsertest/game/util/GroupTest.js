describe("Group", function(){
	
	describe("addMember", function(){
	
		it("Should add a member", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			
			var length = group.getMemberLength();
			group.addMember(ball);
			
			expect(group.getMemberLength()).to.equal(length+1);
			expect(group.getMember(0)).to.equal(ball);
		})
	})
		
	describe("removeMember", function(){
	
		it("Should remove a specific member", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			group.addMember(ball);
			
			var length = group.getMemberLength();
			group.removeMember(ball);
			
			expect(group.getMemberLength()).to.equal(length-1);
			expect(group.getMember(0)).to.equal(undefined);
		})
	})
	
	describe("getMembers", function(){
	
		it("Should return list of members", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			group.addMember(ball);
			
			expect(group.getMembers()).to.be.a("Array");
			
		})
	})
	
	describe("getMember", function(){
	
		it("Should return member on given index", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			group.addMember(ball);
			
			expect(group.getMember(0)).to.equal(ball);
			
		})
	})
	
	describe("getMemberByID", function(){
	
		it("Should return member on given ID", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			group.addMember(ball);
			
			var id = ball.getID();
			expect(group.getMemberByID(id)).to.equal(ball);
			
		})
	})
	
	describe("getMemberByGlobalID", function(){
	
		it("Should return member on given Global ID", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			group.addMember(ball);
			
			var gid = ball.getGlobalID();
			expect(group.getMemberByGlobalID(gid)).to.equal(ball);
			
		})
	})
	
	describe("getMemberLength", function(){
	
		it("Should return amount of members in the group", function(){
			var group = new Group(Ball);
			var ball = new Ball(10);
			
			expect(group.getMemberLength()).to.equal(0);
			group.addMember(ball);
			expect(group.getMemberLength()).to.equal(1);
		})
	})
})