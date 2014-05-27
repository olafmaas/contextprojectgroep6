function Log(_debug){
	var debug = _debug;

	this.log = function(message){
		if(debug){
			console.log(message)
		}
	}
}

if(typeof module != 'undefined'){
    module.exports = Log;
}
