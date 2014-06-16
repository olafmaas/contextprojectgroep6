if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');
	
	var S = require('../../common/Settings.js');
}

/**
* GridCalc Class
* @class GridCalc
* @classdesc GridCalcis is an helper class.
* @constructor 
*/
var GridCalc= Base.extend({

	/**
	* Calculates in which blocks the ball could be.
	* @method GridCalc#inBlock
	* @param {ball} ball
	* @return {array} An array with objects which contains the x and y coordinates of the blocks. 
	*/
	inBlock: function(_ball){
		var arr = new Array();

		xList = this.inHorizontalBlock(_ball);
		yList = this.inVerticalBlock(_ball);

		for(var i = 0; i < xList.length; i++){
			for(var j = 0; j < yList.length; j++){
				arr.push({x: xList[i], y: yList[j]});
			}
		}

		return arr;
	},



	/**
	* Calculates in which rows the ball could be.
	* @method GridCalc#inHorizontalBlock
	* @param {ball} ball
	* @return {array} An array with objects which contains the x coordinates of the blocks. 
	*/
	inHorizontalBlock: function(_ball){
		var ret = new Array();

		var xPosInBlock = _ball.getPosition().x % S.canvasWidth;
		var x = (_ball.getPosition().x - xPosInBlock)/S.canvasWidth;
		ret.push(x);

		if((xPosInBlock < _ball.getRadius()) && (_ball.getBody().getVectorVelocity().x < 0)){
			ret.push(x-1);
		}

		if((xPosInBlock > (S.canvasWidth - _ball.getRadius())) && (_ball.getBody().getVectorVelocity().x > 0)){
			ret.push(x+1);
		}

		return ret;
	},


	/**
	* Calculates in which columns the ball could be.
	* @method GridCalc#inVerticalBlock
	* @param {ball} ball
	* @return {array} An array with objects which contains the y coordinates of the blocks. 
	*/
	inVerticalBlock: function(_ball){
		var ret = new Array();

		var yPosInBlock = _ball.getPosition().y % S.canvasHeight;
		var y = (_ball.getPosition().y - yPosInBlock)/S.canvasHeight;
		ret.push(y);

		if((yPosInBlock < _ball.getRadius()) && (_ball.getBody().getVectorVelocity().y < 0)){
			ret.push(y-1);
		}

		//Bottom
		if((yPosInBlock > (S.canvasHeight - _ball.getRadius())) && (_ball.getBody().getVectorVelocity().y > 0)){
			ret.push(y+1);
		}

		return ret;
	},

});

if(typeof module != 'undefined'){
    module.exports = GridCalc;
}
