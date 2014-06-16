if(typeof module != 'undefined'){
	var Group = require('../../common/game/util/Group.js');
}

function GroupManager(){
	var groups = [];

	this.addGroup = function(name, type){
		groups[name] = new Group(type);
	};

	this.update = function(){
		for(var key in groups){
			groups[key].update();
		}
	};

	this.group = function(name){
		return groups[name];
	};

};

if(typeof module != 'undefined'){
    module.exports = GroupManager;
}
