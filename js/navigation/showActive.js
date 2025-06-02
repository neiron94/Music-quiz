import {getCurrentQuiz} from "../model/global.js";
import {renderQuizUI, renderResultsText} from "../quiz/quizRender.js";

const sections = document.querySelectorAll('main > section');
const quizSectionArticles = document.querySelectorAll('#quiz-section article');

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
    } else if (!quiz.finished) {
        showQuizArticle('quiz-part');
        renderQuizUI();
    } else {
        showQuizArticle('results-part');
        renderResultsText();
    }
}
