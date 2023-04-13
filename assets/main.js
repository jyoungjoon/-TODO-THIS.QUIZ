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
    question: `How does the forEach() method differ from a for statement?`,
    options: [
      `forEach allows you to specify your own iterator, whereas for does not.`,
      `forEach can be used only with strings, whereas for can be used with additional data types.`,
      `for loops can be nested; whereas forEach loops cannot.`,
      `forEach can be used only with an array, whereas for can be used with additional data types.`,
    ],
    correct: `forEach can be used only with an array, whereas for can be used with additional data types.`,
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
    question: `Which statement can take a single expression as input and then look through a number of choices until one that matches that value is found?`,
    options: [`else if`, `for`, `when`, `switch`],
    correct: `switch`,
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
    question: `How would you add a data item named animal with a value of sloth to local storage for the current domain?`,
    options: [
      `LocalStorage.setItem('animal','sloth');`,
      `document.localStorage.setItem('animal','sloth');`,
      `localStorage.setItem({animal:'sloth'});`,
      `localStorage.setItem('animal','sloth');`,
    ],
    correct: `document.localStorage.setItem('animal','sloth');`,
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
const startContainer = document.querySelector(`#start-container`);
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

window.onload = () => {
  startContainer.classList.remove(`hide`);
  questionContainer.classList.add(`hide`);
  scoreContainer.classList.add(`hide`);
  nextButton.classList.add(`hide`);
  restartButton.classList.add(`hide`);
  displayHighScores();
};

// Buttons Event Listeners:
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

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timeLeft.innerHTML = `${formattedMinutes}:${formattedSeconds}`;

    if (count <= -2) {
      alert(`Sorry, you ran out of time 😥`);
      timeLeft.innerHTML = `00:00`;
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
  numberOfQuestion.innerHTML = `${questionCount} of ${questionArray.length} QUESTIONS`;
  let { question, options, correct } = questionArray[i];
  questionText.innerHTML = question;
  options.sort(() => Math.random() - 0.5);
  answerBox.innerHTML = options
    .map((option) => {
      return `<button class='answerButtons' onClick='checker(this)'>${option}</button>`;
    })
    .join("");
}

// Check the answer:
function checker(userOption) {
  const selectedOption = userOption.innerHTML;
  const filterQuestion = questionArray.some(
    (question) => question.correct === selectedOption
  );

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
  // Get high scores from local storage
  let highScores = JSON.parse(localStorage.getItem(key)) || [];

  // Sort high scores array by score: highest to lowest
  highScores.sort((a, b) => {
    return b.userScore - a.userScore;
  });

  // Display high scores using forEach loop and appendChild
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
