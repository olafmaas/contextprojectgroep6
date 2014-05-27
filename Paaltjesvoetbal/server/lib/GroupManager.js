if(typeof module != 'undefined'){
	var Group = require('../../game/Group.js');
}

function  GroupManager(){
	var groups = [];

	this.addGroup = function(name, type){
		groups[name] = new Group(type);
	}

	this.update = function(){
		groups.forEach(function(_object){
			_object.update();
		})
	}

	this.group = function(name){
		return groups[name];
	}

}

if(typeof module != 'undefined'){
    module.exports = GroupManager;
}
