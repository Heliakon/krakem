// Page language: a choice saved from the language switcher first, then the browser's language preferences, then English.
// A detected language is never saved, so a later change in browser settings still takes effect. Location and IP address are not used.
// The build also inlines this file in each page's <head>, where it picks the language before the page is drawn.
export const SUPPORTED_LANGUAGES=new Set(['en','pl','sv']);
export const DEFAULT_LANGUAGE='en';
export const STORAGE_KEY='site-language';

export function detectBrowserLanguage(){
 if(typeof navigator==='undefined')return DEFAULT_LANGUAGE;
 const preferences=Array.isArray(navigator.languages)&&navigator.languages.length?navigator.languages:[navigator.language];
 for(const locale of preferences){
  if(typeof locale!=='string')continue;
  // Regional variants count: pl-PL → pl, sv-SE → sv, en-GB → en.
  const language=locale.trim().toLowerCase().split(/[-_]/)[0];
  if(SUPPORTED_LANGUAGES.has(language))return language;
 }
 return DEFAULT_LANGUAGE;
}

export function getInitialLanguage(){
 if(typeof window==='undefined')return DEFAULT_LANGUAGE;
 try{
  const saved=window.localStorage.getItem(STORAGE_KEY);
  if(SUPPORTED_LANGUAGES.has(saved))return saved;
 }catch{
  // Storage is unavailable; fall back to the browser's preferences.
 }
 return detectBrowserLanguage();
}

export function rememberLanguage(language){
 if(!SUPPORTED_LANGUAGES.has(language))return;
 try{
  if(typeof window!=='undefined')window.localStorage.setItem(STORAGE_KEY,language);
 }catch{
  // Switching still works for this visit without saving.
 }
}
