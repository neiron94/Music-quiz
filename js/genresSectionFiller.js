import {genres, musicians} from './global.js';

const genresList = document.getElementById('genres-list');

export function fillGenresSection() {
    genres.forEach( genre => {
        const listItem = document.createElement('li');
        const article = document.createElement('article');

        // Article header
        const header = document.createElement('header');

        // H2 header
        const h2 = document.createElement('h2');
        h2.textContent = genre.name;
        h2.classList.add('genre-title');
        header.appendChild(h2);

        // Genre description (imageButton + text)
        const description = document.createElement('span');
        description.classList.add('genre-description');

        // Image with quiz buttons
        const imageButtonSpan = document.createElement('span');
        imageButtonSpan.classList.add('genre-image-button');

        // Genre image
        const image = document.createElement('img');
        image.src = genre.image || "static/img/svg/placeholder.svg";
        image.classList.add('genre-image');
        imageButtonSpan.appendChild(image);

        // Quiz buttons
        const songQuizButton = document.createElement('button');
        songQuizButton.textContent = 'Guess songs';
        songQuizButton.classList.add('genre-song-button');
        imageButtonSpan.appendChild(songQuizButton);

        const musicianQuizButton = document.createElement('button');
        musicianQuizButton.textContent = 'Guess musicians';
        musicianQuizButton.classList.add('genre-musician-button');
        imageButtonSpan.appendChild(musicianQuizButton);
        description.appendChild(imageButtonSpan);

        // Event listeners for quiz buttons
        songQuizButton.addEventListener('click', () => {
            location.assign(`${location.pathname}?game-mode=song&song-by=genre&song-genre=${genre.name}#quiz-section`);
        });
        musicianQuizButton.addEventListener('click', () => {
            location.assign(`${location.pathname}?game-mode=musician&musician-by=genre&musician-genre=${genre.name}#quiz-section`);
        });

        // Genre text
        const genreText = document.createElement('p');
        genreText.textContent = genre.description;
        genreText.classList.add('genre-text');
        description.appendChild(genreText);
        header.appendChild(description);
        article.appendChild(header);

        // Musicians span (musicians text + musicians list)
        const musiciansSpan = document.createElement('span');
        musiciansSpan.classList.add('genre-musicians-span');

        // Musicians text
        const musiciansText = document.createElement('p');
        musiciansText.textContent = 'Musicians presented in the quiz:';
        musiciansSpan.appendChild(musiciansText);

        // Musicians list
        const musiciansList = document.createElement('ul');
        musiciansList.classList.add('genre-musician-list');
        musicians.filter(musician => genre.musicians.includes(musician.name)).forEach(musician => {
            const li = document.createElement('li');

            // Musician span (name + image)
            const musicianSpan = document.createElement('span');
            musicianSpan.classList.add('genre-musician-span');

            // Musician name
            const musicianName = document.createElement('span');
            musicianName.textContent = musician.name;
            musicianName.classList.add('genre-musician-name');
            musicianSpan.appendChild(musicianName);

            // Musician image
            const musicianImage = document.createElement('img');
            musicianImage.src = musician.image || "static/img/svg/placeholder.svg";
            musicianImage.classList.add('genre-musician-image');
            musicianSpan.appendChild(musicianImage);

            li.appendChild(musicianSpan);
            musiciansList.appendChild(li);
        });
        musiciansSpan.appendChild(musiciansList);
        article.appendChild(musiciansSpan);
        listItem.appendChild(article);
        genresList.appendChild(listItem);
    });
}
