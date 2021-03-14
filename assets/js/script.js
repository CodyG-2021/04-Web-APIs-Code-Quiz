var startButton = document.querySelector("#startButton");
var timerEl = document.querySelector('#timer');

var questionEl = document.querySelector('#question');
var b1El = document.querySelector('#b1');
var b2El = document.querySelector('#b2');
var b3El = document.querySelector('#b3');
var b4El = document.querySelector('#b4');

var introEl = document.querySelector("#intro");
var quizEl = document.querySelector("#quiz");

var questions = [
	{
		question: "Here is the first Question",
		q1: "Correct",
		q2: "B",
		q3: "C",
		q4: "D",
		answer: "Correct"
	},
	// {
	// 	question: "Lets see if this worked",
	// 	q1: "Apple",
	// 	q2: "Dog",
	// 	q3: "It's Cat",
	// 	q4: "Blue",
	// 	answer: "It's Cat"
	// },
	// {
	// 	question: "Lets see if this worked 2",
	// 	q1: "Apple",
	// 	q2: "It's Dog",
	// 	q3: "Cat",
	// 	q4: "Blue",
	// 	answer: "It's Dog"
	// },
	// {
	// 	question: "Lets see if this worked 3",
	// 	q1: "Apple",
	// 	q2: "It's Dog",
	// 	q3: "Cat",
	// 	q4: "Blue",
	// 	answer: "It's Dog"
	// },
	// {
	// 	question: "Lets see if this worked 4",
	// 	q1: "Apple",
	// 	q2: "It's Dog",
	// 	q3: "Cat",
	// 	q4: "Blue",
	// 	answer: "It's Dog"
	// },
	{
		question: "Lets see if this worked 5",
		q1: "Apple",
		q2: "It's Dog",
		q3: "Cat",
		q4: "Blue",
		answer: "It's Dog"
	}];

var userScore;
var secondsLeft = 30;
var questionIndex = 0;

var timeInt;
function startTimer() {
	timeInt = setInterval(
		function () {
			secondsLeft--;
			timerEl.textContent = `Timer: ${secondsLeft}`;
			if (secondsLeft === 0) {
				userScore = 0;
				clearInterval(timeInt);
				timerEl.textContent = " ";
				alert("Times Up!");
				userScore = 0;
				enterHiSc();
			}
		}, 1000);
};

//Start the game 
startButton.addEventListener("click", startQuiz);
function startQuiz() {
	userScore = 0;
	startTimer();
	introEl.setAttribute("style", "display: none");
	quizEl.setAttribute("style", "display: block");
	loadQuestions();
};


//Could create a for loop here


//Load the questions based on the index
function loadQuestions() {
	questionEl.textContent = questions[questionIndex].question;
	b1El.textContent = `${questions[questionIndex].q1}`;
	b2El.textContent = `${questions[questionIndex].q2}`;
	b3El.textContent = `${questions[questionIndex].q3}`;
	b4El.textContent = `${questions[questionIndex].q4}`;
};

var wrongEl = document.querySelector("#wrong");
quizEl.addEventListener("click", function (event) {
	var element = event.target;
	if (element.matches(".quizB")) {
		var check = element.innerText;
		if (check === questions[questionIndex].answer) {
			secondsLeft = secondsLeft + 5;
			alert("Correct!");
			wrongEl.textContent = " ";
			//Run through the questions
			var qLength = questions.length - 1;
			if (questionIndex < qLength) {
				questionIndex++;
				loadQuestions();
			} else {
				//Ran through all the questions - finish
				alert("All Done!");
				userScore = secondsLeft;
				// saveScore();
				clearInterval(timeInt);
				timerEl.textContent = " ";
				enterHiSc();
			}
		} else {
			secondsLeft = secondsLeft - 5;
			wrongEl.textContent = "Incorrect -5 seconds";
			if (secondsLeft <= 0) {
				userScore = 0;
				// saveScore();
				clearInterval(timeInt);
				timerEl.textContent = " ";
				alert("Ran out of time!");
				enterHiSc();
			}
		}
	}
});

//Just to see if I could do it, made the elements in JS for the enter high score part.

var mainEl = document.querySelector('main');
var sectionEl = document.createElement("section");
var h1El = document.createElement("h1");
var h2El = document.createElement("h2");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var buttonEl = document.createElement("button");

function enterHiSc() {
	quizEl.setAttribute("style", "display: none");
	console.log(userScore);

	mainEl.appendChild(sectionEl);
	sectionEl.appendChild(h1El);
	sectionEl.appendChild(h2El);
	sectionEl.appendChild(labelEl);
	sectionEl.appendChild(inputEl);
	sectionEl.appendChild(buttonEl);

	sectionEl.setAttribute("class", "sectionEl");
	h1El.setAttribute("class", "h1El");
	h2El.setAttribute("class", "h2El");
	labelEl.setAttribute("class", "labelEl");
	inputEl.setAttribute("class", "inputEl");
	inputEl.setAttribute("placeholder", "John Smith...");
	buttonEl.setAttribute("class", "buttonEl");

	h1El.textContent = "H1 Loaded";
	h2El.textContent = `Your score is ${userScore}.`;
	labelEl.textContent = "Please enter your name: ";
	buttonEl.textContent = "Post";

	//Save values to array
	buttonEl.addEventListener("click", function (event) {
		event.preventDefault();
		var highScore =JSON.parse(localStorage.getItem("highScores")) || [];

		var highScores = {
			name: inputEl.value.trim(),
			score: userScore
		};

		highScore.push(highScores);

		localStorage.setItem("highScores", JSON.stringify(highScore));
	});
};


