var IDDistributor = {
	nextId: 0,
	getNewId: function(){
		return this.nextId++;
	}
}