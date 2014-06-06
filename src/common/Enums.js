
/**
* Enum class
*
* @class Enum
* @classdesc An enum class in which we can put our used enums. 
* Note: Enums can be called as follow: e.updateBall, which will return 0. 
* Note: Object.freeze is used to prevent accidental overwrites which would render the enums useless.
*/
var e = Object.freeze({
	
	//Powerups
	"smallShield": 0,
	"bigShield": 1,
	"smallPole": 2,
	"bigPole": 3,
	"revertShield": 4,

	//Server
	"updateBall": 5, //in use
	"updateBalls": 6, //in use
	"updateBallAngle": 11, 
	"drawBall": 12,
	"drawShield": 13,
	"newCanvasSize": 14

});

if(typeof module != 'undefined'){
    module.exports = e;
}
