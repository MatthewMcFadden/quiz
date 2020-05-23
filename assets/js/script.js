var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// my quiz question bank
var myQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      1.: "<javascript>",
      2.: "<scripting>",
      3.: "<js>",
      4.: "<script>"
    },
    correctAnswer: "4."
  },
  {
    question: "Where is the correct place to insert JavaScript into HTML?",
    answers: {
      1.: "The <body> section",
      2.: "The <head> section",
      3.: "Both the <head section and the <body> section"
    },
    correctAnswer: "3."
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    answers: {
      1.: '<script href="xxx.js">',
      2.: '<script src="xxx.js">',
      3.: '<script name="xxx.js">'
    },
    correctAnswer: "2."
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: {
      1.: "function myFunction()",
      2.: "function:myFunction()",
      3.: "function = myFunction()"
    },
    correctAnswer: "1."
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    answers: {
      1.: "if i = 5",
      2.: "if i==5 then",
      3.: "if (i==5)",
      4.: "if (i===5)"
    },
    correctAnswer: "3."
  }
];


function buildQuiz(){
  // variable to store the HTML output
  var output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      var answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}


function showResults(){

  // gather answer containers from our quiz
  var answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);