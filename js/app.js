import { setUpStateTransitions } from './quiz/formAutomaton.js';
import { setUpSectionShowHide } from './sectionShowHide.js';
import { parseConfig } from './configParser.js';
import { fillSetUpFormHtml } from './quiz/htmlFormFiller.js';
import { setUpQuizGenerator } from './quiz/quizGenerator.js';

await parseConfig();
setUpSectionShowHide();
fillSetUpFormHtml();
setUpStateTransitions();
setUpQuizGenerator();
