import { genres, musicians } from '../global.js';

const musicianGenreSelect = document.getElementById('musician-genre-select');
const songGenreSelect = document.getElementById('song-genre-select');
const songMusicianSelect = document.getElementById('song-musician-select');

const questionNumberSlideBar = document.getElementById('question-number');
const questionNumberCurrent = document.querySelector('#question-number-span .slide-bar-current');

const replayNumberSlideBar = document.getElementById('replay-number');
const replayNumberCurrent = document.querySelector('#replay-number-span .slide-bar-current');

questionNumberSlideBar.addEventListener('input', () => {
    questionNumberCurrent.textContent = questionNumberSlideBar.value;
});

replayNumberSlideBar.addEventListener('input', () => {
    replayNumberCurrent.textContent = replayNumberSlideBar.value;
});

export function fillSetUpFormHtml() {
    addAllGenres(musicianGenreSelect);
    addAllGenres(songGenreSelect);
    addAllMusicians(songMusicianSelect);
}

function addAllGenres(selectElement) {
    selectElement.innerHTML = '';
    addDefaultOption(selectElement);
    for (const genre of genres) {
        const option = document.createElement('option');
        option.value = genre.name;
        option.textContent = genre.name;
        selectElement.appendChild(option);
    }
}

function addAllMusicians(selectElement) {
    selectElement.innerHTML = '';
    addDefaultOption(selectElement);
    for (const musician of musicians) {
        const option = document.createElement('option');
        option.value = musician.name;
        option.textContent = musician.name;
        selectElement.appendChild(option);
    }
}

function addDefaultOption(selectElement) {
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Not selected";
    selectElement.appendChild(defaultOption);
}
