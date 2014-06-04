
var UserSettings = ({

	//Powerup attributes
	//TODO: powerup voor dubbele score
	//NOTE: time mag niet groter zijn dan de minimale spawntijd voor een nieuwe powerup.
	//want anders wordt de oude powerup overschreden met de nieuwe timer :D hier nog een fix voor zoeken.
	smallShield: {
		time: 7,
		length: 3
	},

	bigShield: {
		time: 12,
		length: 1.5
	},

	smallPole: {
		time: 12,
		radius: 5
	},

	bigPole: {
		time: 7,
		radius: 20
	},

	revertShield: {
		time: 10,
	},

	//Amount of powerups
	nrOfPowerups: 5,

	//Positions of labels
	scorePosition: {x: 355, y: 340},
	namePosition: {x: 10, y: 15},

	//Canvas properties
	canvasWidth: 450,
	canvasHeight: 350

});

if(typeof module != 'undefined'){
    module.exports = UserSettings;
}
