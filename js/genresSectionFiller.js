import { genres, musicians } from './global.js';

const genresList = document.getElementById('genres-list');

export function fillGenresSection() {
    genres.forEach( genre => {
        const listItem = document.createElement('li');
        const article = document.createElement('article');

        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        h3.textContent = genre.name;
        const p = document.createElement('p');
        p.textContent = genre.description;
        header.appendChild(h3);
        article.appendChild(header);

        const image = document.createElement('img');
        image.src = genre.image;
        article.appendChild(image);

        const musiciansDiv = document.createElement('div');
        const musiciansText = document.createElement('span');
        musiciansText.textContent = 'Musicians presented in the quiz:';
        musiciansDiv.appendChild(musiciansText);
        const musicianList = document.createElement('ul');
        musicians.forEach(musician => {
            if (genre.musicians.includes(musician.name)) {
                const listItem = document.createElement('li');
                const img = document.createElement('img');
                img.src = musician.image;
                listItem.appendChild(img);
                musicianList.appendChild(listItem);
            }
        })
        musiciansDiv.appendChild(musicianList);
        article.appendChild(musiciansDiv);

        const songQuizButton = document.createElement('button');
        songQuizButton.textContent = 'Guess songs';
        article.appendChild(songQuizButton);

        const musicianQuizButton = document.createElement('button');
        musicianQuizButton.textContent = 'Guess musicians';
        article.appendChild(musicianQuizButton);

        listItem.appendChild(article);
        genresList.appendChild(listItem);
    });
}
