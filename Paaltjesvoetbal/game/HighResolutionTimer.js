/**
 * A high resolution timer.
 */
function highResolutionTimer(delay, callback){
    // self-reference
    var self = this;

    // attributes
    var counter = 0;
    var start = new Date().getTime();

    /**
     * Delayed running of the callback.
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
