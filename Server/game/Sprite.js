function Sprite(){
	var texture;
	this.position = {x: 0, y: 0};
	this.origin = {x: 0, y: 0};
	this.rotation = 0;
	this.scale = {x: 1, y: 1};
	this.body;

	this.LoadContent = function(texturePath){
		texture = new Image();
		texture.src = texturePath;
	}

	this.Draw = function(canvasContext){
		canvasContext.drawImage(texture, this.position.x, this.position.y);
	}
}

if(typeof module != 'undefined'){
	module.exports = Sprite
}  
