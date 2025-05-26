import { setUpFormShowHide } from './quizSetUpShowHide.js';
import { setUpNavigation } from './navigation.js';
import { parseConfig } from './configParser.js';

setUpNavigation();
setUpFormShowHide();
await parseConfig();
