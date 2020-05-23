const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// get an array of high scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// maximum number of high scores saved
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();

  // saves username data
  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
  };
  // pushes and sorts high scores and cuts off low scores
  highScores.push(score);
  // sorting retrieved from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  // stores highScores in local storage as a string with stringify
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};