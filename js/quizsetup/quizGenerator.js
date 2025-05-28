import { genres, musicians, songs, currentFormState, currentQuiz } from '../global.js';
import { getAllQuestionEntities } from './questionEntitiesProvider.js';
import { Quiz, QuizQuestion } from '../model/quiz.js';
import { getRandomSample, getRandomElement } from '../utils.js';

const submitButton = document.getElementById('quiz-set-up-submit');
const setUpForm = document.getElementById('quiz-set-up-form');

export function setUpQuizGenerator() {
    submitButton.addEventListener('click', e => {
        e.preventDefault();
        generateQuiz();
    });
}

function generateQuiz() {
    const formData = new FormData(setUpForm);
    const gameMode = formData.get('game-mode');

    const allAnswers = getAllQuestionEntities();
    const chosenAnswers = getRandomSample(allAnswers, formData.get('question-number'));

    const questions = []

    for (const answer of chosenAnswers) {
        const audioDir = getAudioDir(gameMode, answer);
        const filename = formData.get('listen-seconds');
        const audio = `${audioDir}/${filename}.mp3`;

        let otherPossibleAnswers = allAnswers.filter(a => a.name !== answer.name);
        if (otherPossibleAnswers.length < 3) {
            otherPossibleAnswers = getOtherAnswers(gameMode, answer.name);
        }
        let options = getRandomSample(otherPossibleAnswers, 3);
        options.push(answer);
        options = getRandomSample(options, options.length);
        const correctOptionIndex = options.indexOf(answer);
        options = options.map(o => o.name);

        const question = new QuizQuestion(audio, answer.image, options, correctOptionIndex);
        questions.push(question);
    }

    currentQuiz = new Quiz(questions, formData.get('replay-number'));
}

function getAudioDir(gameMode, answer) {
    switch (gameMode) {
        case 'song': {
            return answer.audioDir;
        }
        case 'musician': {
            return songs.find(s => s.name === getRandomElement(answer.songs)).audioDir;
        }
        default: {
            console.error(`Invalid game mode: ${gameMode}`)
            return '';
        }
    }
}

function getOtherAnswers(gameMode, excludeName) {
    switch (gameMode) {
        case 'song': {
            return songs.filter(s => s.name !== excludeName);
        }
        case 'musician': {
            return musicians.filter(m => m.name !== excludeName);
        }
        default: {
            console.error(`Invalid game mode: ${gameMode}`)
            return [];
        }
    }
}
