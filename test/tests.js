var buster = require('buster');

buster.testCase('Blaat',{
	'testeinz': function () {
		buster.assert.equals(8,8, "Het faalt");
	}
})