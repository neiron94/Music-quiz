export function setUpFormShowHide() {
    songModeRadio.addEventListener('change', updateMode);
    musicianModeRadio.addEventListener('change', updateMode);
    updateMode();

    musicianByGenreRadio.addEventListener('change', updateMusicianMode);
    allMusiciansRadio.addEventListener('change', updateMusicianMode);
    updateMusicianMode();

    songByGenreRadio.addEventListener('change', updateSongMode);
    songByMusicianRadio.addEventListener('change', updateSongMode);
    allSongsRadio.addEventListener('change', updateSongMode);
    updateSongMode();
}


// Form show-hide game mode
const songModeRadio = document.getElementById('guess-song');
const musicianModeRadio = document.getElementById('guess-musician');

const songModeFieldSet = document.getElementById('song-mode');
const musicianModeFieldSet = document.getElementById('musician-mode');

function updateMode() {
    if (musicianModeRadio.checked) {
        musicianModeFieldSet.hidden = false;
        songModeFieldSet.hidden = true;
    } else if (songModeRadio.checked) {
        musicianModeFieldSet.hidden = true;
        songModeFieldSet.hidden = false;
    }
}

// Form show-hide musician mode
const musicianByGenreRadio = document.getElementById('musician-by-genre');
const allMusiciansRadio = document.getElementById('musician-by-all');

const musicianModeGenreChoiceFieldSet = document.getElementById('musician-mode-genre-choice');

function updateMusicianMode() {
    if (musicianByGenreRadio.checked) {
        musicianModeGenreChoiceFieldSet.hidden = false;
    } else if (allMusiciansRadio.checked) {
        musicianModeGenreChoiceFieldSet.hidden = true;
    }
}

// Form show-hide song mode
const songByGenreRadio = document.getElementById('song-by-genre');
const songByMusicianRadio = document.getElementById('song-by-musician');
const allSongsRadio = document.getElementById('song-by-all');

const songModeGenreChoiceFieldSet = document.getElementById('song-mode-genre-choice');
const songModeMusicianChoiceFieldSet = document.getElementById('song-mode-musician-choice');

function updateSongMode() {
    if (songByGenreRadio.checked) {
        songModeGenreChoiceFieldSet.hidden = false;
        songModeMusicianChoiceFieldSet.hidden = true;
    } else if (songByMusicianRadio.checked) {
        songModeGenreChoiceFieldSet.hidden = true;
        songModeMusicianChoiceFieldSet.hidden = false;
    } else if (allSongsRadio.checked) {
        songModeGenreChoiceFieldSet.hidden = true;
        songModeMusicianChoiceFieldSet.hidden = true;
    }
}
