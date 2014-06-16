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

	var gridWidth = 1;
	var gridHeight = 1;

	var gridc = new GridCalc();

	/**
	* Add a new column to the grid. This column is filled with new blocks. 
	* @method GameGrid#addColumn
	*/
	this.addColumn = function(){
		var x = gridWidth;
		gridWidth++;

		for(var y = 0; y < grid.length; y++){
			var b = new Block(false ,x * S.canvasWidth, y * S.canvasHeight)
		
			//Set horizontal Neighbours
			grid[y][x-1].setNeighbour("right", b);
			b.setNeighbour("left", grid[y][x-1]);
			grid[y].push(b)

			var clog= x-1

			//Set vertical Neighbours
			if(y > 0){
				grid[y-1][x].setNeighbour("bottom", b);
				b.setNeighbour("top", grid[y-1][x]);
			}
		}
	};

	/**
	* Add a new row to the grid. The row is filled with new blocks. 
	* @method GameGrid#addRow
	*/
	this.addRow = function(){
		var y = grid.length;
		grid.push(new Array());

		for(var x = 0; x < gridWidth; x++){
			var b = new Block(false ,x * S.canvasWidth, y * S.canvasHeight)
			
			//Set vertical Neighbours
			grid[y-1][x].setNeighbour("bottom", b);
			b.setNeighbour("top", grid[y-1][x]);
			grid[y].push(b)

			//Set horizontal Neighbours
			if(x > 0){
				grid[y][x-1].setNeighbour("right", b);
				b.setNeighbour("left", grid[y][x-1]);
			}
		}

		gridHeight++;
	};

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
	this.updateGrid = function(socket, balls){
		var x;
		var y;

		//Look for an available spot
		for (var i = 0; i < this.getHeight(); i++) {
		 x = checkrow(socket , i, balls);
			if(x != -1){
				y = i;
				break
			}
		}

		//If no available spot is found add a new row or column
		if(x < 0){
			var freeSpot = this.createFreeSpots(socket, balls);
			x = freeSpot.x;
			y = freeSpot.y;
		}

		return {left: x * S.canvasWidth, top: y * S.canvasHeight}; 
	};


	this.createFreeSpots = function(socket, balls){
			var x;
			var y;

			if(gridWidth <= gridHeight){
				//Add column
				this.addColumn()
				y = 0;
				x = gridWidth - 1;
				grid[y][x].setPlayer(socket);
				addBalls(grid[y][x], balls)
			}else{
				//Add row
				this.addRow();
				y = gridHeight - 1; 
				x = 0;
				grid[y][x].setPlayer(socket);
				addBalls(grid[y][x], balls)
			}

			return {x: x, y: y};
	}

	/**
	* Check if there is place available in row i. 
	* @method GameGrid#checkrow 
	* @param {socket} socket - The socket that will be placed in the block.
	* @param {integer} i - The index of the row.
	* @param {ball} _ball - 
	* @return {array} The index of the first availble spot. -1 otherwise. 
	*/
	checkrow = function(socket, i, balls){
		for(var j = 0; j < gridWidth; j++){
				if(grid[i].length == j){
					grid[i].push(new Block(socket ,j * S.canvasWidth, i * S.canvasHeight))

					grid[i][j].setPlayer(socket)
					addBalls(grid[i][j], balls)

					if(j > 0){
						grid[i][j-1].setNeighbour("right", grid[i][j]);
						grid[i][j].setNeighbour("left", grid[i][j-1]);
					}
					return j;
				}else if(!grid[i][j].hasPlayer()){
					grid[i][j].setPlayer(socket)
					addBalls(grid[i][j], balls)
					return j;
				}
		}
		return -1;
	};


	addBalls = function(_block, _balls){
		_balls.forEach(function(b){
			var xPos = Math.min(_block.getPosition().left + S.ball.x + Math.floor(Math.random()*S.ball.x), 
					_block.getPosition().left + S.canvasWidth - b.getRadius());
			var yPos = Math.min(_block.getPosition().top  + S.ball.y + Math.floor(Math.random()*S.ball.y), 
					_block.getPosition().top + S.canvasHeight - b.getRadius());

			b.setPosition(xPos, yPos)
			_block.addBall(b);
		})
	}

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


	this.cleanUp = function(){
		cleanRows();
		cleanColumns();
	}

	cleanRows = function(){
		var emptyRows = []
		for(var y = 0; y < grid.length; y++){
			empty = true;
			grid[y].forEach(function(_block){
				empty = empty && _block.hasPlayer;
			})

			//If you would call deleteRows there 
			if(empty) emptyRows.push(y);
		}
		deleteRows(emptyRows);
	}

	cleanColumns = function(){
		var emptyCols = []

		for(var x = 0; x < gridWidth; x++){
			var empty = false;
			for(var y = 0; grid.length; y++){
				empty = empty && grid[y][x].hasPlayer();
			}
			if(empty) emptyCols.push(x);
		}

		deleteColumns(emptyRows);
	}

	deleteRows =function(emptyRows){
		deletedRows = 0
		emptyRows.forEach(function(y){
			for(var x = 0; x < grid[y - deletedRows].length; x++){
				grid[y][x].getReadyForDeletion("bottom", "top");
			}
			grid.splice(y-deletedRows, 1);
			deletedRows++;
			gridHeight--:
		})
	};

	deleteColumns =function(emptyColumns){
		deletedColumns = 0
		emptyRows.forEach(function(x){
			for(var y = 0; y < grid.length; y++){
				grid[y][x].getReadyForDeletion("right", "left");
				grid[y].splice(x-deletedColumns, 1);
			}
			deletedColumns++;
			gridWidth--:
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

	this.getHeight = function(){ return grid.length; };

	this.getWidth = function(){ return grid[0].length; };
};

if(typeof module != 'undefined'){
    module.exports = GameGrid;
}
