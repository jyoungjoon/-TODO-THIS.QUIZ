`use strict`;

// Questions and Options:
const questionArray = [
  {
    question: `Which keyword is used to create an error?`,
    options: [`catch`, `throw`, `exception`, `error`],
    correct: `throw`,
  },

  {
    question: `Which collection object allows unique value to be inserted only once?`,
    options: [`Object`, `Array`, `Set`, `Map`],
    correct: `Set`,
  },

  {
    question: `Which expression evaluates to true?`,
    options: [`Boolean(NaN)`, `Boolean(0)`, `Boolean("false")`, `Boolean("")`],
    correct: `Boolean("false")`,
  },

  {
    question: `Which of these is a valid variable name?`,
    options: [`5thBirthday`, `New`, `lastName`, `first name`],
    correct: `lastName`,
  },

  {
    question: `What statement can be used to skip an iteration in a loop?`,
    options: [`continue`, `skip`, `break`, `pass`],
    correct: `continue`,
  },

  {
    question: `Which method converts JSON data to a JavaScript object?`,
    options: [
      `JSON.fromString();`,
      `JSON.parse()`,
      `JSON.toObject()`,
      `JSON.stringify()`,
    ],
    correct: `JSON.parse()`,
  },
  {
    question: `Which choice is not an array method?`,
    options: [
      `array.push()`,
      `array.pop()`,
      `array.unshift()`,
      `array.replace()`,
    ],
    correct: `array.replace()`,
  },

  {
    question: `Which of the following value is not falsy?`,
    options: [`[ ]`, `null`, `0`, `undefined`],
    correct: `[ ]`,
  },

  {
    question: `What will "0 && hi" return?`,
    options: [`ReferenceError`, `true`, `0`, `false`],
    correct: `0`,
  },

  {
    question: `Which property references the DOM object that dispatched an event?`,
    options: [`target`, `event`, `object`, `addEventListener`],
    correct: `target`,
  },
];

// Initialize variables:
const startButton = document.querySelector(`#start-button`);
const nextButton = document.querySelector(`#next-button`);
const restartButton = document.querySelector(`#restart-button`);
const startContainer = document.querySelector(`.start-container`);
const questionContainer = document.querySelector(`#question-container`);
const scoreContainer = document.querySelector(`#score-container`);
const numberOfQuestion = document.querySelector(`#number-of-question`);
const questionText = document.querySelector(`#question`);
const answerBox = document.querySelector(`#answer-box`);
const highScoreBoard = document.querySelector(`#high-score-board`);
const score = document.querySelector(`#score`);
const timeLeft = document.querySelector(`#time-left`);
const scoreText = document.querySelector(`#score-text`);
const rightOrWrong = document.querySelector(`#right-or-wrong`);

// Initialize dynamic variables:
let scoreCount = 0;
let count = 119;
let countdown;
let i = 0;

// On page load:
window.onload = () => {
  startContainer.classList.remove(`hide`);
  questionContainer.classList.add(`hide`);
  scoreContainer.classList.add(`hide`);
  nextButton.classList.add(`hide`);
  restartButton.classList.add(`hide`);
  displayHighScores();
};

// Start, Next, and Restart Buttons Event Listeners:
startButton.addEventListener(`click`, () => {
  questionCount = 1;
  startContainer.classList.add(`hide`);
  questionContainer.classList.remove(`hide`);
  startButton.classList.add(`hide`);
  nextButton.classList.remove(`hide`);
  timerDisplay();
  getRandomQuestion();
  getQuestion();
});

nextButton.addEventListener(`click`, () => {
  rightOrWrong.innerHTML = ``;
  nextButton.classList.add(`disable`);

  if (questionCount < questionArray.length + 1) {
    getQuestion();
  } else if (questionCount === questionArray.length + 1) {
    clearInterval(countdown);
    quizOver();
  }
});

restartButton.addEventListener(`click`, () => {
  location.reload();
});

// Timer:
const timerDisplay = () => {
  countdown = setInterval(() => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    count--;
    // Format the timer so it displays 00:00:
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timeLeft.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    // If the timer reaches 0, stop the timer, set the timer to 00:00 and end the quiz:
    if (count <= -2) {
      timeLeft.innerHTML = `00:00`;
      alert(`Sorry, you ran out of time 😥`);
      quizOver();
      clearInterval(countdown);
    }
  }, 1000);
};

// Randomize the order of the questions:
function getRandomQuestion() {
  nextButton.classList.add(`disable`);
  questionArray.sort(() => Math.random() - 0.5);
}

// Get the questions and options:
function getQuestion() {
  // Display the question number:
  numberOfQuestion.innerHTML = `${questionCount} of ${questionArray.length} QUESTIONS`;
  // Display the question and options using destructuring:
  let { question, options, correct } = questionArray[i];
  questionText.innerHTML = question;
  // Randomize the order of the options:
  options.sort(() => Math.random() - 0.5);
  answerBox.innerHTML = options
    // Display the options as buttons using map and join:
    .map((option) => {
      return `<button class='answerButtons' onClick='checker(this)'>${option}</button>`;
    })
    .join("");
}

// Check the answer:
function checker(userOption) {
  // Set the selected option to a variable:
  const selectedOption = userOption.innerHTML;
  // Filter the question array to find the correct answer using some:
  const filterQuestion = questionArray.some(
    (question) => question.correct === selectedOption
  );
  // If the selected option is correct, add 1 to the score, display CORRECT, and disable other options:
  if (filterQuestion) {
    event.target.classList.add(`disable`);
    event.target.style.backgroundColor = `#77DD77`;
    scoreCount += 1;
    rightOrWrong.innerHTML = `CORRECT 🤩`;
    score.innerHTML = scoreCount;
    questionCount += 1;
    nextButton.classList.remove(`disable`);
    i += 1;
    disableAnswerButtons();
    makeScoreBlink();
  } else {
    // If the selected option is incorrect, subtract 10 seconds from the timer, display WRONG
    event.target.classList.add(`disable`);
    count -= 10;
    rightOrWrong.innerHTML = `WRONG 😥`;
    event.target.style.backgroundColor = `#FFCCCB`;
    makeTimerBlink();
  }
}

// Display high scores:
function displayHighScores() {
  let key = `highScores`;
  // Grab high scores from local storage and parse it to an array; an empty array if there are no high scores:
  let highScores = JSON.parse(localStorage.getItem(key)) ?? [];

  // Sort high scores array by score: highest to lowest
  highScores.sort((a, b) => {
    return b.userScore - a.userScore;
  });

  // Display high scores using forEach loop and append child element to the high score board:
  highScores.forEach((score) => {
    let newUser = document.createElement(`li`);
    newUser.textContent = `${score.userInitials} - ${score.userScore} - ${score.userTime}`;
    highScoreBoard.appendChild(newUser);
  });
}

// When quiz is over:
function quizOver() {
  // Hide the question container and show the score container:
  questionContainer.classList.add(`hide`);
  scoreContainer.classList.remove(`hide`);
  // Show the final result and hide the next button and display the restart button:
  scoreText.innerHTML = `You scored ${scoreCount} out of ${
    questionArray.length
  } with ${count <= 0 ? `no time` : timeLeft.innerHTML} left.`;
  nextButton.classList.add(`hide`);
  restartButton.classList.remove(`hide`);
  // Ask the user if they want to save the score:
  const saveScore = confirm(`Do you want to save your score?`);
  // If they wish to save the score prompt them to enter their initials. If they do not enter their initials, they will be saved as Anonymous:
  if (saveScore) {
    const userInitials = prompt(`Enter your initials:`) ?? `Anonymous`;
    const userScore = scoreCount;
    const userTime = timeLeft.innerHTML;
    const key = `highScores`;
    // Get high scores from local storage
    const highScores = JSON.parse(localStorage.getItem(key)) ?? [];
    // Add new score to high scores parsed high scores array
    highScores.push({ userInitials, userScore, userTime });
    // Save high scores to local storage after stringifying;
    localStorage.setItem(key, JSON.stringify(highScores));
    // Display new high score by creating and appending a new list item to the high score board
    let newUser = document.createElement(`li`);
    newUser.textContent = `${userInitials} - ${userScore} - ${userTime}`;
    highScoreBoard.appendChild(newUser);
    clearInterval(countdown);
  }
}

// Helpers:

// Disable answer buttons after user has selected an answer:
function disableAnswerButtons() {
  const answerButtons = document.querySelectorAll(`.answerButtons`);
  answerButtons.forEach((button) => {
    button.classList.add(`disable`);
  });
}

// Make the timer blink in red when the user gets the answer wrong:
function makeTimerBlink() {
  timeLeft.classList.add(`time-deduction`);
  setTimeout(() => {
    timeLeft.classList.remove(`time-deduction`);
  }, 600);
}

// Make the score blink in green when the user gets the answer right:
function makeScoreBlink() {
  score.classList.add(`score-addition`);
  setTimeout(() => {
    score.classList.remove(`score-addition`);
  }, 600);
}
