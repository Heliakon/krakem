// Compares a translation with the English source. Pages must keep the same markup (tags, IDs, classes, links, and every
// attribute except visible text in placeholder, aria-label, title, and alt), the same build markers, and the same inline code.
// Text tables must have the same keys. Run `node scripts/check-translations.mjs pl` to list problems for one language.
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const root=new URL('../',import.meta.url);
export const pageKeys=['guide','humanize','claude','outputs','evidence'];
const translatable=new Set(['placeholder','aria-label','title','alt']);
// Plain emphasis and line breaks may move or disappear in a natural translation.
const looseTags=new Set(['em','strong','b','i','br','wbr']);

function markup(html){
 const items=[];
 for(const [, comment,closing,name,attributes] of html.matchAll(/<!--([\s\S]*?)-->|<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g)){
  if(comment!==undefined){items.push(`<!--${comment.trim()}-->`);continue;}
  const tag=name.toLowerCase(),attrs=[...attributes.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)].filter(([,key])=>!translatable.has(key)).map(([,key,value=''])=>`${key}="${value}"`).sort();
  if(looseTags.has(tag)&&!attrs.length)continue;
  items.push(`<${closing}${tag}${attrs.length?' '+attrs.join(' '):''}>`);
 }
 return items;
}
const codeOf=html=>[...html.matchAll(/<code>([\s\S]*?)<\/code>/g)].map(match=>match[1]);
const textOf=html=>html.replace(/<pre[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>/g,' ').replace(/<[^>]+>/g,'\n').split('\n').map(part=>part.trim()).filter(part=>/\p{L}{3}/u.test(part));

export function comparePage(source,translation){
 const problems=[],a=markup(source),b=markup(translation);
 for(let i=0;i<Math.max(a.length,b.length);i++)if(a[i]!==b[i]){problems.push(`markup differs at item ${i}: expected ${a[i]??'(end)'}, found ${b[i]??'(end)'}`);break;}
 const codeA=codeOf(source),codeB=codeOf(translation);
 codeA.forEach((code,i)=>{if(codeB[i]!==code)problems.push(`code ${i+1} changed: expected <code>${code}</code>, found <code>${codeB[i]}</code>`);});
 if(codeB.length!==codeA.length)problems.push(`expected ${codeA.length} code elements, found ${codeB.length}`);
 return problems;
}
// Share of the page's text, by characters, that is identical to the English source. Names and source titles may stay.
export function untranslatedShare(source,translation){
 const english=new Set(textOf(source)),parts=textOf(translation),total=parts.join('').length;
 const same=parts.filter(part=>english.has(part));
 return {share:total?same.join('').length/total:0,same};
}
export function compareKeys(source,translation,path=''){
 const problems=[];
 for(const key of Object.keys(source)){
  const here=path?`${path}.${key}`:key;
  if(!(key in translation)){problems.push(`missing ${here}`);continue;}
  const a=source[key],b=translation[key];
  if(typeof a!==typeof b)problems.push(`${here} should be a ${typeof a}`);
  else if(typeof a==='object')problems.push(...compareKeys(a,b,here));
  else if(typeof a==='string'&&!b.trim())problems.push(`${here} is empty`);
 }
 for(const key of Object.keys(translation))if(!(key in source))problems.push(`unexpected ${path?`${path}.${key}`:key}`);
 return problems;
}
// Strings that are still identical to English; the Polish example in Humanize is Polish in every language.
export function untranslatedStrings(source,translation,path=''){
 return Object.keys(source).flatMap(key=>{
  const here=path?`${path}.${key}`:key,a=source[key],b=translation?.[key];
  if(here.startsWith('humanize.examples.polish')||key==='lang')return [];
  if(a&&typeof a==='object')return untranslatedStrings(a,b,here);
  if(typeof a==='function')return a(2,'A','B')===b?.(2,'A','B')?[here]:[];
  return a===b?[here]:[];
 });
}

export async function checkLanguage(lang){
 const read=path=>readFile(new URL(path,root),'utf8'),problems=[],warnings=[];
 for(const key of pageKeys){
  const source=await read(`content/${key}.html`),translation=await read(`content/${lang}/${key}.html`);
  problems.push(...comparePage(source,translation).map(problem=>`content/${lang}/${key}.html: ${problem}`));
  const {share,same}=untranslatedShare(source,translation);
  if(same.length)warnings.push(`content/${lang}/${key}.html: ${Math.round(share*100)}% of text identical to English: ${same.map(part=>JSON.stringify(part.slice(0,60))).join(', ')}`);
 }
 const site=JSON.parse(await read('content/site.json')),siteTranslation=JSON.parse(await read(`content/${lang}/site.json`));
 problems.push(...compareKeys(site,siteTranslation).map(problem=>`content/${lang}/site.json: ${problem}`));
 const {en}=await import(new URL('assets/text-en.js',root)),table=(await import(new URL(`assets/text-${lang}.js`,root)))[lang];
 if(!table)problems.push(`assets/text-${lang}.js must export const ${lang}`);
 else{
  problems.push(...compareKeys(en,table).map(problem=>`assets/text-${lang}.js: ${problem}`));
  const same=untranslatedStrings(en,table);
  if(same.length)warnings.push(`assets/text-${lang}.js: identical to English: ${same.join(', ')}`);
 }
 return {problems,warnings};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const lang=process.argv[2];
 if(!['pl','sv'].includes(lang)){console.error('Usage: node scripts/check-translations.mjs pl|sv');process.exit(2);}
 const {problems,warnings}=await checkLanguage(lang);
 warnings.forEach(warning=>console.log(`WARNING: ${warning}`));
 problems.forEach(problem=>console.log(`PROBLEM: ${problem}`));
 console.log(problems.length?`${problems.length} problem(s).`:'Markup, code, and keys match the English source.');
 process.exit(problems.length?1:0);
}
