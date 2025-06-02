import {renderQuizUI, renderResultsText, stopPlayingAudio} from "./quiz/quizRender.js";
import {getCurrentQuiz, setCurrentQuiz} from "./global.js";

const links = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('main > section');
const quizSectionArticles = document.querySelectorAll('#quiz-section article');
const playNavigationButton = document.getElementById('play-navigation');
const newQuizButton = document.getElementById('new-quiz');
const homePlayButton = document.getElementById('home-play-button');

export function setUpSectionShowHide() {
    setUpNavigation();
}

function setUpNavigation() {
    // Force #home-section if no hash was provided
    if (location.hash.replace('#', '') === "") {
        location.replace(`${location.pathname}#home-section`);
        history.replaceState(null, '', `${location.pathname}${location.hash}`);
    }

    // Show proper section
    const sectionId = location.hash.replace('#', '');
    showSection(sectionId);
    showQuizSectionArticle();

    // Navigation rules
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionId = link.dataset.section;
            if (location.hash.replace('#', '') !== sectionId) {
                showSection(sectionId);
                stopPlayingAudio();
                history.pushState(null, '', `${location.pathname}#${sectionId}`);
            }
        });
    });

    // Make history back/forward buttons work
    window.addEventListener('popstate', (e) => {
        e.preventDefault();
        const sectionId = location.hash.replace('#', '') || 'home-section';
        showSection(sectionId);
    });

    // Quiz Articles show/hide
    playNavigationButton.addEventListener('click', (e) => {
        e.preventDefault();
        showQuizSectionArticle();
    });

    newQuizButton.addEventListener('click', (e) => {
        e.preventDefault();
        setCurrentQuiz(null);
        showQuizSectionArticle();
    });

    // Home section, play button
    homePlayButton.addEventListener('click', (e) => {
        e.preventDefault();
        playNavigationButton.dispatchEvent(new Event('click'));
    });
}

export function showSection(id) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === id)
            section.classList.add('active');
    });
}

function showQuizArticle(id) {
    quizSectionArticles.forEach(article => {
        article.classList.remove('active');
        if (article.id === id)
            article.classList.add('active');
    });
}

export function showQuizSectionArticle() {
    const quiz = getCurrentQuiz();
    if (quiz === null) {
        showQuizArticle('set-up-part');
    }
    else if (!quiz.finished) {
        showQuizArticle('quiz-part');
        renderQuizUI();
    }
    else {
        showQuizArticle('results-part');
        renderResultsText();
    }
}
