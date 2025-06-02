import { setUpUtils } from './utils.js';
import { setUpQuizFormAutomaton } from './quiz/formAutomaton.js';
import { setUpNavigation } from './navigation/navigation.js';
import { parseConfig } from './model/configParser.js';
import { fillQuizForm } from './htmlFiller/quizFormFiller.js';
import { fillMusiciansSection } from './htmlFiller/musiciansSectionFiller.js';
import { fillGenresSection } from './htmlFiller/genresSectionFiller.js';
import { setUpFormHistory } from './history/formHistory.js';
import { executeOnloadActions } from './onloadActions.js';
import { setUpSectionHistory } from './history/sectionHistory.js';
import {setUpAudioLogic} from "./quiz/audioPlayer.js";
import {setUpQuizLogic} from "./quiz/quizLogic.js";

// Utils
setUpUtils();

// Parse config
await parseConfig();

// Navigation
setUpNavigation();

// Quiz
setUpQuizFormAutomaton();
setUpAudioLogic();
setUpQuizLogic();

// History
setUpFormHistory();
setUpSectionHistory();

// Fill html
fillMusiciansSection();
fillGenresSection();
fillQuizForm();

// Default onload actions
executeOnloadActions();

// Set up service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('serviceworker.js').catch(() => {});
    });
}
