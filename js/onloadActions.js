import {showQuizSectionArticle, showSection} from "./navigation/showActive.js";
import {setCurrentQuiz} from "./model/global.js";
import {fillFormParams} from "./history/formHistory.js";

/* Actions that should be done after loading the page */
export function executeOnloadActions() {
    // Force #home-section if no hash was provided
    if (location.hash.replace('#', '') === "") {
        location.replace(`${location.pathname}#home-section`);
        history.replaceState(null, '', `${location.pathname}${location.hash}`);
    }

    // Show proper section
    const sectionId = location.hash.replace('#', '');
    showSection(sectionId);
    showQuizSectionArticle();

    // Fill form from url params
    if (location.hash === "#quiz-section") {
        if (location.search !== '') {
            setCurrentQuiz(null);
            fillFormParams();
        }
    }
}
