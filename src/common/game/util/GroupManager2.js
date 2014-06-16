if(typeof module != 'undefined'){
	var Group = require('./Group.js');
}

var GroupManager2 = {
	groups: {},

	addMember: function(element) {
		console.log(element)
		// var type = element.getType();

		// if(!this.groups[type]){
		// 	this.groups[type] = new Group(type);
		// } else {
		// 	this.groups[type].addMember(element);
		// }

	}
	
}

if(typeof module != 'undefined'){
    module.exports = GroupManager2;
}
