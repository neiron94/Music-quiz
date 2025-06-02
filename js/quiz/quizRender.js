import {getCurrentQuiz} from '../model/global.js';
import {stopPlayingAudio} from "./audioPlayer.js";

const quizImage = document.getElementById("quiz-image");
const replayButton = document.getElementById("replay-button");
const replayCounter = document.getElementById("replay-counter");
const questionCounter = document.getElementById("question-counter");
const correctCounter = document.getElementById("correct-counter");
const answerButtons = document.querySelectorAll(".answer-button");
const resultsText = document.getElementById("results-text");
const nextQuestionButton = document.getElementById("next-question");

export function renderQuizUI() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    // Activate replay button
    if (question.replays < quiz.maxReplays)
        replayButton.classList.add('active');

    // Set image
    quizImage.src = "static/img/svg/question.svg";
    quizImage.dataset.swapSrc = question.image || "static/img/svg/placeholder.svg";
    if (question.answered) {
        [quizImage.src, quizImage.dataset.swapSrc] = [quizImage.dataset.swapSrc, quizImage.src];
        nextQuestionButton.classList.add('active');
        renderAnsweredState();
    }

    // Render counters
    renderQuestionCounter();
    renderCorrectCounter();
    renderReplayCounter();

    // Set answer options
    answerButtons.forEach((btn, i) => {
        btn.textContent = question.options[i] || "";
        btn.dataset.index = i.toString();
    });
}

export function renderAnsweredState() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    // Paint answer buttons
    answerButtons.forEach(btn => {
        if (btn.dataset.index === question.correctOptionIndex.toString())
            btn.classList.add('correct');
        else
            btn.classList.add('incorrect');
    });

    // Disable replay button (answer buttons are already disabled by correct / incorrect)
    replayButton.classList.add('disable');
}

export function resetAnsweredQuiz() {
    // Hide next question button
    nextQuestionButton.classList.remove('active');

    // Stop audio
    stopPlayingAudio();

    // Reset flip
    quizImage.style.transition = '';
    quizImage.style.transform = '';
    [quizImage.src, quizImage.dataset.swapSrc] = [quizImage.dataset.swapSrc, quizImage.src];

    // Enable replay button
    replayButton.classList.remove('disable');

    // Enable and paint answer buttons
    answerButtons.forEach(btn => {
        btn.classList.remove('correct');
        btn.classList.remove('incorrect');
    });
}

export function renderResultsText() {
    const quiz = getCurrentQuiz();
    resultsText.textContent = `You answered ${quiz.correctAnswersCount} out of ${quiz.questions.length} correctly.`;
}

export function renderQuestionCounter() {
    const quiz = getCurrentQuiz();
    questionCounter.textContent = `Question: ${quiz.currentQuestionIndex + 1} / ${quiz.questions.length}`;

}

export function renderCorrectCounter() {
    const quiz = getCurrentQuiz();
    correctCounter.textContent = `Correct: ${quiz.correctAnswersCount}`;
}

export function renderReplayCounter() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();
    replayCounter.textContent = `Replays: ${question.replays} / ${quiz.maxReplays}`;
}
