import { genres, musicians, songs, getCurrentFormState } from '../global.js';

const musicianModeGenreSelect = document.getElementById('musician-genre');
const songModeGenreSelect = document.getElementById('song-genre');
const songModeMusicianSelect = document.getElementById('song-musician');

export function getAllPossibleAnswers() {
    switch (getCurrentFormState()) {
        case 'songModeByGenreSelected': {
            const chosenGenre = songModeGenreSelect.value;
            const musicianNames = genres.find(genre => genre.name === chosenGenre).musicians;
            const filteredMusicians = musicians.filter(m => musicianNames.includes(m.name));
            return filteredMusicians.flatMap(m => m.songs);
        }
        case 'songModeByMusicianSelected': {
            const chosenMusician = songModeMusicianSelect.value;
            return musicians.find(m => m.name === chosenMusician).songs;
        }
        case 'songModeByAllChecked': {
            return songs.map(s => s.name);
        }
        case 'musicianModeByGenreSelected': {
            const chosenGenre = musicianModeGenreSelect.value;
            return genres.find(g => g.name === chosenGenre).musicians;
        }
        case 'musicianModeByAllChecked': {
            return musicians.map(m => m.name);
        }
        default: {
            return [];
        }
    }
}
