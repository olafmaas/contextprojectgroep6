if(typeof module != 'undefined'){
	var Base = require('./Base.js');
	var IDDistributor = require('./IDDistributor.js');
}

var Powerup = Base.extend({

	body: false,
	type: null,
	radius: 1,
	ID: -1,

	constructor: function(_radius, _type){
		this.radius = _radius;
		this.type = _type;
		this.ID = IDDistributor.getNewId();
	}


});

if(typeof module != 'undefined'){
    module.exports = Powerup;
}