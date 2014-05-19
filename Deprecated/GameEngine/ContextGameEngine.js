function Game(load, update, draw){
	var width, height;
	var backGroundColor;
	var canv;

	parentUpdate = function(){
		updateGameDimensions();

		update();

		parentDraw();
	}

	parentDraw = function(){
		var ctx = canv.getContext("2d");

		clearCanvas();
		draw(ctx);

	}

	createCanvas = function(){
		var canv = document.createElement("canvas");
		canv.id = 'gameCanvas';

		canv.width = width;
		canv.height = height;

		document.body.appendChild(canv);

		return document.getElementById("gameCanvas");
	}

	updateGameDimensions = function(){
		width=window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

		height=window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

		canv.width = width;
		canv.height = height;
	}

	clearCanvas = function(){
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = backGroundColor;
		ctx.fillRect(0, 0, width, height);
	}

	Initialize = function(){
		width = document.body.clientWidth;
		height = document.body.clientHeight;
		backGroundColor = "#000000";

		canv = createCanvas();
	}

	Boot = function(){
		load();
		setInterval(parentUpdate, 17);
	}

	Initialize();
	setTimeout(Boot, 1000);

	//====================
	//Section: gets & sets
	this.getBackgroundColor = function(){
		return backGroundColor;
	}

	this.setBackgroundColor = function(_color){
		backGroundColor = _color;
	}
}

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

//A simple circle class

//Creates a circle object
//@Param _canv 
//  The canvas on which the circle will reside
function Ball(radius){
  
	//Circle properties
	var position = {x: 0, y: 0}; //position of the circle
	var radius = radius; //radius of the circle
	var color = "#000000"; //The color of the ball
	var body;

	//Draws the circle on the canvas
	this.Draw = function (canvasContext){
		canvasContext.beginPath();
		canvasContext.arc(position.x, position.y, radius, 0, Math.PI*2, true);
		canvasContext.closePath();

		canvasContext.fillStyle = color;
		canvasContext.fill();
	}

	//Function to update
	this.Update = function(){
		if(body instanceof CircularBody) body.Update();
	}

	this.EnableBody = function(){
		body = new CircularBody(this);
	}

	//Check for collision
	this.CollidesWith = function(other){
		return body.CollidesWith(other.getBody());
	}

	//=============================
	//SECTION: Get & sets

	//Sets the position of the circle on the canvas
	//@Param _x
	//	The x coordinate of the middle of the circle
	//@Param _y
	//	The y coordinate of the middle of the circle
	this.setPosition = function (_x, _y){
		position.x = _x;
		position.y = _y;

		body.position = {x: _x, y: _y};
	}

	//Sets the speed of the circle
	//@Param _dx
	//	The speed of the circle from left to right in pixels per redraw. Negative number is right to left.
	//@Param _dy
	//	The speed of the circle from top to bottom in pixels per redraw. Negative number is bottom to top.
	this.setVelocity = function (_vel){
		body.velocity = _vel;
	}

	this.setVelocityDirection = function(_direction){
		body.velocityDirection = _direction;
	}

	//Sets the radius of the circle
	//@Param _radius
	//	The radius of the circle in pixels
	this.setRadius = function (_radius) {
		radius = _radius;
		body.radius = _radius;
	}

	this.setColor = function(_color){
		color = _color;
	}

	this.getPosition = function(){
		return position;
	}

	//Get the velocity of the circle
	this.getVelocity = function (){
		return body.velocity;
	}

	//Get the radius of the circle
	this.getRadius = function (){
		return radius;
	}

	this.getColor = function(){
		return color;
	}

	this.getBody = function(){
		return body;
	}

	//Stuff to execute when constructing
	this.EnableBody();
}

/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  };
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});

/*End of base class*/

var Body = Base.extend({
	position: {x:0, y:0},
	isStatic: false,
	isTrigger: false,
	velocity: 0, //The velocity of the circle
	velocityDirection: 0, //The direction the ball is moving in
	vectorVelocity: {x: 0, y: 0}, //velocity of circle split in a vector

	Update: function(){
		//Keep velocityDirection value between 0 and 2pi
		this.velocityDirection = this.velocityDirection % (2 * Math.PI);
		this.vectorVelocity  = {
			x: this.velocity * Math.cos(this.velocityDirection),
			y: -this.velocity * Math.sin(this.velocityDirection)
		};

		this.position.x += this.vectorVelocity.x;
		this.position.y += this.vectorVelocity.y;
	}
});

var CircularBody = Body.extend({
	radius: 1,
	parentBall: 0,

	constructor: function(_parent){
		this.radius = _parent.getRadius();
		this.parentBall = _parent;
	},

	Update: function(){
		this.base();
		this.parentBall.setPosition(this.position.x, this.position.y);
	},

	CollidesWith: function(other){
		if(other instanceof CircularBody) return this.CollidesWithBall(other);
		else console.log("Unimplemented Collision with " + other);
	},

	//Check for collision
	CollidesWithBall: function(other){
		//Get x and y difference
		var dx = Math.abs(this.position.x - other.position.x);
		var dy = Math.abs(this.position.y - other.position.y);

		//Calculate the distance with pythagoras
		var distanceApart = Math.sqrt(dx*dx + dy*dy);

		//Check if they collide
		return (distanceApart <= this.radius + other.radius);
	},

	HandleCollision: function(other){
		if(!CollidesWith(other)) return;

		//TODO: Handle collision code
		console.log("Collision handled");
	}
});