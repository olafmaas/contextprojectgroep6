if(typeof module != 'undefined'){
	var Group = require('../../game/Group.js');
}

function  GroupManager(){
	var groups = [];

	this.addGroup = function(name, type){
		groups[name] = new Group(type);
	};

<<<<<<< HEAD
=======
	this.update = function(){
		for(var key in groups){
			groups[key].update();
		}
	};

>>>>>>> origin/LeavingClients
	this.group = function(name){
		return groups[name];
	};

};

if(typeof module != 'undefined'){
    module.exports = GroupManager;
}
