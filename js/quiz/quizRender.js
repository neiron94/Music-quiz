import { getCurrentQuiz } from '../global.js';
import { showSection } from '../sectionShowHide.js';

export function startQuizRender() {
    renderQuizUI();
}

// Cache DOM elements
const quizSection = document.getElementById("quiz");
const quizImage = document.getElementById("quiz-image");
const imageCaption = document.getElementById("image-caption");
const replayButton = document.getElementById("replay-button");
const replayCounter = document.getElementById("replay-counter");
const questionCounter = document.getElementById("question-counter");
const correctCounter = document.getElementById("correct-counter");
const answerButtons = document.querySelectorAll(".answer-button");
const resultsText = document.getElementById("results-text");

// Attach event listener to replay button
replayButton.addEventListener("click", () => {
    const quiz = getCurrentQuiz();
    const question = quiz.questions[quiz.currentQuestionIndex];
    if (question.replays < quiz.maxReplays) {
        playAudio(question.audio);
        question.replays++;
        renderReplayCounter();
    }
});

// Attach event listener to answer buttons
answerButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => handleAnswer(index));
});

function renderReplayCounter() {
    const quiz = getCurrentQuiz();
    const question = quiz.questions[quiz.currentQuestionIndex];
    replayCounter.textContent = `Replays: ${question.replays} / ${quiz.maxReplays}`;
}

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}

function renderQuizUI() {
    const quiz = getCurrentQuiz();
    const question = quiz.questions[quiz.currentQuestionIndex];

    showSection('quiz-section');

    // Set image
    quizImage.src = question.image || "static/img/placeholder.svg";
    imageCaption.textContent = "";

    // Set counters
    questionCounter.textContent = `Question: ${quiz.currentQuestionIndex + 1} / ${quiz.questions.length}`;
    correctCounter.textContent = `Correct: ${quiz.correctAnswersCount}`;
    replayCounter.textContent = `Replays: ${question.replays} / ${quiz.maxReplays}`;

    // Set answer options
    answerButtons.forEach((btn, i) => {
        btn.textContent = question.options[i] || "";
    });
}

function handleAnswer(selectedIndex) {
    const quiz = getCurrentQuiz();
    const question = quiz.questions[quiz.currentQuestionIndex];

    if (selectedIndex === question.correctOptionIndex) {
        quiz.correctAnswersCount++;
    }

    quiz.currentQuestionIndex++;

    if (quiz.currentQuestionIndex < quiz.questions.length) {
        renderQuizUI();
    } else {
        resultsText.textContent = `You answered ${getCurrentQuiz().correctAnswersCount} out of ${getCurrentQuiz().questions.length} correctly.`;
        showSection('results-section');
    }
}
