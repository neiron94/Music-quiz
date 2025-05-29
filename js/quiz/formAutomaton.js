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
const songByGenreSelect = document.getElementById('song-genre-select');
const songByMusicianRadio = document.getElementById('song-by-musician');
const songByMusicianSelect = document.getElementById('song-musician-select');
const allSongsRadio = document.getElementById('song-by-all');

const musicianModeRadio = document.getElementById('guess-musician');
const musicianByGenreRadio = document.getElementById('musician-by-genre');
const musicianByGenreSelect = document.getElementById('musician-genre-select');
const allMusiciansRadio = document.getElementById('musician-by-all');

const questionNumberInput = document.getElementById('question-number');


const stateMap = {
    start: {
        shownFieldSets: ['game-mode'],
        hiddenInputs: [],
        visibleResets: ['guess-song', 'guess-musician'],
        showSubmit: false
    },
    songModeChecked: {
        shownFieldSets: ['game-mode', 'song-mode'],
        hiddenInputs: ['song-genre-select-span', 'song-musician-select-span'],
        visibleResets: [],
        showSubmit: false
    },
    songModeByGenreChecked: {
        shownFieldSets: ['game-mode', 'song-mode'],
        hiddenInputs: ['song-musician-select-span'],
        visibleResets: ['song-musician-select'],
        showSubmit: false
    },
    songModeByGenreSelected: {
        shownFieldSets: ['game-mode', 'song-mode', 'additional-settings'],
        hiddenInputs: ['song-musician-select-span'],
        visibleResets: [],
        showSubmit: true
    },
    songModeByMusicianChecked: {
        shownFieldSets: ['game-mode', 'song-mode'],
        hiddenInputs: ['song-genre-select-span'],
        visibleResets: ['song-genre-select'],
        showSubmit: false
    },
    songModeByMusicianSelected: {
        shownFieldSets: ['game-mode', 'song-mode', 'additional-settings'],
        hiddenInputs: ['song-genre-select-span'],
        visibleResets: [],
        showSubmit: true
    },
    songModeByAllChecked: {
        shownFieldSets: ['game-mode', 'song-mode', 'additional-settings'],
        hiddenInputs: ['song-genre-select-span', 'song-musician-select-span'],
        visibleResets: ['song-musician-select', 'song-genre-select'],
        showSubmit: true
    },
    musicianModeChecked: {
        shownFieldSets: ['game-mode', 'musician-mode'],
        hiddenInputs: ['musician-genre-select-span'],
        visibleResets: [],
        showSubmit: false
    },
    musicianModeByGenreChecked: {
        shownFieldSets: ['game-mode', 'musician-mode'],
        hiddenInputs: [],
        visibleResets: [],
        showSubmit: false
    },
    musicianModeByGenreSelected: {
        shownFieldSets: ['game-mode', 'musician-mode', 'additional-settings'],
        hiddenInputs: [],
        visibleResets: [],
        showSubmit: true
    },
    musicianModeByAllChecked: {
        shownFieldSets: ['game-mode', 'musician-mode', 'additional-settings'],
        hiddenInputs: ['musician-genre-select-span'],
        visibleResets: ['musician-genre-select'],
        showSubmit: true
    },
};

function transitionTo(state) {
    setCurrentFormState(state);

    // Dynamically change number of available questions for provided settings
    recalculateQuestionNumber();

    // Show / Hide submit button
    const submitButton = document.querySelector('#quiz-set-up-submit');
    if (stateMap[state].showSubmit)
        submitButton.classList.add('active');
    else
        submitButton.classList.remove('active');

    // Show / Hide all fieldsets
    const fieldSets = document.querySelectorAll('.quiz-form-fieldset');
    fieldSets.forEach(fs => {
        if (stateMap[state].shownFieldSets.includes(fs.id))
            fs.classList.add('active');
        else
            fs.classList.remove('active');
    });

    // Show / Hide inputs in filesets
    const inputSpans = document.querySelectorAll('.quiz-form-fieldset.active .input-label');
    inputSpans.forEach(span => {
        if (stateMap[state].hiddenInputs.includes(span.id))
            span.classList.remove('active');
        else
            span.classList.add('active');
    });

    // Reset irrelevant parts
    resetFieldsetInputs(state);
}

function recalculateQuestionNumber() {
    const possibleQuestionNumber = getAllPossibleAnswers().length;
    if (possibleQuestionNumber < 1) {
        return;
    }
    questionNumberInput.max = possibleQuestionNumber > MAX_QUESTIONS ? MAX_QUESTIONS : possibleQuestionNumber;
    questionNumberInput.value = Math.floor((questionNumberInput.min + questionNumberInput.max) / 2);
    questionNumberInput.defaultValue = questionNumberInput.value;
}

function resetFieldsetInputs(state) {
    const visibleFieldsets = new Set(stateMap[state].shownFieldSets);

    const fss = document.querySelectorAll('.quiz-form-fieldset');
    document.querySelectorAll('.quiz-form-fieldset').forEach(fs => {
        const elements = fs.querySelectorAll('select, input');
        elements.forEach(el => {
            if (!visibleFieldsets.has(fs.id) || stateMap[state].visibleResets.includes(el.id)) {
                switch (el.tagName) {
                    case "SELECT": {
                        el.selectedIndex = 0;
                        break;
                    }
                    case "INPUT": {
                        if (el.type === 'radio' || el.type === 'checkbox')
                            el.checked = el.defaultChecked;
                        else
                            el.value = el.defaultValue;
                        break;
                    }
                }
            }
        });
    });
}
