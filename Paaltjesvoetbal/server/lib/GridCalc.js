var GridCalc= Base.extend({

	setting: new Settings(),

	inBlock: function(ball){
		var arr = new Array();

		xList = this.inHorizontalBlock(ball);
		yList = this.inVerticalBlock(ball);

		for(i = 0; i < xList.length; i++){
			for(j = 0; j< yList.length; y++){
				arr.push({x: xList[i], y: yList[i]});
			}
		}

		return arr;
	},

	inHorizontalBlock: function(ball){
		var ret = new Array();

		var xPosInBlock = ball.getPosition().x % settings.canvasWidth;
		x = (ball.getPosition().x - xPosInBlock)/settings.canvasWidth;
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

		var yPosInBlock = ball.getPosition().y % settings.canvasWidth;
		y = (ball.getPosition().y - yPosInBlock)/settings.canvasWidth;
		ret.push(y);

		if((yPosInBlock < ball.getRadius()) && (ball.getBody().getVectorVelocity().y < 0){
			ret.push(y-1);
		}

		//Bottom
		if((yPosInBlock > (this.setting.canvasHeight - ball.getRadius())) && (ball.getBody().getVectorVelocity().y > 0)){
			ret.push(y+1);
		}
	},

})