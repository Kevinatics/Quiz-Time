const startBtn = document.getElementById('startBtn');
const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('timeLeft');
const gameOverEl = document.getElementById('gameOver');
const initialsEl = document.getElementById('initials');
const saveScoreBtn = document.getElementById('saveScoreBtn');

let questions = [
    {
        question: "What does HTML stand for?",
        answers: ['Hyper Text Markup Language','Hyperlink and Text Markup Language','High Tech Modern Language','Hyper Transfer Markup Language', ],
        correctAnswer: 0
    },
    {
        question: "Which programming language is often used for front-end web development?",
        answers: ['Java', 'Python', 'JavaScript', 'Ruby'],
        correctAnswer: 2
        
    },
    {
        question: "What does CSS stand for?",
        answers: ['Cascading Style Sheet', 'Computer Style Sheet', 'Creative Style Sheet', 'Colorful Style Sheet'],
        correctAnswer: 0
        
    },
    {
        question: "In JavaScript, which keyword is used to declare a variable?",
        answers: ['variable', 'let', 'const', 'var'],
        correctAnswer: 3
    },
    {
        question: "Which JavaScript method is used to store data in the client's local storage?",
        answers: ['setLocalData()', 'storeDataLocally()', 'setItem()', 'saveToLocalStorage()'],
        correctAnswer: 2
        },
    // Added more questions here...
];


let currentQuestionIndex = 0;
let timeLeft = 100;
let timer;

startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none';
    questionContainer.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
    displayQuestion();
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        answersEl.innerHTML = '';
        currentQuestion.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.textContent = answer;
            btn.addEventListener('click', () => checkAnswer(index));
            answersEl.appendChild(btn);
        });
    } else {
        // User has completed all questions
        endGame();
    }
}

function checkAnswer(answerIndex) {
    if (answerIndex !== questions[currentQuestionIndex].correctAnswer) {
        timeLeft -= 10;  // penalize for wrong answer
    }

    currentQuestionIndex++;

    displayQuestion(); // Move to the next question or end the game
}

function endGame() {
    clearInterval(timer);
    questionContainer.style.display = 'none';
    gameOverEl.style.display = 'block';
}

saveScoreBtn.addEventListener('click', saveScore);

function saveScore() {
    const initials = initialsEl.value;
    const score = timeLeft;
    localStorage.setItem('initials', initials);
    localStorage.setItem('score', score);
    // Save initials and score to local storage 
}
//highscore code

let highScore = localStorage.getItem('highScore') || 0; // Load the high score from local storage or set to 0 if not available



function endGame() {
    clearInterval(timer);
    questionContainer.style.display = 'none';
    gameOverEl.style.display = 'block';

    // Display the high score
    document.getElementById('highScore').textContent = highScore;
}

// Restart the quiz
document.getElementById('restartBtn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    timeLeft = 100;
    clearInterval(timer);
    timerEl.textContent = timeLeft;
    startGame();
});

// Save the high score
function saveScore() {
    const initials = initialsEl.value;
    const score = timeLeft;
    
    // Check if the current score is higher than the existing high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    
    localStorage.setItem('initials', initials);
    localStorage.setItem('score', score);
}

