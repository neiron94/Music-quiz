import { musicians, songs, setCurrentQuiz, getCurrentQuiz } from '../global.js';
import { getAllPossibleAnswers } from './answerProvider.js';
import { Quiz, QuizQuestion } from '../model/quiz.js';
import { getRandomSample, getRandomElement } from '../utils.js';
import { startQuizRender } from "./quizRender.js";

const submitButton = document.getElementById('quiz-set-up-submit');
const setUpForm = document.getElementById('quiz-set-up-form');

export function setUpQuizGenerator() {
    submitButton.addEventListener('click', e => {
        e.preventDefault();
        generateQuiz();
        startQuizRender();
    });
}

function generateQuiz() {
    const formData = new FormData(setUpForm);
    const gameMode = formData.get('game-mode');

    const allAnswers = getAllPossibleAnswers();
    console.log('HERE');
    const chosenAnswers = getRandomSample(allAnswers, formData.get('question-number'));

    console.log(allAnswers);
    console.log(chosenAnswers);

    const questions = []

    for (const answerName of chosenAnswers) {
        // Audio
        const audioDir = getAudioDir(gameMode, answerName);
        const filename = formData.get('listen-duration');
        const audio = `${audioDir}/${filename}.mp3`;

        // Image
        const image = getImage(gameMode, answerName);

        // Options
        let otherPossibleAnswers = allAnswers.filter(a => a.name !== answerName);
        if (otherPossibleAnswers.length < 3) {
            otherPossibleAnswers = getOtherAnswers(gameMode, answerName);
        }
        let options = getRandomSample(otherPossibleAnswers, 3);
        options.push(answerName);
        options = getRandomSample(options, options.length);

        // Correct option
        const correctOptionIndex = options.indexOf(answerName);

        // Create question
        const question = new QuizQuestion(audio, image, options, correctOptionIndex);
        questions.push(question);
    }

    setCurrentQuiz(new Quiz(questions, formData.get('replay-number')));
    console.log(questions);
    console.log(getCurrentQuiz());
}

function getAudioDir(gameMode, answerName) {
    switch (gameMode) {
        case 'song': {
            return songs.find(s => s.name === answerName).audioDir;
        }
        case 'musician': {
            const answerMusician = musicians.find(m => m.name === answerName);
            return songs.find(s => s.name === getRandomElement(answerMusician.songs)).audioDir;
        }
        default: {
            console.error(`Invalid game mode: ${gameMode}`)
            return '';
        }
    }
}

function getImage(gameMode, answerName) {
    switch (gameMode) {
        case 'song': {
            return songs.find(s => s.name === answerName).image;
        }
        case 'musician': {
            return musicians.find(m => m.name === answerName).image;
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
            return songs.filter(s => s.name !== excludeName).map(s => s.name);
        }
        case 'musician': {
            return musicians.filter(m => m.name !== excludeName).map(m => m.name);
        }
        default: {
            console.error(`Invalid game mode: ${gameMode}`)
            return [];
        }
    }
}
