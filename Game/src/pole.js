//A simple pole class

/** 
* Pole constructor
*
* @class Pole
* @classdesc Pole constructor.
* @constructor
* @param {number} _width - The width of the pole in pixels.
* @param {number} _height - The height of the pole in pixels.
*/
function Pole(_width, _height){
  
    //Pole properties
    var position = {x: 0, y: 0}; //position of the pole
    var middle = {x: 0, y: 0}; //position of the middle of the pole 
    var width = _width; //height of the pole
    var height = _height; //width of the pole

    /**
    * Draws the pole on the canvas
    *
    * @method Pole#draw
    * @param {CanvasContext} _canvasContext - The canvas context on which the pole will be drawn.
    */
    this.draw = function (_canvasContext){
        _canvasContext.beginPath();
        _canvasContext.rect(position.x,position.y,width,height);
        _canvasContext.closePath();
        _canvasContext.fill();
    }

    /**
    * Returns the x and y coordinates of the middle of the pole.
    *
    * @method Pole#getMiddle
    * @return {number, number} The x and y coordinate of the middle of the pole.
    */
    this.getMiddle = function (){
        return middle;
    }

    /**
    * Returns the x coordinate of the middle of the pole.
    *
    * @method Pole#middleX
    * @return {number} The x coordinate of the middle of the pole.
    */
    this.middleX = function (){
        return middle.x;
    }

    /**
    * Returns the y coordinate of the middle of the pole.
    *
    * @method Pole#middleY
    * @return {number} The y coordinate of the middle of the pole.
    */
    this.middleY = function (){
        return middle.y;
    }

    /**
    * Sets the position of the pole in the canvas.
    * It also calculates the new coordinates of the middle of the pole.
    * 
    * @method Pole#calculateMiddle
    * @param {number} _x - The x coordinate in pixels.
    * @param {number} _y - The y coordinate in pixels.
    */
    this.setPosition = function (_x, _y){
        position.x = _x;
        position.y = _y;
        this.calculateMiddle();
    }

    /**
    * Calculates the coordinates of the middle of the pole.
    *
    * @method Pole#calculateMiddle
    */
    this.calculateMiddle = function (){
        middle.x = position.x + (0.5 * width);
        middle.y = position.y + (0.5 * height);
    }

    /**
    * Sets the width of the pole.
    *
    * @method Pole#setWidth
    * @param {number} _width - The width of the pole in pixels.
    */
    this.setWidth = function (_width){
        width = _width;
    }

    /**
    * Sets the height of the pole.
    *
    * @method Pole#setHeight
    * @param {number} _height - The height of the pole in pixels.
    */
    this.setHeight = function (_height){
        height = _height;
    }

    /**
    * Retrieves the x and y coordinates of the pole.
    *
    * @method Pole#getPosition
    * @return {number, number} The x and y coordinates of the pole.
    */
    this.getPosition = function (){
        return position;
    }

    /**
    * Retrieves the x coordinate of the pole.
    *
    * @method Pole#getXPosition
    * @return {number} The x coordinate of the pole.
    */
    this.getXPosition = function (){
        return position.x;
    }

    /**
    * Retrieves the y coordinate of the pole.
    *
    * @method Pole#getYPosition
    * @return {number} The Y coordinate of the pole.
    */
    this.getYPosition = function (){
        return position.y;
    }

    /**
    * Retrieves the width of the pole.
    *
    * @method Pole#getWidth
    * @return {number} The width of the pole.
    */
    this.getWidth = function (){
        return width;
    }

    /**
    * Retrieves the height of the pole.
    *
    * @method Pole#getHeight
    * @return {number} The height of the pole.
    */
    this.getHeight = function (){
        return height;
    }

}