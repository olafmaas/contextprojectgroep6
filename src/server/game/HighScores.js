var GroupManager2 = require('../../common/game/util/GroupManager2.js');
var S = require('../../common/Settings.js');

var HighScores = {
	oldranking: [],

	//Returns a list of the players with their highscores
	getScores: function(){
		var temp = [];
		//Retrieve the highest scores of all the players
		for(var i = 0; i < GroupManager2.getGroup("Player").getMemberLength(); i++){
			var player = GroupManager2.getGroup("Player").getMember(i);
			var score = Math.max(player.getScore(), player.getHighscore());
			temp.push({ Score: score, Name: player.name, ID: player.getGlobalID() });
		}
		return temp;
	},

	//Updates the highscores on the mainscreen + informs players when they are in the top x
	updateScores: function(){
		var highScores = this.getScores();
		
		if(highScores.length > 0){
			var serializedScores = JSON.stringify(highScores);
			var hs = JSON.parse(serializedScores);
			//Sort the scores (highest to lowest)
			hs.sort(function(a, b) {return b.Score - a.Score;});

			return hs
		}
	},

	reviseTop: function(_top){
		var newRanking = [];
		//Retrieve the id's of the top players
		for(i = 0; i < _top.length; i++){
			newRanking.push(_top[i].ID);
		}
		//TODO: oldhs kan hier nu toch uit? wordt namelijk niet meer gebruikt nu alles gewoon teruggezet wordt.
		data = { newhs: newRanking, oldhs: this.oldranking };

		//TODO sh.updateTop(data);
		this.updateHighscore(data);
		
		this.oldranking = newRanking;

		return data
	},


	updateHighscore: function(highscore){
	
		for(i = 0; i < GroupManager2.getGroup("Player").getMemberLength(); i++){
			var player = GroupManager2.getGroup("Player").getMember(i);
			player.setPoints(S.player.points); //Reset points to a normal player
			
			if(player != -1){
				if(player.getPowerup() == null){
					player.getPole().setRadius(S.pole.size);
				}
			}
		}

		var count = S.highScore.top;
		
		for(i = 0; i < highscore.newhs.length; i++){
			var player = GroupManager2.getGroup("Player").getMemberByGlobalID(highscore.newhs[i]);
			player.setPoints(S.player.points + (S.player.step * count)); //Set points according to position in the highscore top
			
			if(player != -1){
				if(player.getPowerup() == null){
					player.getPole().setRadius(S.pole.size + count*2);
				}
			}
			count--;
		}
	}

};

module.exports = HighScores;
