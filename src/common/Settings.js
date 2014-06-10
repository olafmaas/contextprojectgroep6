var Settings = {

	//Initial boot time
	bootTime: 10,
	updateInterval: 17,

	//Server connection properties
	server: 'http://localhost',
	//server: 'http://vps-76938-1774.hosted.at.hostnet.nl',	//Server Olaf
	port: 5050,

	//Powerups 
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
	minTime: 10, //in ms
	maxTime: 30, //in ms

	//Positions of labels
	label: {
		score: {x: 355, y: 340},
		name: {x: 10, y: 15}
	}, 

	//Canvas properties
	canvasWidth: 800,
	canvasHeight: 450,
	
	//Pole properties
	pole: {
		size: 10,
		color: "blue"
	},

	//Shield properties
	shield: {
		radius: 70,
		shieldWidth: 2,
		color: "yellow"
	},

	//Ball properties
	ball: {
		size: 10,
		velocity: 5,
		velocityDirection: 1.70 * Math.PI,
		//Positions of initial ball
		x: 100,
		y: 100
	},

	highScore3: {
		updateInterval: 5000,
		top: 3,
		colors: ["#66CCFF", "#3399FF", "#0066FF"] //not in use, from blue to light-blue
	},
	
	highScore5: {
		updateInterval: 5000,
		top: 5,
		colors: ["#66CCFF", "#3399FF", "#0066FF"] //not in use, from blue to light-blue
	}
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
