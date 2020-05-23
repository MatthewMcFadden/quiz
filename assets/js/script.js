const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

// quiz bank in an array
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choice1: "The <body> section",
    choice2: "Both the <head> section and the <body> section",
    choice3: "The <head> section",
    choice4: "A different place altogether",
    answer: 2
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choice1: "if i == 5 then",
    choice2: "if i = 5",
    choice3: "if (i == 5) ",
    choice4: "if i = 5 then",
    answer: 3
  },
  {
    question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    choice1: "if (i != 5)",
    choice2: "if (i <> 5)",
    choice3: "if i <> 5",
    choice4: "if i =! 5 then",
    answer: 1
  },
  {
    question: "How does a WHILE loop start?",
    choice1: "while i = 1 to 10",
    choice2: "while (i <= 10)  ",
    choice3: "while (i <= 10; i++)",
    choice4: "while (1 < i < 10)",
    answer: 2
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    choice1: 'var colors = (1:"red", 2:"green", 3:"blue")',
    choice2: 'var colors = "red", "green", "blue"',
    choice3: 'var colors = ["red", "green", "blue"]',
    choice4: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
    answer: 3
  }
];
// Questions referenced from W3Schools JavaScript quiz


const CORRECT_BONUS = 10; // get 10 points for getting an answer correct
const MAX_QUESTIONS = 8;

startQuiz = () => {
  // starts question number at 0
  questionCounter = 0;
  // starts score at 0
  score = 0;
  // choses a question from the array above and puts it into this new array
  availableQuesions = [...questions];
  getNewQuestion(); // performs the "getNewQuestion function below"
  setTimeout(function(){ timer.value = "60 seconds" }, 60000);
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }
  
  // increase the question counter by 1
  questionCounter++;
  //question counter display
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  // randomly pick a question from the array
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // orders the choices in a question
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // apply feedback on whether the answer was correct or incorrect
    const classToApply =
      // assigns the values of correct or incorrect
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // if answer is correct add 10 to the score
    if(classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    // applies the correct or incorrect class
    selectedChoice.parentElement.classList.add(classToApply);

    // removes the correct/incorrect class when moving on to the next question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000); // removes after 1 second
  });
});


// increases score by  for each correct answer
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();