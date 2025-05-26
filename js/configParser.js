import { Genre, Musician, Song } from './model.js';
import { genres, musicians, songs } from './global.js';

export async function parseConfig() {
    try {
        const response = await fetch('static/config/entities.json');
        if (!response.ok) {
            console.error('Failed to load config with entities');
        }
        const json = await response.json();
        parseEntities(json);
    }
    catch (error) {
        console.error('Failed to parse entities config. Error: ', error);
    }
}

function parseEntities(entities) {
    // Iterate through config genres
    for (const rawGenre of entities) {
        const musicianNames = []

        // Iterate through config musicians
        for (const rawMusician of rawGenre.musicians) {
            musicianNames.push(rawMusician.name);
            const songNames = [];

            // Iterate through config songs
            for (const rawSong of rawMusician.songs) {
                songNames.push(rawSong.name);
                const song = new Song(rawSong.name, rawSong.image, rawSong.audioDir);
                songs.push(song);
            }

            const musician = new Musician(rawMusician.name, rawMusician.description, rawMusician.image, songNames);
            musicians.push(musician);
        }

        const genre = new Genre(rawGenre.name, rawGenre.description, rawGenre.image, musicianNames);
        genres.push(genre);
    }
}