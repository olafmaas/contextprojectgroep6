if(typeof module != 'undefined'){
	var Base = require('./Base.js');
	var Howl = require('./lib/howler.min.js');
}

var Audio = Base.extend({

	audioFile: 0,

	constructor: function(_url){
		audioFile = new Howl({
			urls: [_url]
		})
	},

	play: function(){
		audioFile.play();
	}
});

