import { musicians, albums } from './global.js';

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
        albums.filter(album => musician.albums.includes(album.name)).forEach(album => {
            const li = document.createElement('li');
            const albumSpan = document.createElement('span');
            const albumName = document.createElement('span');
            albumName.textContent = album.name;
            albumSpan.appendChild(albumName);

            const albumImage = document.createElement('img');
            albumImage.src = album.image;
            albumSpan.appendChild(albumImage);
            li.appendChild(albumSpan);
            albumList.appendChild(li);
        });
        albumsDiv.appendChild(albumList);
        article.appendChild(albumsDiv);

        const quizButton = document.createElement('button');
        quizButton.textContent = 'Guess songs';
        article.appendChild(quizButton);
        listItem.appendChild(article);
        musiciansList.appendChild(listItem);
    });
}
