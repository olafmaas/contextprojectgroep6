if(typeof module != 'undefined'){
	var Base = require('../../lib/Base.js');
	
	var S = require('../../common/Settings.js');
}

var GridCalc= Base.extend({

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

	inHorizontalBlock: function(ball){
		var ret = new Array();

		var xPosInBlock = ball.getPosition().x % this.setting.canvasWidth;
		x = (ball.getPosition().x - xPosInBlock)/this.setting.canvasWidth;
		ret.push(x);

		if((xPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().x < 0)){
			ret.push(x-1);
		}else if((xPosInBlock > (this.setting.canvasWidth - ball.getRadius())) && (ball.getBody().getVectorVelocity().x > 0)){
			ret.push(x+1);
		}

		return ret;
	},

	inVerticalBlock: function(ball){
		var ret = new Array();

		var yPosInBlock = ball.getPosition().y % this.setting.canvasWidth;
		y = (ball.getPosition().y - yPosInBlock)/this.setting.canvasWidth;
		ret.push(y);

		if((yPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().y < 0)){
			ret.push(y-1);
		}

		//Bottom
		if((yPosInBlock > (this.setting.canvasHeight - ball.getRadius())) && (ball.getBody().getVectorVelocity().y > 0)){
			ret.push(y+1);
		}

		return ret;
	},

});

if(typeof module != 'undefined'){
    module.exports = GridCalc;
}
