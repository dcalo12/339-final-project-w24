document.addEventListener('DOMContentLoaded', function() {
    nextButton.classList.add('hide');
  });
  
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const qContainer = document.getElementById('question-container');
  const q = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  const quizApp = document.getElementById('quiz-app');
  const results = document.createElement('div');
  results.setAttribute('id', 'results');
  results.classList.add('results', 'hide');
  quizApp.appendChild(results);
  
  let shuffle, QuestionNum;
  let score = 0;
  
  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', function() {
    QuestionNum++;
    setNextQuestion();
  });
  
  function startGame() {
    startButton.classList.add('hide');
    shuffle = questions.sort(function() {
        Math.random() - .5
    });
    QuestionNum = 0;
    qContainer.classList.remove('hide');
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffle[QuestionNum]);
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function showQuestion(question) {
    q.innerText = question.question;
    question.answers.forEach(function(answer) {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', function() { 
            selectAnswer(button)
        });
        answerButtons.appendChild(button);
    });
  }
  
  function selectAnswer(selectedButton) {
    Array.from(answerButtons.children).forEach(function(button) {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });
  
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
  
    setTimeout(function() {
        if (shuffle.length > QuestionNum + 1) {
            nextButton.classList.remove('hide');
        } else {
            concludeQuiz();
        }
    }, 1000);
   
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  function concludeQuiz() {
    qContainer.classList.add('hide');
    nextButton.classList.add('hide');
  
    results.classList.remove('hide');
    results.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${shuffle.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
    if ((score == 0) || (score == 1) || (score == 2)) {
        results.innerHTML += "<p>Read some more on the site and try again!</p>"
    }
    if ((score == 3) || (score == 4)) {
        results.innerHTML += "<p>Keep at it!</p>"
    }
    if ((score == 5) || (score == 6)) {
        results.innerHTML += "<p>Nice job, give it another go!</p>"
    }
    if ((score == 7) || (score == 8)) {
        results.innerHTML += "<p>Good job!</p>"
    }
    if (score == 9) {
        results.innerHTML += "<p>Great job!</p>"
    }
    if (score == 10) {
        results.innerHTML += "<p>Perfect score!!!</p>"
    }
    quizApp.appendChild(results);
  }
  
  function restartQuiz() {
    results.classList.add('hide');
    score = 0;
    QuestionNum = 0;
    startGame();
  }
  
  const questions = [
    {
        question: "What does 'Megami Tensei' roughly translate to in English?",
        answers: [
            { text: "Huge Revival", correct: false },
            { text: "Reincarnation of the Goddess", correct: true },
            { text: "Large Rebirth", correct: false },
            { text: "Gods and Demons", correct: false }
        ]
    },
    {
        question: "What is the common name for the monsters, devils, angels, and other assorted creatures featured in this franchise?",
        answers: [
            { text: "Summons", correct: false },
            { text: "Familiars", correct: false },
            { text: "Pokemon", correct: false },
            { text: "Demons", correct: true }
        ]
    },
    {
        question: "Which of the following is NOT a series in the Megami Tensei ranchise?",
        answers: [
            { text: "Digital Devil Saga", correct: false },
            { text: "Devil Summoner", correct: false },
            { text: "Devil Busters", correct: true },
            { text: "Devil Survivor", correct: false }
        ]
    },
    {
        question: "Which of the following is the name of a fire magic attack?",
        answers: [
            { text: "Blaze", correct: false },
            { text: "Agi", correct: true },
            { text: "Firaga", correct: false },
            { text: "Burn", correct: false }
        ]
    },
    {
        question: "Which game series allows you to control demons?",
        answers: [
            { text: "Shin Megami Tensei", correct: false },
            { text: "All options shown", correct: true },
            { text: "Devil Summoner", correct: false },
            { text: "Digital Devil Story: Megami Tensei", correct: false }
        ]
    },
    {
        question: "Which of the following games has a sequel or sequels that pick up their story?",
        answers: [
            { text: "Shin Megami Tensei: Digital Devil Saga", correct: true },
            { text: "Catherine", correct: false },
            { text: "Maken X", correct: false },
            { text: "Shin Megami Tensei: Persona 3", correct: false }
        ]
    },
    {
        question: "What is the name of the battle system in modern 'Shin Megami Tensei' titles?",
        answers: [
            { text: "Smirk", correct: false },
            { text: "Advantage", correct: false },
            { text: "Press-Turn", correct: true },
            { text: "One More", correct: false }
        ]
    },
    {
        question: "About how many games are in this franchise? (Select a range)",
        answers: [
            { text: "30-39", correct: false },
            { text: "40-49", correct: false },
            { text: "50-59", correct: true },
            { text: "60-69", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT the name of a protagonist in this franchise?",
        answers: [
            { text: "Ringo", correct: false },
            { text: "Kiryu", correct: true },
            { text: "Flynn", correct: false },
            { text: "Serph", correct: false }
        ]
    },
    {
        question: "What game spawned the franchise as it's known today?",
        answers: [
            { text: "Revelations: Persona", correct: false },
            { text: "Devil Survivor", correct: false },
            { text: "Digital Devil Story: Megami Tensei", correct: true },
            { text: "Ray Gigant", correct: false }
        ]
    }
  ];