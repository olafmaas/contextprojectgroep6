HighscoresView = function(){
	//Css settings used by the view
	var ViewSettings = {
		backgroundColor: "black",
		textColor: "white",
		viewWidth: "20%",

		fontFamily: "'Indie Flower', cursive",
		titleFontSize: "40px",
		columnTitleFontSize: "25px",
		scoresFontSize: "20px",

		title: "Highscores:",
		nameColTitle: "&nbsp;Name",
		scoreColTitle: "Score",

		overflow: "hidden",
		viewHeight: "95%",
	};

	//Initializes the view and sets the css 
	this.initialize = function(){
		$("#HighscoresView").css("background-color", ViewSettings.backgroundColor);
		$("#HighscoresView").css("color", ViewSettings.textColor);
		$("#HighscoresView").css("width", ViewSettings.viewWidth);
		$("#HighscoresView").css("font-family", ViewSettings.fontFamily);
		$("#HighscoresView").css("height", ViewSettings.viewHeight);
		$("#HighscoresView").css("overflow", ViewSettings.overflow);

		$("#Title").css("font-size", ViewSettings.titleFontSize);
		$("#ColumnTitles").css("font-size", ViewSettings.columnTitleFontSize);
		$("#ScoreList").css("font-size", ViewSettings.scoresFontSize);

		$("#Title").html(ViewSettings.title);
		$("#NameTitle").html(ViewSettings.nameColTitle);
		$("#ScoreTitle").html(ViewSettings.scoreColTitle);

		$("body").css("height", window.innerHeight +'px');
		$("#gameDiv").css("max-height", window.innerHeight +'px');
	}

	//Updates the highscore list by clearing it and appending all the players
	this.updateScores = function(_scores){
		$("#ScoreList").empty();

		if(_scores != null){
			for (var i = 0; i < _scores.length; i++) {
				$("#ScoreList").append(this.newScoreDiv(i + 1, _scores[i]));
			};
		}
	}

	//Updates the height of the highscore 
	this.updateHeight = function(){
		$("#HighscoresView").css("height", $("#gameCanvas").css("height"));
	}

	//Adds the html div used for a new score in the highscore list
	this.newScoreDiv = function(_position, _score){
		return "<div class=container>" + 
					"<div class=Position>&nbsp;" + _position + ".</div>" +
					"<div class=Name>&nbsp;" + _score.Name + "</div>" +
					"<div class=Score>" + _score.Score + "</div>" +
				"</div>";
	}

	//Initalizes the highscore
	this.initialize();
}