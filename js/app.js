import { setUpStateTransitions } from './quiz/formAutomaton.js';
import { setUpSectionShowHide } from './sectionShowHide.js';
import { parseConfig } from './configParser.js';
import { fillSetUpFormHtml } from './quiz/htmlFormFiller.js';
import { setUpQuizGenerator } from './quiz/quizGenerator.js';
import { fillMusiciansSection } from './musiciansSectionFiller.js';
import { fillGenresSection } from './genresSectionFiller.js';

await parseConfig();
setUpSectionShowHide();
fillSetUpFormHtml();
setUpStateTransitions();
setUpQuizGenerator();
fillMusiciansSection();
fillGenresSection();