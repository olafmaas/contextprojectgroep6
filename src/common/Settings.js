/*
* A settings file from which the game retrieves information.
*/
var Settings = {

	/**** GAME ****/
	bootTime: 10, 
	updateInterval: 17,

	/**** SERVER CONNECTION ****/
	server: 'http://localhost',
	//server: 'http://vps-76938-1774.hosted.at.hostnet.nl',	//Server Olaf
	port: 5050,

	/**** POWERUP TYPES ****/
	//NOTE: time mag niet groter zijn dan de minimale spawntijd voor een nieuwe powerup.
	//want anders wordt de oude powerup overschreden met de nieuwe timer :D hier nog een fix voor zoeken.
	smallShield: {
		time: 10,
		color: "greenyellow",
		length: 3.5,
		path: "../client/img/powerup.png",
		chance: 0.15
	},

	bigShield: {
		time: 15,
		color: "violet",
		length: 1,
		path: "../client/img/powerup.png",
		chance: 0.4
	},

	smallPole: {
		time: 15,
		color: "yellow",
		radius: 2, //by which factor the pole will be divided
		path: "../client/img/powerup.png",
		chance: 0.4
	},

	bigPole: {
		time: 10,
		color: "aqua",
		radius: 1.5, //by which factor the pole will be multiplied
		path: "../client/img/powerup.png",
		chance: 0.15
	},

	revertShield: {
		time: 10,
		color: "red",
		path: "../client/img/powerup.png",
		chance: 0.10
	},

	/**** POWERUP PROPERTIES ****/
	nrOfPowerups: 5,
	powerupSize: 25,
	removalTime: 4000, //in ms, how long a powerup is present on screen.
	minTime: 10, //in ms, minimum time between powerup spawns.
	maxTime: 30, //in ms, maximum time between powerup spawns.

	/**** LABEL POSITIONS ****/
	label: {
		font: 'Indie Flower',
		size: 20,
		name: {x: 10, y: 25},
		score: {x: 630, y: 415},
		highscore: {x: 630, y: 440}
	}, 

	/**** CANVAS PROPERTIES ****/
	canvasWidth: 800,
	canvasHeight: 450,
	
	/**** POLE ****/
	pole: {
		size: 10,
		color: "blue"
	},

	/**** SHIELD ****/
	shield: {
		radius: 70,
		shieldWidth: 2,
		color: "yellow"
	},

	/**** BALL ****/
	ball: {
		size: 10,
		velocityRange: {from: 4, to: 8}, //range of velocities to generate random velocity balls.
		//Positions of initial ball
		x: 100,
		y: 100,
		nrOfNewBalls: 3 //Number of new balls created per player. 
	},

	player: {
		maxNameLength: 20, //maximum number of characters that can be used for a username
		//Points for hitting player is now removed
		points: 0,
		step: 0 //step by which the score is incremented 
	},

	/**** HIGHSCORE PROPERTIES ****/	
	highScore: {
		updateInterval: 5000,
		top: 3,
		colors: ["#B8E6E6", "#66CCFF", "#3399FF", "#0066FF", "#0000FF"] //from blue to light-blue
	},

	joinIndicator: {
		times: 10,
		interval: 200,
		color: 'red'
	}
	
}

if(typeof module != 'undefined'){
    module.exports = Settings;
}
