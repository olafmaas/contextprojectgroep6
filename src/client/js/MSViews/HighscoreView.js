HighscoreView = function(){
	var ViewSettings = {
		backgroundColor: "white",
		viewWidth: "100px",

		fontFamily: "Arial",
		titleFontSize: "20px",
		columnFontSize: "13px",
		scoresFontSize: "10px",
		fontColor: "white",

		title: "Highsores:",
		nameColTitle: "Name",
		scoreColTitle: "Score",
	};

	this.initialize = function(){
		var scores = this.stubScores();
		this.updateScores(scores);
		//Implement dat de name title als linkermargin de padding van list heeft
	}

	this.updateScores = function(_scores){
		$("#ScoreList").empty();

		for (var i = 0; i < _scores.length; i++) {
			$("#ScoreList").append(this.newScoreDiv(i, _scores[i]));
		};
	}

	this.stubScores = function(){
		return [
			{Name: "Bas", Score: 1337},
			{Name: "Bram", Score: 1234},
			{Name: "Bert", Score: 1000},
			{Name: "Bart", Score: 666},
			{Name: "Boris", Score: 127},
			{Name: "Berend", Score: 1}
		];
	}

	this.newScoreDiv = function(_position, _score){
		return "<div class=container>" + 
					"<div class=Position>" + _position + ".</div>" +
					"<div class=Name>" + _score.Name + "</div>" +
					"<div class=Score>" + _score.Score + "</div>" +
				"</div>";
	}

	this.initialize();
}