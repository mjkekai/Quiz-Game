let timer;
let time = 10;
let qCount = 0;
let score = 0;

//define questions array of obj
const questions = [
  {
    title: "What does HTMl stand for?",
    choices: ["Hyper Tag Markup Language", "Hyper Text Markup Language", "Hyperlinks Text Mark Language", "Hyperlinking Text Marking Language"],
    answer: "Hyper Text Markup Language",
  },
  {
    title: "The web is based on...",
    choices: ["Images", "Text", "Information", "HTML"],
    answer: "HTML",
  },
  {
    title: "What does JS stand for?",
    choices: ["Java Sauce", "Java Script", "Jeva Script", "Jazzy Style"],
    answer: "Java Script",
  },
  {
    title: "What is the correct tag for the largest heading? ",
    choices: ["head", "script", "h1", "h6"],
    answer: "h1",
  },
];

document.querySelector("#startButton").addEventListener("click", () => {
  //hide the start container
  document.querySelector("#start-container").classList.add("hidden");
  //show the question container
  document.querySelector("#game-container").classList.remove("hidden");
  //start the timer
  timer = setInterval(() => {
    //decrease the time value
    time--;
    //show the time time on the ui
    document.querySelector("#timer").textContent = time;
    //check if time is end
    if (time === 0) {   
      endGame();
      alert("You're out of time!");
      clearInterval(timer)
    }
  }, 1000);
  //generate the next question
  createQuestion();
});

const createQuestion = () => {
  //get question current questions
  const currentQ = questions[qCount];
  //create a template
  const template = `
        <div class="questions">${currentQ.title}</div>
        <div class="answers-container">
            <div class="answers">${currentQ.choices[0]}</div>
            <div class="answers">${currentQ.choices[1]}</div>
            <div class="answers">${currentQ.choices[2]}</div>
            <div class="answers">${currentQ.choices[3]}</div>
        </div>
    `;
  //convert template into a html and insert into page
  document.querySelector("#game-container").innerHTML = template;
};

document.querySelector("#game-container").addEventListener("click", (event) => {
  if (event.target.className.includes("answers")) {
    //check if the answer is correct
    if (event.target.textContent === questions[qCount].answer) {
      score++
      time += 5
    } else {
      time -= 5
    }
    //show the next question
    qCount++
    if (qCount === questions.length) {
        endGame()
    } else {
        createQuestion()
    }
  }
});

const endGame = () => {
    //hide the qistion container
    document.querySelector("#game-container").classList.add("hidden");
    //show the end screen
    document.querySelector("#end-container").classList.remove("hidden");
    //show the score
    document.querySelector("#displayScore").textContent = score;
}

document.querySelector("#submitID").addEventListener("click", () => {
    //get the value from the input
    const initials = document.querySelector("#initials").value
    //get the old data from the local if it exists
    const data = JSON.parse(localStorage.getItem("data")) || [];
    //construct a new data entry
    const newDataEntry = {
        name: initials,
        score: score,
    }
    //update the old data with new entry
    data.push(newDataEntry);
    //save the updated data on local
    localStorage.setItem("data",JSON.stringify(data));
});

const data = JSON.parse(localStorage.getItem("data")) || [];
let template = "";
data.forEach(datum => {
    template += `
        <div>
            <span>Initials: ${datum.name}</span>
            <span>score: ${datum.score}</span>
        </div>
    `;
});
document.querySelector("#scoreCount").innerHTML = template;