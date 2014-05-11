//A simple rectangle class

//Creates a rectangle object
//@Param _canv 
//  The canvas on which the rectanble will reside
function Rectangle(_canv){
  
    //Rectangle properties
    this.x = 0; //x position in the canvas (top right of rectangle)
    this.y = 0; //y position in the canvas (top right of rectangle)
    this.height = 0; //height of the rectangle
    this.width = 0; //width of the rectangle

    //Draws the rectangle on the canvas
    this.draw = function (){
        var ctx = _canv.getContext("2d");
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.closePath();
        ctx.fill();
    }

    //Sets the position of the rectangle on the canvas
    //@Param _x
    //  The x coordinate of the top left corner of the rectangle
    //@Param _y
    //  The y coordinate of the top left corner of the rectangle
    this.setPosition = function (_x, _y){
        this.x = _x;
        this.y = _y;
    }

    //Sets the width of the rectangle
    //@Param _width
    //  The width of the rectangle in pixels
    this.setWidth = function (_width){
        this.width = _width;
    }

    //Sets the height of the rectangle
    //@Param _height
    //  The height of the rectangle in pixels
    this.setHeight = function (_height){
        this.height = _height;
    }

    //Get the x coordinate of the top left corner of the rectangle
    this.getXPosition = function (){
        return this.x;
    }

    //Get the y coordinate of the top left corner of the rectangle
    this.getYPosition = function (){
        return this.y;
    }

    //Get the width of the rectangle
    this.getWidth = function (){
        return this.width;
    }

    //Get the height of the rectangle
    this.getHeight = function (){
        return this.height;
    }

}