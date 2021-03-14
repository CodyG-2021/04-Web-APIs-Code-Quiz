var olEl = document.querySelector("#nameScore");
var highScoresList = [];

console.log(highScoresList);

function renderScore () {
	olEl.innerHTML = "";
	
	for (var i = 0; i < highScoresList.length; i++) {
		var highS = highScoresList[i];
		var liEl = document.createElement("li");
		
		liEl.textContent = `Name: ${highS.name} Score: ${highS.score}`; 

		// `Name: ${highScores[i].name} Score: ${highScores[i].score}`;
		
		liEl.setAttribute("data-index", i);
		
		olEl.appendChild(liEl);
	}
};

function init() {
	var highScores = JSON.parse(localStorage.getItem("highScores"));
	if (highScores !== null) {
		highScoresList = highScores;
	}
	console.log(highScoresList);
	renderScore();
};


init();






// for (var i = 0; i < highScores.length; i++) {
// 	function renderScore() {
// 		var highS = highScoresList[i];

// 		var liEl = document.createElement("li");
// 			liEl.textContent = `Name: ${highScores[i].name} Score: ${highScores[i].score}`
// 			liEl.setAttribute("data-index", i);
			
// 			olEl.appendChild(liEl);
// 	};
// };

renderScore();
