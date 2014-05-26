
/**
* Enum class
*
* @class Enum
* @classdesc An enum class in which we can put our used enums. 
* Note: Enums can be called as follow: emit.updateBall, which will return 0. 
* Note: Object.freeze is used to prevent accidental overwrites which would render the enums useless.
*/
var emit = Object.freeze({
		"updateBall": 0, 
		"updateBallAngle": 1, 
		"drawBall": 2,
		"drawShield": 3,
		"drawShield2": 4,
		"newCanvasSize": 5
	});