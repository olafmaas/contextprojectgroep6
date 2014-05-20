//Sprite properties
function Sprite(){
	var texture;
	this.position = {x: 0, y: 0};
	this.origin = {x: 0, y: 0};
	this.rotation = 0;
	this.scale = {x: 1, y: 1};
	this.body;

	/**
	* Function which loads a texture
	* @method Sprite#LoadContent
	* @param {texture's path}
	*/
	this.LoadContent = function(texturePath){
		texture = new Image();
		texture.src = texturePath;
	}

	/**
	* Function which draws the sprite
	* @method Sprite#Draw
	* @param {The canvas}
	*/
	this.Draw = function(canvasContext){
		canvasContext.drawImage(texture, this.position.x, this.position.y);
	}
}

if(typeof module != 'undefined'){
	module.exports = Sprite
}  

