function PlayerController(){
	this.createPlayerObjects = function(data, socket){
		var pole;
		var shield;
		var player;

		pole = game.instantiate(new Pole(Settings.pole.size));
		pole.setColor(Settings.pole.color);
		pole.setPosition(data.polePos.x, data.polePos.y);
		poles.addMember(pole);

		shield = game.instantiate(new Shield(pole));
		shield.getBody().immovable = true;
		shields.addMember(shield);
		shield.noCalc();
		shield.setColor(Settings.shield.color);

		player = game.instantiate(new Player(data.id));
		player.setPole(pole);
		player.setShield(shield);
		player.setGlobalID(data.gpid);
		pole.setPlayer(player);
		players.addMember(player);

		return new Client(socket, player, pole, shield) 
	};

	this.removePlayerObjects = function(client){
		poles.removeMember(client.pole);
		shields.removeMember(client.shield);
		players.removeMember(client.player);

		game.remove(client.pole);
		game.remove(client.shield);
		game.remove(client.player);
	};

	this.updatePostition = function(data){
		var p = players.getMemberByGlobalID(data.gid);
		if(p != -1){ 
			p.updatePosition(data.x, data.y);
		}
	}

	this.isHit = function(_pid){
		var p = players.getMemberByGlobalID(_pid);
		if(p != -1){
			p.getPole().isHit();
		}
	}
}
