/**
 * A high resolution timer needed for the server.
 * @class highResolutionTimer
 * @classdesc A high resolution timer needed to stay in sync with the server.
 * @constructor
 * @param {number} delay - The delay between the timer
 * @param {function} callback - The callback function for the timer.
 */
function highResolutionTimer(delay, callback){
    // self-reference
    var self = this;

    // attributes
    var counter = 0;
    var start = new Date().getTime();

    /**
    * Delays the next call to the timer
    * 
    * @method highResolutionTimer#delayed
    */
    function delayed(){
        callback(delay);
        counter ++;
        var diff = (new Date().getTime() - start) - counter * delay;
        setTimeout(delayed, delay - diff);
    }

    // start timer
    delayed();
    setTimeout(delayed, delay);
}

if(typeof module != 'undefined'){
    module.exports = highResolutionTimer;
}  
