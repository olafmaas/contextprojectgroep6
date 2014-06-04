if(typeof module != 'undefined'){
	var Base = require('../../game/util/Base.js');
	var Ball = require('../../game/Ball.js');
	var IDDistributor = require('../../game/util/IDDistributor.js');
	var ColorGenerator = require('../../game/util/ColorGenerator');
}


var Block= Base.extend({

	balls: [],
	socket: undefined,
	neighbours: {top: undefined, bottom: undefined, left: undefined, right: undefined},

	constructor: function(_balls, _socket){
		balls = _balls;
		socket = _socket;
	},

	setNeighbour: function(_postion, _object){
		neighbours[_postion] = _object;
	},

	addBall: function(ball){
		balls.push(ball);
	},

	ballIncoming: function(ball){
		balls.push(ball);
	}

})