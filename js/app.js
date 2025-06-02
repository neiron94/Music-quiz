import {} from './utils.js';
import { setUpStateTransitions } from './quiz/formAutomaton.js';
import { setUpSectionShowHide } from './sectionShowHide.js';
import { parseConfig } from './configParser.js';
import { fillSetUpFormHtml } from './quiz/htmlFormFiller.js';
import { setUpQuizGenerator } from './quiz/quizGenerator.js';
import { fillMusiciansSection } from './musiciansSectionFiller.js';
import { fillGenresSection } from './genresSectionFiller.js';
import { setUpFormHistory } from './formHistory.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('serviceworker.js').catch(() => {});
    });
}

await parseConfig();
setUpStateTransitions();
setUpSectionShowHide();
fillSetUpFormHtml();
setUpQuizGenerator();
setUpFormHistory();
fillMusiciansSection();
fillGenresSection();