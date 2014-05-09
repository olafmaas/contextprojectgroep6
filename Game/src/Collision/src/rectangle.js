//A simple rectangle class
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

}