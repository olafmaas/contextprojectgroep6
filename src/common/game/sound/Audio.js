if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var Howl = require('../../../lib/howler.min.js');
}

var Audio = Base.extend({

	audioFile: 0,
	vol: 2.5,

	constructor: function(_url){
		audioFile = new Howl({
			urls: [_url],
			vol: 2.5,
		})
	},

	play: function(){
		audioFile.play();
	}
});

