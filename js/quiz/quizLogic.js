import {getCurrentQuiz, setCurrentQuiz} from "../model/global.js";
import {playAnswerSound} from "./audioPlayer.js";
import {renderAnsweredState, renderCorrectCounter} from "./quizRender.js";

const answerButtons = document.querySelectorAll(".answer-button");
const quizImage = document.getElementById("quiz-image");

export function setUpQuizLogic() {
    // Answer buttons
    answerButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (!btn.classList.contains('correct') &&
                !btn.classList.contains('incorrect')) {
                handleAnswer(index);
            }
        });
    });
}

function handleAnswer(selectedIndex) {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    // Set answered
    question.answered = true;
    setCurrentQuiz(quiz);

    // Check correctness
    let resultSound = 'static/audio/fail.mp3';
    if (selectedIndex === question.correctOptionIndex) {
        resultSound = 'static/audio/success.mp3';
        quiz.correctAnswersCount++;
        setCurrentQuiz(quiz);
        renderCorrectCounter();
    }

    // Play result sound, then play full song and show next button
    playAnswerSound(resultSound);

    // Render answered state
    renderAnsweredState();

    // Flip image
    quizImage.style.transition = 'transform 1s linear';
    quizImage.style.transform = 'rotateY(90deg)';
    setTimeout(() => {
        [quizImage.src, quizImage.dataset.swapSrc] = [quizImage.dataset.swapSrc, quizImage.src];
        quizImage.style.transition = '';
        quizImage.style.transform = 'rotateY(270deg)';
        setTimeout(() => {
            quizImage.style.transition = 'transform 1s linear';
            quizImage.style.transform = 'rotateY(360deg)';
        }, 0);
    }, 1000);
}
