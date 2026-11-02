import {en} from './text-en.js';
import {pl} from './text-pl.js';
import {sv} from './text-sv.js';
// The build sets <html lang> on every page (the offline copy sets it before its scripts run); scripts use the same language.
export const language=['en','pl','sv'].includes(document.documentElement.lang)?document.documentElement.lang:'en';
export const text={en,pl,sv}[language];
