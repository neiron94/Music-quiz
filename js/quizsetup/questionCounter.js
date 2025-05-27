import { genres, musicians, songs } from '../global.js';

const musicianModeGenreSelect = document.getElementById('musician-genre');
const songModeGenreSelect = document.getElementById('song-genre');
const songModeMusicianSelect = document.getElementById('song-musician');
const inputElement = document.getElementById('question-number');

export function recalculateQuestionNumber(state) {
    let count = 0;
    switch (state) {
        case 'songModeByGenreSelected': {
            const chosenGenre = songModeGenreSelect.value;
            const filteredMusicians = genres.find(genre => genre.name === chosenGenre).musicians;
            const filteredSongs = filteredMusicians.flatMap(musician => musician.songs);
            count = filteredSongs.length;
            break;
        }
        case 'songModeByMusicianSelected': {
            const chosenMusician = songModeMusicianSelect.value;
            const filteredSongs = musicians.find(musician => musician.name === chosenMusician).songs;
            count = filteredSongs.length;
            break;
        }
        case 'songModeByAllChecked': {
            count = songs.length;
            break;
        }
        case 'musicianModeByGenreSelected': {
            const chosenGenre = musicianModeGenreSelect.value;
            const filteredMusicians = genres.find(genre => genre.name === chosenGenre).musicians;
            count = filteredMusicians.length;
            break;
        }
        case 'musicianModeByAllChecked': {
            count = musicians.length;
            break;
        }
        default:
            return;
    }

    inputElement.max = count;
    inputElement.value = Math.floor((inputElement.min + inputElement.max) / 2);
    inputElement.defaultValue = inputElement.value;
}
