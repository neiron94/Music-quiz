import { setUpStateTransitions } from './quizsetup/formAutomaton.js';
import { setUpNavigation } from './navigation.js';
import { parseConfig } from './configParser.js';
import { fillSetUpFormHtml } from './quizsetup/htmlFiller.js';

await parseConfig();
setUpNavigation();
fillSetUpFormHtml();
setUpStateTransitions();
