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
	inBlock: function(ball){
		var arr = new Array();

		xList = this.inHorizontalBlock(ball);
		yList = this.inVerticalBlock(ball);

		for(i = 0; i < xList.length; i++){
			for(j = 0; j< yList.length; j++){
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
	inHorizontalBlock: function(ball){
		var ret = new Array();

		var xPosInBlock = ball.getPosition().x % S.canvasWidth;
		x = (ball.getPosition().x - xPosInBlock)/S.canvasWidth;
		ret.push(x);

		if((xPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().x < 0)){
			ret.push(x-1);
		}else if((xPosInBlock > (S.canvasWidth - ball.getRadius())) && (ball.getBody().getVectorVelocity().x > 0)){
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
	inVerticalBlock: function(ball){
		var ret = new Array();

		var yPosInBlock = ball.getPosition().y % S.canvasWidth;
		y = (ball.getPosition().y - yPosInBlock)/S.canvasWidth;
		ret.push(y);

		if((yPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().y < 0)){
			ret.push(y-1);
		}

		//Bottom
		if((yPosInBlock > (S.canvasHeight - ball.getRadius())) && (ball.getBody().getVectorVelocity().y > 0)){
			ret.push(y+1);
		}

		return ret;
	},

});

if(typeof module != 'undefined'){
    module.exports = GridCalc;
}
