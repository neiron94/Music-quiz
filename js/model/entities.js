export class Genre {
    constructor(name, description, image, musicians) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.musicians = musicians;
    }
}

export class Musician {
    constructor(name, description, image, albums, songs) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.albums = albums;
        this.songs = songs;
    }
}

export class Album {
    constructor(name, image, songs) {
        this.name = name;
        this.image = image;
        this.songs = songs;
    }
}

export class Song {
    constructor(name, audioDir) {
        this.name = name;
        this.audioDir = audioDir;
    }
}
