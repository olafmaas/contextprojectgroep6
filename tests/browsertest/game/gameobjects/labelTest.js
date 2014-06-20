describe("Label", function(){

	describe("#Constructor", function(){
		var l = new Label("Test");
		var l2 = new Label("A very long string to check to what extend the label will work if we put something in that's slighlty longer than the normal usage of the label");
		
		it("It should have constructed a new label with the string 'Test'", function(){
			expect(l.getText()).to.equal("Test");
		})

		it("The label should also be able to coop with longer strings", function(){
			expect(l2.getText()).to.equal("A very long string to check to what extend the label will work if we put something in that's slighlty longer than the normal usage of the label");
		})
	})

	describe("#set/getText", function(){
		var l = new Label("asdf");

		it("It should be possible to change the text after the label is created", function(){
			expect(l.getText()).to.equal("asdf");
			l.setText("ASDFASDFASDF");
			expect(l.getText()).to.equal("ASDFASDFASDF");
		})

		it("It should be possible to set the label to an empty string", function(){
			l.setText("");
			expect(l.getText()).to.equal("");
		})
	})

	describe("#set/getPosition", function(){
		var l = new Label("bla");

		it("The initial position for the label should be at (0,0)", function(){
			expect(l.getPosition()).to.deep.equal({x: 0, y: 0});
		})

		it("It should be possible to alter the position of the label after it has been placed", function(){
			l.setPosition({x: 100, y: 50});
			expect(l.getPosition()).to.deep.equal({x: 100, y: 50});
		})
	})

	describe("#set/getFont", function(){
		var l = new Label("font");

		it("The inital font of the label should be " + Settings.label.font, function(){
			expect(l.getFont()).to.equal(Settings.label.font);
		})

		it("It should be possible to alter the font of the label after it has been initialized", function(){
			l.setFont("Arial");
			expect(l.getFont()).to.equal("Arial");
		})

	})

	describe("#set/getFontSize", function(){
		var l = new Label("fontsize");

		it("The initial fontsize of the label should be " + Settings.label.size, function(){
			expect(l.getFontSize()).to.equal(Settings.label.size);
		})

		it("It should be possible to alter the fontsize of the label after it has been initialized", function(){
			l.setFontSize(Settings.label.size*2);
			expect(l.getFontSize()).to.equal(Settings.label.size*2);
		})
	})

	describe("#set/getColor", function(){
		var l = new Label("color");

		it("The initial color of the label should be white", function(){
			expect(l.getColor()).to.equal("#ffffff");
		})

		it("It should be possible to alter the color of the label after it has been initialized", function(){
			l.setColor("green");
			expect(l.getColor()).to.equal("green");
		})

	})
})