import { genres, musicians, songs, currentFormState } from '../global.js';

const musicianModeGenreSelect = document.getElementById('musician-genre');
const songModeGenreSelect = document.getElementById('song-genre');
const songModeMusicianSelect = document.getElementById('song-musician');

export function getAllQuestionEntities() {
    switch (currentFormState) {
        case 'songModeByGenreSelected': {
            const chosenGenre = songModeGenreSelect.value;
            const filteredMusicians = genres.find(genre => genre.name === chosenGenre).musicians;
            return filteredMusicians.flatMap(musician => musician.songs);
        }
        case 'songModeByMusicianSelected': {
            const chosenMusician = songModeMusicianSelect.value;
            return musicians.find(musician => musician.name === chosenMusician).songs;
        }
        case 'songModeByAllChecked': {
            return songs;
        }
        case 'musicianModeByGenreSelected': {
            const chosenGenre = musicianModeGenreSelect.value;
            return genres.find(genre => genre.name === chosenGenre).musicians;
        }
        case 'musicianModeByAllChecked': {
            return musicians;
        }
        default:
            return [];
    }
}
