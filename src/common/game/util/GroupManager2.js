if(typeof module != 'undefined'){
	var Group = require('./Group.js');
}

var GroupManager2 = {
	groups: {},

	addMember: function(element) {
		if(element.getType){
			var type = element.getType();

			if(!this.groups[type]){
				this.groups[type] = new Group(type);
			} 

			this.groups[type].addMember(element);
		}
	},

	getGroup: function(type) {
		if(!this.groups[type]){
			this.groups[type] = new Group(type);
		}
		return this.groups[type];
	},

	removeMember: function(element) {
		if(element.getType){
			this.groups[element.getType()].removeMember(element);
		}
	}
	
}

if(typeof module != 'undefined'){
    module.exports = GroupManager2;
}
