
var UserSettings = ({

	smallShieldTime: 7,
	bigShieldTime: 15,
	smallPoleTime: 15,
	bigPoleTime: 7,
	bigBallTime: 15,

	scorePosition: {x: 355, y: 340},
	namePosition: {x: 10, y: 15}

});

if(typeof module != 'undefined'){
    module.exports = UserSettings;
}
