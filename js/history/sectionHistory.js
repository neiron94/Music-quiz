import {showSection} from "../navigation/showActive.js";

const buttons = document.querySelectorAll('nav button');

export function setUpHistory() {
    setUpHistoryPopState();
    setUpHistoryPushState();
}

function setUpHistoryPopState() {
    // Make history back/forward buttons work
    window.addEventListener('popstate', (e) => {
        e.preventDefault();
        const sectionId = location.hash.replace('#', '') || 'home-section';
        showSection(sectionId);
    });
}

function setUpHistoryPushState() {
    buttons.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.dataset.section;
            if (location.hash.replace('#', '') !== sectionId) {
                history.pushState(null, '', `${location.pathname}#${sectionId}`);
            }
        });
    });
}
