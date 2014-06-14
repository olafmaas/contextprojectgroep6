if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var Howl = require('../../../lib/howler.min.js');
}

var AudioManager = Base.extend({

	tracks: 0,


	constructor: function(){
		this.tracks = {};
	},

	addTrack: function(name, _url){
		this.tracks[name] = new AudioTrack(_url);
	},

	play: function(name){
		this.tracks[name].play();
	}
});

