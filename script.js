const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "London", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Trainer Markup Language", correct: false }
    ]
  },
  {
    question: "Which tag is used to define a paragraph in HTML?",
    answers: [
      { text: "<p>", correct: true },
      { text: "<div>", correct: false },
      { text: "<span>", correct: false },
      { text: "<para>", correct: false }
    ]
  },
  {
    question: "Which property is used to change text color in CSS?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "font-style", correct: false }
    ]
  },
  {
    question: "Which language is used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "Which of these is a JavaScript framework?",
    answers: [
      { text: "Laravel", correct: false },
      { text: "React", correct: true },
      { text: "Django", correct: false },
      { text: "Flask", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in CSS?",
    answers: [
      { text: "// comment", correct: false },
      { text: "/* comment */", correct: true },
      { text: "<!-- comment -->", correct: false },
      { text: "# comment", correct: false }
    ]
  },
  {
    question: "Which tag is used for line breaks in HTML?",
    answers: [
      { text: "<br>", correct: true },
      { text: "<lb>", correct: false },
      { text: "<break>", correct: false },
      { text: "<hr>", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false }
    ]
  }  
];

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const quizContainer = document.querySelector('.quiz-container');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  startButton.style.display = 'none';
  quizContainer.style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = 'Next';
  resultContainer.classList.add('hide');
  nextButton.style.display = 'none';
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  nextButton.style.display = 'none';
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('wrong');
  }
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
  });
  nextButton.style.display = 'inline-block';
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.innerHTML = '';
  resultContainer.classList.remove('hide');
  resultContainer.innerText = `You scored ${score} out of ${questions.length}`;
  nextButton.innerText = 'Restart';
  nextButton.style.display = 'inline-block';
  nextButton.onclick = startQuiz;
}

startButton.addEventListener('click', startQuiz);