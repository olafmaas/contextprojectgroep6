function GameGrid(_settings) {
	var grid = new Array();
	grid.push(new Array());
	var settings = _settings

	this.getWidth = function(){
		if(grid[0].length == 0)
			return 1; //Temporary so a screen will be visible when no players are connected yet
		return grid[0].length;
	}

	this.getHeight = function(){
		return grid.length;
	} 

	this.updateGrid = function(socket, maximumCol){
		var x;
		var y;
		placed = false;

		//Look for an available spot
		for (i = 0; i < grid.length; i++) {
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

	this.remove = function(socketID){
		for (i = 0; i < grid.length; i++) {
			for(j = 0; j < grid[i].length; j++){
				if(socketID == grid[i][j]){
					grid[i][j] = -1;
				}
			}

		}
	}

}

if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
