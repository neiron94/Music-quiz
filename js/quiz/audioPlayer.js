import {getCurrentQuiz, setCurrentQuiz} from "../model/global.js";
import {renderReplayCounter} from "./quizRender.js";

const replayButton = document.getElementById("replay-button");
const nextQuestionButton = document.getElementById("next-question");

let playingAudio = null;

export function setUpAudioLogic() {
    // Replay button
    replayButton.addEventListener("click", () => {
        const quiz = getCurrentQuiz();
        const question = quiz.getCurrentQuestion();

        if (!replayButton.classList.contains('animate') &&
            !replayButton.classList.contains('disable') &&
            question.replays < quiz.maxReplays) {
            playCurrentQuestionAudio();
        }
    });
}

export function playCurrentQuestionAudio() {
    const quiz = getCurrentQuiz();
    const question = quiz.getCurrentQuestion();

    const audio = new Audio(question.audio);
    audio.play().then( _ => {
        playingAudio = audio;
        replayButton.classList.add('animate');
    });
    audio.addEventListener('ended', () => {
        replayButton.classList.remove('animate');
        const quiz = getCurrentQuiz();
        const question = quiz.getCurrentQuestion();
        question.replays++;
        setCurrentQuiz(quiz);
        if (question.replays === parseInt(quiz.maxReplays))
            replayButton.classList.remove('active');
        renderReplayCounter();
        playingAudio = null;
    });
}

export function playAnswerSound(resultSound) {
    stopPlayingAudio();

    playingAudio = new Audio(resultSound);
    playingAudio.play();
    playingAudio.addEventListener('ended', () => {
        setTimeout(() => {
            if (location.hash === '#quiz-section') {
                const quiz = getCurrentQuiz();
                const question = quiz.getCurrentQuestion();
                playingAudio = new Audio(question.fullAudio);
                playingAudio.play();
                playingAudio.addEventListener('ended', () => {
                    playingAudio = null;
                });
            }

            nextQuestionButton.classList.add('active');
        }, 250);
    });
}

export function stopPlayingAudio() {
    if (playingAudio !== null) {
        playingAudio.pause();
        playingAudio.currentTime = 0;
        playingAudio.dispatchEvent(new Event('ended'));
        playingAudio = null;
    }
}
