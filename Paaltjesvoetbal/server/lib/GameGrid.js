if(typeof module != 'undefined'){
	var Block = require('./Block.js');
}

function GameGrid(_settings) {
	var grid = new Array();	//vertical
	grid.push(new Array());	//horizontal (first row)
	var settings = _settings;
	var maximumCol = maximumCol;

	this.addRow = function(){
		var l = grid.length;
		grid.push(new Array());
		for(i = 0; i < maximumCol; i++){
			var b = new Block(false ,x * settings.canvasWidth, y*settings.canvasHeight)

			grid[l].push(b)
			
			//Set vertical Neighbours
			grid[l-1].setNeighbour("bottom", b);
			b.setNeighbour("top", grid[l-1]);

			//Set horizontal Neighbours
			if(i > 0){
				grid[i-1].setNeighbour("right", b);
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

	this.updateGrid = function(socket, maximumCol){
		var x;
		var y;

		//Look for an available spot
		for (i = 0; i < this.getHeight(); i++) {
			x = checkrow(socket , i);
			if(x != -1){
				y = i;
				break
			}
		}

		//If no available spot is found add new row
		if(x < 0){
			this.addRow();
			grid[grid.length][0].setPlayer(socket);
		}

		return {left: x * settings.canvasWidth, top: y*settings.canvasHeight}; 
	}

	checkrow = function(socket, i){
		for(j = 0; j < maximumCol; j++){
				if(grid[i].length == j){
					grid[i].push(new Block(socket ,x * settings.canvasWidth, y*settings.canvasHeight))
					return j;
				}else if(grid[i][j].hasPlayer()){
					grid[i][j].setPlayer(socket)
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

}

if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
