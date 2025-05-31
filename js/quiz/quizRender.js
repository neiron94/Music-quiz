import { getCurrentQuiz } from '../global.js';
import { showSection } from '../sectionShowHide.js';

export function startQuizRender() {
    renderQuizUI();
}

const quizImage = document.getElementById("quiz-image");
const replayButton = document.getElementById("replay-button");
const replayCounter = document.getElementById("replay-counter");
const questionCounter = document.getElementById("question-counter");
const correctCounter = document.getElementById("correct-counter");
const answerButtons = document.querySelectorAll(".answer-button");
const resultsText = document.getElementById("results-text");
const nextQuestionButton = document.getElementById("next-question");

let playingAudio = null;

// Attach event listener to replay button
replayButton.addEventListener("click", () => {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    if (!replayButton.classList.contains('animate') &&
        !replayButton.classList.contains('disable') &&
        question.replays < quiz.maxReplays) {
        playAudio();
    }
});

// Attach event listener to answer buttons
answerButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (!btn.classList.contains('correct') &&
            !btn.classList.contains('incorrect')) {
            handleAnswer(index);
        }
    });
});

// Attach event listener to next question button
nextQuestionButton.addEventListener("click", () => {
    // Reset
    resetAnsweredQuiz();

    // Next question
    const quiz = getCurrentQuiz();
    quiz.currentQuestionIndex++;

    if (quiz.currentQuestionIndex < quiz.questions.length) {
        renderQuizUI();
    } else {
        resultsText.textContent = `You answered ${getCurrentQuiz().correctAnswersCount} out of ${getCurrentQuiz().questions.length} correctly.`;
        showSection('results-section');
    }
});

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

function playAudio() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    const audio = new Audio(question.audio);
    audio.play().then( _ => {
        playingAudio = audio;
        replayButton.classList.add('animate');
    });
    audio.addEventListener('ended', () => {
        replayButton.classList.remove('animate');
        question.replays++;
        if (question.replays === parseInt(quiz.maxReplays))
            replayButton.classList.remove('active');
        renderReplayCounter();
        playingAudio = null;
    });
}

function renderQuizUI() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    // Activate replay button
    if (question.replays < quiz.maxReplays)
        replayButton.classList.add('active');

    showSection('quiz-section');

    // Set image
    quizImage.src = "static/img/svg/question.svg";
    quizImage.dataset.swapSrc = question.image || "static/img/svg/placeholder.svg";

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

function renderQuestionCounter() {
    const quiz = getCurrentQuiz();
    questionCounter.textContent = `Question: ${quiz.currentQuestionIndex + 1} / ${quiz.questions.length}`;

}

function renderCorrectCounter() {
    const quiz = getCurrentQuiz();
    correctCounter.textContent = `Correct: ${quiz.correctAnswersCount}`;
}

function renderReplayCounter() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();
    replayCounter.textContent = `Replays: ${question.replays} / ${quiz.maxReplays}`;
}

function stopPlayingAudio() {
    if (playingAudio !== null) {
        playingAudio.pause();
        playingAudio.currentTime = 0;
        playingAudio.dispatchEvent(new Event('ended'));
        playingAudio = null;
    }
}

function handleAnswer(selectedIndex) {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    // Stop audio
    stopPlayingAudio();

    // Increment correct answers
    let resultSound = 'static/audio/fail.mp3';
    if (selectedIndex === question.correctOptionIndex) {
        resultSound = 'static/audio/success.mp3';
        quiz.correctAnswersCount++;
        renderCorrectCounter();
    }

    // Play result sound, then play full song and show next button
    playingAudio = new Audio(resultSound);
    playingAudio.play();
    playingAudio.addEventListener('ended', () => {
        setTimeout(() => {
            playingAudio = new Audio(question.fullAudio);
            playingAudio.play();
            playingAudio.addEventListener('ended', () => {
                playingAudio = null;
            });
            nextQuestionButton.classList.add('active');
        }, 250);
    })

    // Paint answer buttons
    answerButtons.forEach(btn => {
        if (btn.dataset.index === question.correctOptionIndex.toString())
            btn.classList.add('correct');
        else
            btn.classList.add('incorrect');
    });

    // Disable replay button (answer buttons are already disabled by correct / incorrect)
    replayButton.classList.add('disable');

    // Flip image
    quizImage.style.transition = 'transform 2s linear';
    quizImage.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        [quizImage.src, quizImage.dataset.swapSrc] = [quizImage.dataset.swapSrc, quizImage.src];
    }, 1000); // half of 2s (transition duration)
}
