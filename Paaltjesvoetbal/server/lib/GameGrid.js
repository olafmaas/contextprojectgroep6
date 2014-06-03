function GameGrid(_settings) {
	var grid = new Array();	//vertical
	grid.push(new Array());	//horizontal (first row)
	var settings = _settings

	this.getHeight = function(){
		return grid.length;
	} 

	this.getWidth = function(){
		return grid[0].length;
	}

	this.updateGrid = function(socket, maximumCol){
		var x;
		var y;
		var placed = false;

		//Look for an available spot
		for (i = 0; i < this.getHeight(); i++) {
			if(grid[i].indexOf(-1) >  -1 || grid[i].length < maximumCol){
				if(grid[i].indexOf(-1) > -1){
					placed = true;
					x = grid[i].indexOf(-1);
					grid[i][x] = socket.id;
				}else{
					placed = true;
					x = grid[i].length;
					grid[i].push(socket.id)
				}
				y = i;
				break;
			}
		}

		//If no available spot is found add new row
		if(!placed){
			grid.push(new Array());
			x = 0;
			y = grid.length - 1;
			grid[i].push(socket.id);
		}
		return {left: x * settings.canvasWidth, top: y*settings.canvasHeight};
	}

	//TODO doet nog niks
	this.remove = function(socketID){
		for (i = 0; i < grid.length; i++) {
			for(j = 0; j < grid[i].length; j++){
				if(socketID == grid[i][j]){
					grid[i][j] = false;
				}
			}
		}
	}

}

if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
