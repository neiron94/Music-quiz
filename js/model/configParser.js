import { Genre, Musician, Album, Song } from './entities.js';
import {genres, musicians, albums, songs } from './global.js';

/* Parse main config */
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
            const albumNames = [];
            const musicianSongNames = [];

            // Iterate through config albums
            for (const rawAlbum of rawMusician.albums) {
                albumNames.push(rawAlbum.name);
                const albumSongNames = [];

                // Iterate through config songs
                for (const rawSong of rawAlbum.songs) {
                    musicianSongNames.push(rawSong.name);
                    albumSongNames.push(rawSong.name);

                    const song = new Song(rawSong.name, rawSong.audioDir);
                    songs.push(song);
                }

                const album = new Album(rawAlbum.name, rawAlbum.image, albumSongNames);
                albums.push(album);
            }

            const musician = new Musician(rawMusician.name, rawMusician.description, rawMusician.image, albumNames, musicianSongNames);
            musicians.push(musician);
        }

        const genre = new Genre(rawGenre.name, rawGenre.description, rawGenre.image, musicianNames);
        genres.push(genre);
    }
}