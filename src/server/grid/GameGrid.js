if(typeof module != 'undefined'){
	var S = require('../../common/Settings.js');

	var Block = require('./Block.js');
	var GridCalc = require('./GridCalc.js');
}

/**
* GameGrid Class
* @class GameGrid
* @classdesc GameGrid is the class which contains all blocks. 
* @constructor 
*/
function GameGrid() {
	var grid = new Array();	//vertical
	grid.push(new Array());	//horizontal (first row)
	var maximumCol = 0;
	var gridc = new GridCalc();

	/**
	* Add a new row to the grid. The row is filled with new blocks. 
	* @method GameGrid#addRow
	*/
	this.addRow = function(){
		var l = grid.length;
		grid.push(new Array());
		for(var i = 0; i < maximumCol; i++){
			var b = new Block(false ,i * S.canvasWidth, l * S.canvasHeight)
		
			//Set vertical Neighbours
			grid[l-1][i].setNeighbour("bottom", b);
			b.setNeighbour("top", grid[l-1][i]);
			grid[l].push(b)

			//Set horizontal Neighbours
			if(i > 0){
				grid[l][i-1].setNeighbour("right", b);
				b.setNeighbour("left", grid[l][i-1]);
			}
		}

		return l;
	};

	this.getHeight = function(){ return grid.length; };

	this.getWidth = function(){ return grid[0].length; };

	/**
	* Add a new player to the grid, and adds ball to 
	* the palyer's screen. The player is placed on the
	* first available spot. 
	* @method GameGrid#updateGrid
	* @param {socket} socket - The socket that will be placed in the block.
	* @param {integer} maxcol - The maximum number of columns
	* @param {ball} _ball - 
	* @return {object} An object with the left and top boundary of the block in pixels. 
	*/
	this.updateGrid = function(socket, maxCol, ball){
		var x;
		var y;
		maximumCol = maxCol;

		//Look for an available spot
		for (var i = 0; i < this.getHeight(); i++) {
			x = checkrow(socket , i, ball);
			if(x != -1){
				y = i;
				break
			}
		}

		//If no available spot is found add new row
		if(x < 0){
			y = this.addRow();
			x = 0;
			grid[grid.length-1][0].setPlayer(socket);
			grid[grid.length-1][0].addBall(ball);
		}

		return {left: x * S.canvasWidth, top: y * S.canvasHeight}; 
	};

	/**
	* Check if there is place available in row i. 
	* @method GameGrid#checkrow 
	* @param {socket} socket - The socket that will be placed in the block.
	* @param {integer} i - The index of the row.
	* @param {ball} _ball - 
	* @return {array} The index of the first availble spot. -1 otherwise. 
	*/
	checkrow = function(socket, i, ball){
		for(var j = 0; j < maximumCol; j++){
				if(grid[i].length == j){
					grid[i].push(new Block(socket ,j * S.canvasWidth, i * S.canvasHeight))
					grid[i][j].setPlayer(socket)
					grid[i][j].addBall(ball);
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
	};

	/**
	* Delete the player from the grid. 
	* @method GameGrid#remove  
	* @param {socket} socket - The socket that will be removed
	*/
	this.remove = function(socketID){
		for (var i = 0; i < grid.length; i++) {
			for(var j = 0; j < grid[i].length; j++){
				if(grid[i][j].getPlayer()){
					if(socketID == grid[i][j].getPlayer().id){
						grid[i][j].removePlayer();
					}
				}
			}
		}
	};

	/**
	* Delete a ball from the grid.  
	* @method GameGrid#removeBall
	* @param {ball} ball - The ball that will be removed.
	*/
	this.removeBall = function(ball){
		blocksWithBall = gridc.inBlock(ball);
		blocksWithBall.forEach(function(b){
			if(b.y < grid.length){
				if(b.x < grid[b.y].length){
					grid[b.y][b.x].removeBall(ball, -1);
				}
			}
		})
	};

	/**
	* Update all the blocks in the grid. 
	* @method GameGrid#rupdate
	*/
	this.update = function(){
		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){
				grid[i][j].update()
			}
		}
	};

};

if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
