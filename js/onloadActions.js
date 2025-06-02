import {showQuizSectionArticle, showSection} from "./navigation/showActive.js";

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
}
