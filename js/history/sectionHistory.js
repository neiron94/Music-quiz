import {showSection} from "../navigation/showActive.js";

const buttons = document.querySelectorAll('nav button');

export function setUpSectionHistory() {
    setUpHistoryPopState();
    setUpHistoryPushState();
}

/* Make history back/forward buttons work for sections */
function setUpHistoryPopState() {
    window.addEventListener('popstate', (e) => {
        e.preventDefault();
        const sectionId = location.hash.replace('#', '') || 'home-section';
        showSection(sectionId);
    });
}

/* History logic for navigation buttons */
function setUpHistoryPushState() {
    buttons.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.dataset.section;
            if (location.hash.replace('#', '') !== sectionId) { // if already in this section
                history.pushState(null, '', `${location.pathname}#${sectionId}`);
            }
        });
    });
}
