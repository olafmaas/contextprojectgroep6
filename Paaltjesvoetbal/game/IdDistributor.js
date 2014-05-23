/**
* ID distributor
* @class IDDistributor
* @classdesc Distributes unique ID's
* @constructor 
*/
var IDDistributor = {
	nextId: 0,
	getNewId: function(){
		return this.nextId++;
	}
}

if(typeof module != 'undefined'){
	module.exports = IDDistributor;
}
