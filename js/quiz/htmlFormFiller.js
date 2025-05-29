import { genres, musicians } from '../global.js';

const musicianGenreSelect = document.getElementById('musician-genre-select');
const songGenreSelect = document.getElementById('song-genre-select');
const songMusicianSelect = document.getElementById('song-musician-select');

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
