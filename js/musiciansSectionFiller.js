import { musicians, albums } from './global.js';

const musiciansList = document.getElementById('musicians-list');

export function fillMusiciansSection() {
    musicians.forEach( musician => {
        const listItem = document.createElement('li');
        const article = document.createElement('article');

        // Article header
        const header = document.createElement('header');

        // H2 header
        const h2 = document.createElement('h2');
        h2.textContent = musician.name;
        h2.classList.add('musician-title');
        header.appendChild(h2);

        // Musician description (imageButton + text)
        const description = document.createElement('span');
        description.classList.add('musician-description');

        // Image with quiz button
        const imageButtonSpan = document.createElement('span');
        imageButtonSpan.classList.add('musician-image-button');

        // Musician image
        const image = document.createElement('img');
        image.src = musician.image || "static/img/svg/placeholder.svg";
        image.classList.add('musician-image');
        imageButtonSpan.appendChild(image);

        // Quiz button
        const quizButton = document.createElement('button');
        quizButton.textContent = 'Guess songs';
        quizButton.classList.add('musician-song-button');
        imageButtonSpan.appendChild(quizButton);
        description.appendChild(imageButtonSpan);

        // Event listener for quiz button
        quizButton.addEventListener('click', () => {
            location.assign(`${location.pathname}?game-mode=song&song-by=musician&song-musician=${musician.name}#quiz-section`);
        });

        // Musician text
        const musicianText = document.createElement('p');
        musicianText.textContent = musician.description;
        musicianText.classList.add('musician-text');
        description.appendChild(musicianText);
        header.appendChild(description);
        article.appendChild(header);

        // Albums span (albums text + albums list)
        const albumsSpan = document.createElement('span');
        albumsSpan.classList.add('musician-albums-span');

        // Albums text
        const albumsText = document.createElement('p');
        albumsText.textContent = 'Discography presented in the quiz:';
        albumsSpan.appendChild(albumsText);

        // Albums list
        const albumList = document.createElement('ul');
        albumList.classList.add('musician-album-list');
        albums.filter(album => musician.albums.includes(album.name)).forEach(album => {
            const li = document.createElement('li');

            // Album span (name + image)
            const albumSpan = document.createElement('span');
            albumSpan.classList.add('musician-album-span');

            // Album name
            const albumName = document.createElement('span');
            albumName.textContent = album.name;
            albumName.classList.add('musician-album-name');
            albumSpan.appendChild(albumName);

            // Album image
            const albumImage = document.createElement('img');
            albumImage.src = album.image || "static/img/svg/placeholder.svg";
            albumImage.classList.add('musician-album-image');
            albumSpan.appendChild(albumImage);

            li.appendChild(albumSpan);
            albumList.appendChild(li);
        });
        albumsSpan.appendChild(albumList);
        article.appendChild(albumsSpan);
        listItem.appendChild(article);
        musiciansList.appendChild(listItem);
    });
}
