document.addEventListener("DOMContentLoaded", function () {
  const startScreen = document.querySelector(".start-screen");
  const quizScreen = document.querySelector(".quiz");
  const endScreen = document.querySelector(".end-screen");
  const startButton = document.querySelector(".start");
  const nextButton = document.querySelector(".next");
  const submitButton = document.querySelector(".submit");
  const restartButton = document.querySelector(".restart");
  const questionNumber = document.querySelector(".number span.current");
  const totalQuestions = document.querySelector(".number span.total");
  const questionText = document.querySelector(".question");
  const answerWrapper = document.querySelector(".answer-wrapper");
  const finalScore = document.querySelector(".final-score");
  const progressBar = document.querySelector(".progress-bar");
  const progressText = document.querySelector(".progress-text");

  let currentQuestionIndex = 0;
  let score = 0;
  let timePerQuestion = 10;
  let timer;
  let timeLeft;

  const questions = [
    {
      question: "What is the capital of Japan?",
      answers: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      correctAnswer: "Tokyo",
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      answers: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "Who is the author of 'To Kill a Mockingbird'?",
      answers: ["J.K. Rowling", "Harper Lee", "George Orwell", "Ernest Hemingway"],
      correctAnswer: "Harper Lee",
    },
    {
      question: "What is the largest mammal in the world?",
      answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "Which year did World War II end?",
      answers: ["1943", "1945", "1950", "1939"],
      correctAnswer: "1945",
    },
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startQuiz() {
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    totalQuestions.textContent = questions.length;
    loadQuestion();
  }

  function startTimer() {
    timeLeft = timePerQuestion;
    timer = setInterval(function () {
      updateTimer();
      if (timeLeft === 0) {
        submitAnswer();
      }
    }, 1000);
  }

  function updateTimer() {
    progressBar.style.width = ((timePerQuestion - timeLeft) / timePerQuestion) * 100 + "%";
    progressText.textContent = `${timeLeft}s`;
    timeLeft--;
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionNumber.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;

    shuffleArray(currentQuestion.answers);

    answerWrapper.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
      const answerElement = document.createElement("div");
      answerElement.classList.add("answer");
      answerElement.innerHTML = `
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      `;
      answerElement.addEventListener("click", () => selectAnswer(index));
      answerWrapper.appendChild(answerElement);
    });

    submitButton.disabled = true;
    startTimer();
  }

  function selectAnswer(index) {
    const selectedAnswer = answerWrapper.children[index];
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    answerWrapper.querySelectorAll(".answer").forEach((answer) => answer.classList.remove("selected"));
    selectedAnswer.classList.add("selected");

    submitButton.disabled = false;
  }

  function submitAnswer() {
    stopTimer();
    const selectedAnswer = answerWrapper.querySelector(".selected");
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer && selectedAnswer.querySelector(".text").innerText === correctAnswer) {
      score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }

  function calculateResult() {
    const totalQuestions = questions.length;
    const resultScore = (score / totalQuestions) * 10;
    return resultScore.toFixed(2);
  }

  function endQuiz() {
    quizScreen.classList.add("hide");
    endScreen.classList.remove("hide");

    const resultScore = calculateResult();
    finalScore.textContent = `${resultScore}%`;
  }

  function restartQuiz() {
    startScreen.classList.remove("hide");
    endScreen.classList.add("hide");

    currentQuestionIndex = 0;
    score = 0;

    startQuiz();
  }

  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  });
  submitButton.addEventListener("click", submitAnswer);
  restartButton.addEventListener("click", restartQuiz);
});
