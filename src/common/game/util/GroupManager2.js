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
		return this.groups[type];
	}
	
}

if(typeof module != 'undefined'){
    module.exports = GroupManager2;
}
