`use strict`;

const questionArray2 = [
  {
    id: `0`,
    question: `33 + 48?`,
    options: [`71`, `81`, `82`, `71`],
    correct: `81`,
  },

  {
    id: `1`,
    question: `11 x 21?`,
    options: [`232`, `231`, `211`, `231`],
    correct: `231`,
  },

  { 
    id: `2`,
    question: `0 - 55?`,
    options: [`-55`, `-56`, `-53`, `-54`],
    correct: `-55`,
  },

  {
    id: `3`,
    question: `55 / 5?`,
    options: [`10`, `9`, `11`, `12`],
    correct: `11`,
  },

  {
    id: `4`,
    question: `101 + 1000?`,
    options: [`1010`, `1101`, `1100`, `101000`],
    correct: `1101`,
  },

  {
    id: `5`,
    question: `99 / 4.5?`,
    options: [`22`, `23`, `24`, `21`],
    correct: `22`,
  },
]

const questionArray = [
  {
    id: `0`,
    question: `Which keyword is used to create an error?`,
    options: [`catch`, `throw`, `exception`, `error`],
    correct: `throw`,
  },

  {
    id: `1`,
    question: `Which collection object allows unique value to be inserted only once?`,
    options: [`Object`, `Array`, `Set`, `Map`],
    correct: `Set`,
  },

  {
    id: `2`,
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
    id: `3`,
    question: `Which of these is a valid variable name?`,
    options: [`5thBirthday`, `New`, `lastName`, `first name`],
    correct: `lastName`,
  },

  {
    id: `4`,
    question: `What statement can be used to skip an iteration in a loop?`,
    options: [`continue`, `skip`, `break`, `pass`],
    correct: `continue`,
  },

  {
    id: `5`,
    question: `Which statement can take a single expression as input and then look through a number of choices until one that matches that value is found?`,
    options: [`else if`, `for`, `when`, `switch`],
    correct: `switch`,
  },
  {
    id: `6`,
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
    id: `7`,
    question: `Which of the following value is not falsy?`,
    options: [`[ ]`, `null`, `0`, `undefined`],
    correct: `[ ]`,
  },

  {
    id: `8`,
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
    id: `9`,
    question: `Which property references the DOM object that dispatched an event?`,
    options: [`target`, `event`, `object`, `addEventListener`],
    correct: `target`,
  },
];

const startButton = document.querySelector(`#start-button`);
const nextButton = document.querySelector(`#next-button`);
const restartButton = document.querySelector(`#restart-button`);

const startContainer = document.querySelector(`#start-container`);
const questionContainer = document.querySelector(`#question-container`);
const scoreContainer = document.querySelector(`#score-container`);

const answerBox = document.querySelector(`#answer-box`);
const questionBox = document.querySelector(`#question-box`);
const scoreBox = document.querySelector(`#score-box`);

const numberOfQuestion = document.querySelector(`#number-of-question`);
const questionText = document.querySelector(`#question`);

const highScoreBoard = document.querySelector(`#high-score-board`);
const score = document.querySelector(`#score`);
const timeLeft = document.querySelector(`#time-left`);
const scoreText = document.querySelector(`#score-text`);
const rightOrWrong = document.querySelector(`#right-or-wrong`);

let scoreCount = 0;
let count = 179;
let countdown;
let newArray;
let i = 0;

window.onload = () => {
  startContainer.classList.remove(`hide`);
  questionContainer.classList.add(`hide`);
  scoreContainer.classList.add(`hide`);
  nextButton.classList.add(`hide`);
  restartButton.classList.add(`hide`);
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

function displayHighScores() {
  let key = `highScores`;
  let highScores = JSON.parse(localStorage.getItem(key)) || [];

  highScores.sort((a, b) => {
    return b.userTime.localeCompare(a.userTime);
  });

  highScores.forEach((score) => {
    let newUser = document.createElement(`li`);
    newUser.textContent = `${score.userInitials} - ${score.userScore} - ${score.userTime}`;
    highScoreBoard.appendChild(newUser);
  });
}

nextButton.addEventListener(`click`, () => {
  rightOrWrong.innerHTML = ``;
  nextButton.classList.add(`disable`);

  if (questionCount < questionArray2.length + 1) {
    getQuestion();
  } else if (questionCount === questionArray2.length + 1) {
    questionContainer.classList.add(`hide`);
    scoreContainer.classList.remove(`hide`);
    scoreText.innerHTML = `You scored ${scoreCount} out of ${questionArray2.length} with ${timeLeft.innerHTML} left.`;
    nextButton.classList.add(`hide`);
    restartButton.classList.remove(`hide`);
    const saveScore = confirm(`Do you want to save your score?`);

    if (saveScore) {
      const userInitials = prompt(`Enter your initials:`);
      const userScore = scoreCount;
      const userTime = timeLeft.innerHTML;
      const key = `highScores`;
      const highScores = JSON.parse(localStorage.getItem(key)) || [];
      highScores.push({ userInitials, userScore, userTime });
      localStorage.setItem(key, JSON.stringify(highScores));
      const newUser = document.createElement(`li`);
      newUser.textContent = `${userInitials} - ${userScore} - ${userTime}`;
      highScoreBoard.appendChild(newUser);
      clearInterval(countdown);
    }
  }
});

// Call the function to display high scores after page load
window.addEventListener(`load`, () => {
  displayHighScores();
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
      timeLeft.innerHTML = `00:00`
      questionContainer.classList.add(`hide`);
      scoreContainer.classList.remove(`hide`);
      scoreText.innerHTML = `You scored ${scoreCount} out of ${questionArray2.length} with no time left.`;
      nextButton.classList.add(`hide`);
      restartButton.classList.remove(`hide`);
      const saveScore = confirm(`Do you want to save your score?`);

      if (saveScore) {
        const userInitials = prompt(`Enter your initials:`);
        const userScore = scoreCount;
        const userTime = timeLeft.innerHTML;
        const key = `highScores`;
        const highScores = JSON.parse(localStorage.getItem(key)) || [];
        highScores.push({ userInitials, userScore, userTime });
        localStorage.setItem(key, JSON.stringify(highScores));
        const newUser = document.createElement(`li`);
        newUser.textContent = `${userInitials} - ${userScore} - ${userTime}`;
        highScoreBoard.appendChild(newUser);
        clearInterval(countdown);
      }
      clearInterval(countdown);
    }
  }, 1000);
};

// Get Question and Options:

function getRandomQuestion() {
  nextButton.classList.add(`disable`);
  questionArray2.sort(() => Math.random() - 0.5);
}

function getQuestion() {
  numberOfQuestion.innerHTML = `${questionCount} of ${questionArray2.length} QUESTIONS`;
  let { id, question, options, correct } = questionArray2[i];
  questionText.innerHTML = question;
  options.sort(() => Math.random() - 0.5);
  answerBox.innerHTML = options
    .map((option) => {
      return `<button class='answerButtons' onClick='checker(this)'>${option}</button>`;
    })
    .join("");
}

function checker(userOption) {
  const selectedOption = userOption.innerHTML;
  const filterQuestion = questionArray2.some(
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

function disableAnswerButtons() {
  const answerButtons = document.querySelectorAll(`.answerButtons`);
  answerButtons.forEach((button) => {
    button.classList.add(`disable`);
  });
}

function makeTimerBlink() {
  timeLeft.classList.add(`time-deduction`);
  setTimeout(() => {
    timeLeft.classList.remove(`time-deduction`);
  }, 600);
}

function makeScoreBlink() {
  score.classList.add(`score-addition`);
  setTimeout(() => {
    score.classList.remove(`score-addition`);
  }, 600);
}
