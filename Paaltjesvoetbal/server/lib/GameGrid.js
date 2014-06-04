if(typeof module != 'undefined'){
	var Block = require('./Block.js');
	var GridCalc = require('./GridCalc.js');
}

function GameGrid(_settings) {
	var grid = new Array();	//vertical
	grid.push(new Array());	//horizontal (first row)
	var settings = _settings;
	var maximumCol = 0;
	var gridc = new GridCalc();


	this.addRow = function(){
		var l = grid.length;
		grid.push(new Array());
		for(i = 0; i < maximumCol; i++){
			var b = new Block(false ,i * settings.canvasWidth, l*settings.canvasHeight)

			grid[l].push(b)
			
			//Set vertical Neighbours
			grid[l-1][i].setNeighbour("bottom", b);
			b.setNeighbour("top", grid[l-1]);

			//Set horizontal Neighbours
			if(i > 0){
				grid[l][i-1].setNeighbour("right", b);
				b.setNeighbour("left", grid[i-1]);
			}
		}
	}

	this.getHeight = function(){
		return grid.length;
	} 

	this.getWidth = function(){
		return grid[0].length;
	}

	this.updateGrid = function(socket, maxCol, ball){
		var x;
		var y;
		maximumCol = maxCol;

		//Look for an available spot
		for (i = 0; i < this.getHeight(); i++) {
			x = checkrow(socket , i, ball);
			if(x != -1){
				y = i;
				break
			}
		}

		//If no available spot is found add new row
		if(x < 0){
			this.addRow();
			grid[grid.length-1][0].setPlayer(socket);
			grid[grid.length-1][0].addBall(ball);
		}

		return {left: x * settings.canvasWidth, top: y*settings.canvasHeight}; 
	}

	checkrow = function(socket, i, ball){
		for(var j = 0; j < maximumCol; j++){
				if(grid[i].length == j){
					grid[i].push(new Block(socket ,j * settings.canvasWidth, i*settings.canvasHeight))
					grid[i][j].setPlayer(socket)
					grid[i][j].addBall(ball);
					console.log(i+" "+j);
					if(j > 0){
						grid[i][j-1].setNeighbour("right", grid[i][j]);
						grid[i][j].setNeighbour("left", grid[i][j-1]);
					}
					return j;
				}else if(!grid[i][j].hasPlayer()){
					grid[i][j].setPlayer(socket)
					grid[i][j].addBall(ball);
					return j;
				}
		}
		return -1;
	}

	this.remove = function(socketID){
		for (i = 0; i < grid.length; i++) {
			for(j = 0; j < grid[i].length; j++){
				if(socketID == grid[i][j].getPlayer()){
					grid[i][j].removePlayer();
				}
			}
		}
	}

	this.removeBall = function(ball){
		blocksWithBall = gridc.inBlock(ball);
		blocksWithBall.forEach(function(b){
			grid[b.x][b.y].remove(ball, -1);
		})
	}

	this.update = function(){
		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){
				grid[i][j].update()
			}
		}
	}

}

if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
