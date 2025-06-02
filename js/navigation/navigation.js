import {renderQuizUI, renderResultsText, resetAnsweredQuiz} from "../quiz/quizRender.js";
import {getCurrentQuiz, setCurrentQuiz} from "../model/global.js";
import {showQuizSectionArticle, showSection} from "./showActive.js";
import {generateQuiz} from "../quiz/quizGenerator.js";
import {stopPlayingAudio} from "../quiz/audioPlayer.js";

const buttons = document.querySelectorAll('nav button');
const playNavigationButton = document.getElementById('play-navigation');
const newQuizButton = document.getElementById('new-quiz');
const homePlayButton = document.getElementById('home-play-button');
const nextQuestionButton = document.getElementById("next-question");
const submitButton = document.getElementById('quiz-set-up-submit');

/* Configure cross-section and quiz cross-article navigation.
* Genres section and Musicians section navigation is configured in html fillers. */
export function setUpNavigation() {
    setUpHeaderNavigation();
    setUpQuizCrossArticleNavigation();
    setUpHomeSectionNavigation();
}

/* Configure event listeners for section navigation from main Header. */
function setUpHeaderNavigation() {
    buttons.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.dataset.section;
            if (location.hash.replace('#', '') !== sectionId) {
                showSection(sectionId);
                stopPlayingAudio(); // TODO - move to player
            }
        });
    });

    playNavigationButton.addEventListener('click', (e) => {
        e.preventDefault();
        showQuizSectionArticle();
    });
}

/* Configure event listeners for article navigation inside Quiz section. */
function setUpQuizCrossArticleNavigation() {
    // set up form -> quiz
    submitButton.addEventListener('click', () => {
        generateQuiz();
        showQuizSectionArticle();
    });

    // quiz question -> quiz question AND quiz -> results
    nextQuestionButton.addEventListener("click", () => {
        resetAnsweredQuiz();
        const quiz = getCurrentQuiz();
        quiz.currentQuestionIndex++;
        setCurrentQuiz(quiz);
        if (quiz.currentQuestionIndex < quiz.questions.length) { // question -> question
            renderQuizUI();
        } else { // quiz -> results
            renderResultsText();
            quiz.finished = true;
            setCurrentQuiz(quiz);
            showQuizSectionArticle();
        }
    });

    // results -> set up form
    newQuizButton.addEventListener('click', () => {
        setCurrentQuiz(null);
        showQuizSectionArticle();
    });
}

/* Configure event listeners for section navigation from Home section. */
function setUpHomeSectionNavigation() {
    homePlayButton.addEventListener('click', () => {
        playNavigationButton.dispatchEvent(new Event('click'));
    });
}
