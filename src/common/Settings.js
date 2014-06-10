var Settings = {
	
	bootTime: 10,
	
	canvasWidth: 450,
	canvasHeight: 350,
	
	minTime: 10,
	maxTime: 30,

	poleSize: 10,

	//Powerup attributes
	//TODO: powerup voor dubbele score?
	//NOTE: time mag niet groter zijn dan de minimale spawntijd voor een nieuwe powerup.
	//want anders wordt de oude powerup overschreden met de nieuwe timer :D hier nog een fix voor zoeken.
	smallShield: {
		time: 10,
		color: "greenyellow",
		length: 3.5,
		path: ""
	},

	bigShield: {
		time: 15,
		color: "violet",
		length: 1,
		path: ""
	},

	smallPole: {
		time: 15,
		color: "yellow",
		radius: 5,
		path: ""
	},

	bigPole: {
		time: 10,
		color: "aqua",
		radius: 20,
		path: ""
	},

	revertShield: {
		time: 10,
		color: "red",
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
	
	//Shield radius 
	shieldRadius: 70

}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
