function Game(update){
	var canv = createCanvas().getContext("2d");
	var backGroundColor = "#000000";
	var running = true;

	parentUpdate = function(){
		update();
		sleep(17, parentUpdate);
	}

	parentUpdate();
}

function Sprite(){
	var texture;
	var position = {x: 0, y: 0};
	var origin = {x: 0, y: 0};

	this.LoadContent = function(texturePath){

	}

	this.Draw = function(){

	}
}

function createCanvas(){
	var canv = document.createElement("canvas");
	canv.id = 'gameCanvas';

	document.body.appendChild(canv);

	return document.getElementById("gameCanvas");
}

function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}