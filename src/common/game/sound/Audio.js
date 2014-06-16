if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var Howl = require('../../../lib/howler.min.js');
}

var AudioTrack = Base.extend({

	audioFile: 0,
	vol: 2.5,

	constructor: function(_url){
		var arr = [];
		arr.push(_url);

		this.audioFile = new Howl({
			urls: arr,
			vol: this.vol,
		})
	},

	play: function(){
		this.audioFile.play();
	}
});

