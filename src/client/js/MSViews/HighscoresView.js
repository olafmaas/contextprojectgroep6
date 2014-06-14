HighscoresView = function(){
	var ViewSettings = {
		backgroundColor: "black",
		textColor: "white",
		viewWidth: "300px",

		fontFamily: "Arial",
		titleFontSize: "20px",
		columnTitleFontSize: "13px",
		scoresFontSize: "10px",

		title: "Highscores:",
		nameColTitle: "Name",
		scoreColTitle: "Score",
	};

	this.initialize = function(){
		var scores = this.stubScores();
		this.updateScores(scores);

		$("#HighscoresView").css("background-color", ViewSettings.backgroundColor);
		$("#HighscoresView").css("color", ViewSettings.textColor);
		$("#HighscoresView").css("width", ViewSettings.viewWidth);
		$("#HighscoresView").css("font-family", ViewSettings.fontFamily);

		$("#Title").css("font-size", ViewSettings.titleFontSize);
		$("#ColumnTitles").css("font-size", ViewSettings.columnTitleFontSize);
		$("#ScoreList").css("font-size", ViewSettings.scoresFontSize);

		$("#Title").html(ViewSettings.title);
		$("#NameTitle").html(ViewSettings.nameColTitle);
		$("#ScoreTitle").html(ViewSettings.scoreColTitle);
	}

	this.updateScores = function(_scores){
		$("#ScoreList").empty();

		for (var i = 0; i < _scores.length; i++) {
			$("#ScoreList").append(this.newScoreDiv(i, _scores[i]));
		};
	}

	this.updateHeight = function(){
		$("#HighscoresView").css("height", $("#gameCanvas").css("height"));
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