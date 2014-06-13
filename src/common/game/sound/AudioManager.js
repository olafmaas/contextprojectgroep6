if(typeof module != 'undefined'){
	var Base = require('../../../lib/Base.js');
	var Howl = require('../../../lib/howler.min.js');
}

var AudioManager = Base.extend({

	tracks: 0,


	constructor: function(){
		tracks = {};
	},

	addTrack: function(name, _url){
		tracks[name] = new Audio(_url);
	},

	play: function(name){
		tracks[name].play();
	}
});

