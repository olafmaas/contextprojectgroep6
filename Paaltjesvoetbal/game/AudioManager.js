if(typeof module != 'undefined'){
	var Base = require('./util/Base.js');
	var Howl = require('./lib/howler.min.js');
}

var AudioManager = Base.extend({

	urls: 0,


	constructor: function(){
		urls = {};
	},

	addTrack: function(name, _url){
		urls[name] = new Audio(_url);
	},

	play: function(name){
		urls[name].play();
	}
});

