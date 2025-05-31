export class Genre {
    constructor(name, description, image, musicians) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.musicians = musicians;
    }
}

export class Musician {
    constructor(name, description, image, imageMirror, songs) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.imageMirror = imageMirror;
        this.songs = songs;
    }
}

export class Song {
    constructor(name, image, audioDir) {
        this.name = name;
        this.image = image;
        this.audioDir = audioDir;
    }
}
