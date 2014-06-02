//Singletons differ from static classes (or objects) as we can delay their initialization
//because we don't need to delay the initialization of this class we use an object intead of a singleton.

var logHandler = {
	debug: true,

	log: function(message){
		if(this.debug){
			console.log(message)
		}
	}
};

if(typeof module != 'undefined'){
    module.exports = logHandler;
}
