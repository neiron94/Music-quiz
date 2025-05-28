import { setCurrentFormState } from "../global.js";
import { getAllPossibleAnswers } from './answerProvider.js';

const MAX_QUESTIONS = 50;

export function setUpStateTransitions() {
    playNavigationButton.addEventListener('click', () => transitionTo('start'));

    songModeRadio.addEventListener('change', () => transitionTo('songModeChecked'));
    songByGenreRadio.addEventListener('change', () => transitionTo('songModeByGenreChecked'));
    songByGenreSelect.addEventListener('change', () => transitionTo('songModeByGenreSelected'));
    songByMusicianRadio.addEventListener('change', () => transitionTo('songModeByMusicianChecked'));
    songByMusicianSelect.addEventListener('change', () => transitionTo('songModeByMusicianSelected'));
    allSongsRadio.addEventListener('change', () => transitionTo('songModeByAllChecked'));

    musicianModeRadio.addEventListener('change', () => transitionTo('musicianModeChecked'));
    musicianByGenreRadio.addEventListener('change', () => transitionTo('musicianModeByGenreChecked'));
    musicianByGenreSelect.addEventListener('change', () => transitionTo('musicianModeByGenreSelected'));
    allMusiciansRadio.addEventListener('change', () => transitionTo('musicianModeByAllChecked'));
}


const playNavigationButton = document.getElementById('play-navigation');

const songModeRadio = document.getElementById('guess-song');
const songByGenreRadio = document.getElementById('song-by-genre');
const songByGenreSelect = document.getElementById('song-genre');
const songByMusicianRadio = document.getElementById('song-by-musician');
const songByMusicianSelect = document.getElementById('song-musician');
const allSongsRadio = document.getElementById('song-by-all');

const musicianModeRadio = document.getElementById('guess-musician');
const musicianByGenreRadio = document.getElementById('musician-by-genre');
const musicianByGenreSelect = document.getElementById('musician-genre');
const allMusiciansRadio = document.getElementById('musician-by-all');


// Shows ids of fieldsets (and submit button) which should be displayed for each state.
// Other fieldsets should be refreshed and hidden.
const stateMap = {
    start: ['game-mode'],
    songModeChecked: ['game-mode', 'song-mode'],
    songModeByGenreChecked: ['game-mode', 'song-mode', 'song-mode-genre-choice'],
    songModeByGenreSelected: ['game-mode', 'song-mode', 'song-mode-genre-choice', 'additional-settings', 'quiz-set-up-submit'],
    songModeByMusicianChecked: ['game-mode', 'song-mode', 'song-mode-musician-choice'],
    songModeByMusicianSelected: ['game-mode', 'song-mode', 'song-mode-musician-choice', 'additional-settings', 'quiz-set-up-submit'],
    songModeByAllChecked: ['game-mode', 'song-mode', 'additional-settings', 'quiz-set-up-submit'],
    musicianModeChecked: ['game-mode', 'musician-mode'],
    musicianModeByGenreChecked: ['game-mode', 'musician-mode', 'musician-mode-genre-choice'],
    musicianModeByGenreSelected: ['game-mode', 'musician-mode', 'musician-mode-genre-choice', 'additional-settings', 'quiz-set-up-submit'],
    musicianModeByAllChecked: ['game-mode', 'musician-mode', 'additional-settings', 'quiz-set-up-submit'],
};

function transitionTo(state) {
    setCurrentFormState(state);

    // Start specific
    if (state === 'start') {
        songModeRadio.checked = songModeRadio.defaultChecked;
        musicianModeRadio.checked = musicianModeRadio.defaultChecked;
    }

    // Dynamically change number of available questions for provided settings
    recalculateQuestionNumber();

    // Hide all fieldsets (and submit button)
    document.querySelectorAll('#quiz-set-up-form fieldset').forEach(fs => fs.hidden = true);
    document.querySelector('#quiz-set-up-submit').hidden = true;

    // Show relevant ones
    stateMap[state].forEach(id => {
        document.getElementById(id).hidden = false;
    });

    // Reset irrelevant parts
    resetIrrelevantFieldsets(state);
}

function recalculateQuestionNumber() {
    const inputElement = document.getElementById('question-number');
    const possibleQuestionNumber = getAllPossibleAnswers().length;
    inputElement.max = possibleQuestionNumber > MAX_QUESTIONS ? MAX_QUESTIONS : possibleQuestionNumber;
    inputElement.value = Math.floor((inputElement.min + inputElement.max) / 2);
    inputElement.defaultValue = inputElement.value;
}

function resetIrrelevantFieldsets(state) {
    const visible = new Set(stateMap[state]);
    document.querySelectorAll('#quiz-set-up-form fieldset').forEach(fs => {
        if (!visible.has(fs.id)) {
            Array.from(fs.elements).forEach(el => {
                if (el.tagName === 'SELECT') {
                    el.selectedIndex = 0;
                } else if (el.type === 'radio' || el.type === 'checkbox') {
                    el.checked = el.defaultChecked;
                } else {
                    el.value = el.defaultValue;
                }
            });
        }
    });
}
