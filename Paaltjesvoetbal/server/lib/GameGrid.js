function GameGrid(_settings) {
	var grid = new Array();
	grid.push(new Array());
	var settings = _settings

	this.getWidth = function(){
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
					x = grid[i].indexOf(-1);
					grid[i][x] = socket.id;
				}else{
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

}
if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
