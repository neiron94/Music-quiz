import {getCurrentQuiz} from "../model/global.js";
import {renderQuizUI, renderResultsText} from "../quiz/quizRender.js";

const sections = document.querySelectorAll('main > section');
const quizSectionArticles = document.querySelectorAll('#quiz-section article');

/* Show selected section and hide other */
export function showSection(id) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === id)
            section.classList.add('active');
    });
}

/* Select which article to show depending on quiz state */
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

/* Show selected quiz article and hide other */
function showQuizArticle(id) {
    quizSectionArticles.forEach(article => {
        article.classList.remove('active');
        if (article.id === id)
            article.classList.add('active');
    });
}
