const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "What does JS stand for?",
    answers: [
      { text: "Java System", correct: false },
      { text: "JavaScript", correct: true },
      { text: "JustScript", correct: false },
      { text: "JScript", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreText = document.getElementById("score");
const summaryList = document.getElementById("summary");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let summary = [];

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  summary = [];
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextButton.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  answerButtons.innerHTML = "";
}

function selectAnswer(button, answer) {
  const correct = answer.correct;
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
      btn.classList.add("correct");
    }
  });

  summary.push({
    question: questions[currentQuestionIndex].question,
    correct: correct
  });

  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  scoreText.textContent = `Your Score: ${score} / ${questions.length}`;

  summaryList.innerHTML = "";
  summary.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>Q${index + 1}:</strong> ${item.question} — ${
      item.correct ? "<span style='color:green;'>✔ Correct</span>" : "<span style='color:red;'>✖ Wrong</span>"
    }`;
    summaryList.appendChild(li);
  });
}

restartButton.addEventListener("click", startQuiz);
