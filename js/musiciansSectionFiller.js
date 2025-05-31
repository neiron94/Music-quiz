import { musicians } from './global.js';

const musiciansList = document.getElementById('musicians-list');

export function fillMusiciansSection() {
    musicians.forEach( musician => {
        const listItem = document.createElement('li');
        const article = document.createElement('article');

        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        h3.textContent = musician.name;
        const p = document.createElement('p');
        p.textContent = musician.description;
        header.appendChild(h3);
        article.appendChild(header);

        const image = document.createElement('img');
        image.src = musician.image;
        article.appendChild(image);

        const albumsDiv = document.createElement('div');
        const albumsText = document.createElement('span');
        albumsText.textContent = 'Discography presented in the quiz:';
        albumsDiv.appendChild(albumsText);
        const albumList = document.createElement('ul');
        // TODO - for each file from musician.albumImagesDir
        albumsDiv.appendChild(albumList);
        article.appendChild(albumsDiv);

        const quizButton = document.createElement('button');
        quizButton.textContent = 'Guess songs';
        article.appendChild(quizButton);
        listItem.appendChild(article);
        musiciansList.appendChild(listItem);
    });
}
