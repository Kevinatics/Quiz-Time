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
        question: "What's the capital of France?",
        answers: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 1
    },
    // ... more questions
];

let currentQuestionIndex = 0;
let timeLeft = 100;
let timer;

startBtn.addEventListener('click', startGame);
