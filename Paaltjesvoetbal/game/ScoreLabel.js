if(typeof module != 'undefined'){
	var Label = require('./Label.js');
}

//TODO: documentation

var ScoreLabel = Label.extend({

	player: null,

	constructor: function(_player, _text){
		this.player = _player;
		this.text = _text;
	},

	//Score update function (will update user's score)
	//TODO: checken of 'this' goed is hier..
	update: function(){
		var score = this.player.getScore();

		this.setText("Score: " + score);
	}

});


if(typeof module != 'undefined'){
    module.exports = ScoreLabel;
}
