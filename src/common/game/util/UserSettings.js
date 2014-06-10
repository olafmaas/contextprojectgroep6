
var UserSettings = ({

	//Powerup attributes
	//TODO: powerup voor dubbele score
	//NOTE: time mag niet groter zijn dan de minimale spawntijd voor een nieuwe powerup.
	//want anders wordt de oude powerup overschreden met de nieuwe timer :D hier nog een fix voor zoeken.
	smallShield: {
		time: 10,
		length: 3.5,
		path: ""
	},

	bigShield: {
		time: 15,
		length: 1,
		path: ""
	},

	smallPole: {
		time: 15,
		radius: 5,
		path: ""
	},

	bigPole: {
		time: 10,
		radius: 20,
		path: ""
	},

	revertShield: {
		time: 10,
		path: ""
	},

	//Amount of powerups & global size & how long they are available on screen
	nrOfPowerups: 5,
	powerupSize: 10,
	removalTime: 2000, //in ms

	//Positions of labels
	scorePosition: {x: 355, y: 340},
	namePosition: {x: 10, y: 15},

	//Positions of initial ball
	ballX: 100,
	ballY: 100,

	//Canvas properties
	canvasWidth: 450,
	canvasHeight: 350,
	
	//Highscore length if there aren't many players
	hsLength3: 3,
	//Highscore length if there are a reasonable amount of players
	hsLength5: 5,
	
	//Radius of shield/pole 
	shieldRadius: 70,
	poleRadius: 10
});

if(typeof module != 'undefined'){
    module.exports = UserSettings;
}