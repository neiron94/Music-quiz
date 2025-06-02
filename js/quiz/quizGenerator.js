import { musicians, songs, albums, setCurrentQuiz } from '../global.js';
import { getAllPossibleAnswers } from './answerProvider.js';
import { Quiz, QuizQuestion } from '../model/quiz.js';
import { showQuizSectionArticle } from "../sectionShowHide.js";

const submitButton = document.getElementById('quiz-set-up-submit');
const setUpForm = document.getElementById('quiz-set-up-form');

export function setUpQuizGenerator() {
    submitButton.addEventListener('click', e => {
        e.preventDefault();
        generateQuiz();
        showQuizSectionArticle();
    });
}

function generateQuiz() {
    const formData = new FormData(setUpForm);
    const gameMode = formData.get('game-mode');

    const allAnswers = getAllPossibleAnswers();
    const chosenAnswers = allAnswers.randomSample(formData.get('question-number'));

    const questions = []

    for (const answerName of chosenAnswers) {
        // Audio
        const audioDir = getAudioDir(gameMode, answerName);
        const filename = formData.get('listen-duration');
        const audio = `${audioDir}/${filename}.mp3`;
        const fullAudio = `${audioDir}/full.mp3`;

        // Image
        const image = getImage(gameMode, answerName);

        // Options
        let otherPossibleAnswers = allAnswers.filter(a => a !== answerName);
        if (otherPossibleAnswers.length < 3) {
            otherPossibleAnswers = getOtherAnswers(gameMode, answerName);
        }
        let options = otherPossibleAnswers.randomSample(3);
        options.push(answerName);
        options = options.randomSample(options.length);

        // Correct option
        const correctOptionIndex = options.indexOf(answerName);

        // Create question
        const question = new QuizQuestion(audio, fullAudio, image, options, correctOptionIndex);
        questions.push(question);
    }

    setCurrentQuiz(new Quiz(questions, formData.get('replay-number')));
}

function getAudioDir(gameMode, answerName) {
    switch (gameMode) {
        case 'song': {
            return songs.find(s => s.name === answerName).audioDir;
        }
        case 'musician': {
            const answerMusician = musicians.find(m => m.name === answerName);
            const randomMusicianSong = answerMusician.songs.randomElement();
            return songs.find(s => s.name === randomMusicianSong).audioDir;
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
            return albums.find(a => a.songs.includes(answerName)).image;
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
