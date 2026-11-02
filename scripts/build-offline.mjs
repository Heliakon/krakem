// Builds release/krakem.html: the whole site in one file that opens from disk.
// It reads the pages that scripts/build.mjs wrote to dist/, so run that first.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const pages=[['guide',''],['humanize','humanize/'],['claude','claude/'],['outputs','claude-outputs/'],['evidence','evidence/']];
// All three languages go in one file. Only the chosen one is placed in the page; the others wait in inert <template> elements.
const languages=['en','pl','sv'],prefix=lang=>lang==='en'?'':`${lang}/`;
const routes=Object.fromEntries(languages.flatMap(lang=>pages.map(([key,path])=>[`/${prefix(lang)}${path}`,{lang,key}])));
const html=Object.fromEntries(await Promise.all(languages.map(async lang=>[lang,Object.fromEntries(await Promise.all(pages.map(async([key,path])=>[key,await read(`dist/${prefix(lang)}${path}index.html`)])))])));
const pick=(source,pattern,label)=>{const match=source.match(pattern);if(!match)throw new Error(`Missing ${label} in the built pages.`);return match[1];};
const dataUrl=(type,text)=>`data:${type};charset=utf-8,${encodeURIComponent(text)}`;
const claudeRules=await read('assets/downloads/CLAUDE.md');

// Every local link becomes an in-file anchor, a ?lang= switch to another language, or a data URL; anything else is a build error.
function localize(fragment,path,lang){
 return fragment.replace(/(\s(?:href|src)=")([^"]*)"/g,(_,attribute,value)=>{
  if(/^(https?:|mailto:|data:|#)/.test(value))return `${attribute}${value}"`;
  const url=new URL(value,`https://krakem.invalid/${prefix(lang)}${path}`),route=routes[url.pathname];
  if(route)return `${attribute}${route.lang===lang?'':`?lang=${route.lang}`}${url.hash||`#page-${route.key}`}"`;
  if(url.pathname==='/assets/downloads/CLAUDE.md')return `${attribute}${dataUrl('text/markdown',claudeRules)}"`;
  throw new Error(`No offline target for ${value} on /${path}`);
 });
}

const templates=languages.map(lang=>{
 const source=html[lang],skip=pick(source.guide,/(<a class="skip-link"[^>]*>[^<]*<\/a>)/,'skip link');
 const header=localize(pick(source.guide,/(<header class="site-header">[\s\S]*?<\/header>)/,'header'),'',lang);
 const footer=localize(pick(source.guide,/(<footer class="site-footer">[\s\S]*?<\/footer>)/,'footer'),'',lang);
 const bodies=pages.map(([key,path],i)=>{
  const title=pick(source[key],/<title>([^<]*)<\/title>/,'title'),main=pick(source[key],/<main id="main" tabindex="-1">([\s\S]*)<\/main>/,'main');
  return `<div class="offline-page" id="page-${key}" data-page="${key}" data-title="${title}"${i?' hidden':''}>${localize(main,path,lang)}</div>`;
 }).join('\n');
 return `<template id="lang-${lang}">${skip}${header}\n<main id="main" tabindex="-1">${bodies}</main>${footer}<div id="toast" class="toast" role="status" aria-live="polite"></div></template>`;
}).join('\n');
// Runs before the bundled scripts: picks the language the same way the site does, then places that language's pages.
// The file has no language URLs, so a switch made here reloads with ?lang=, which also works when storage is unavailable.
const languageCode=(await read('assets/language.js')).replace(/^export /gm,'');
const bootstrap=`(()=>{
${languageCode}
const requested=new URLSearchParams(location.search).get('lang');
const language=SUPPORTED_LANGUAGES.has(requested)?requested:getInitialLanguage();
document.documentElement.lang=language;
document.currentScript.before(document.getElementById('lang-'+language).content.cloneNode(true));
document.querySelectorAll('.lang-switch [data-language]').forEach(link=>link.addEventListener('click',event=>{
 if(link.dataset.language===language){event.preventDefault();return;}
 link.href='?lang='+link.dataset.language+location.hash;
}));
})();`;

const css=await read('dist/assets/style.css');

// Bundle the ES modules into one classic script; each module keeps its own scope.
const moduleName=file=>`module_${file.replace(/\.js$/,'').replace(/-/g,'_')}`;
async function bundle(file){
 let code=await read(`assets/${file}`);
 const exported=[...code.matchAll(/^export (?:const|function) (\w+)/gm)].map(match=>match[1]);
 code=code.replace(/^import \{([^}]+)\} from '\.\/([\w-]+\.js)';$/gm,(_,names,dependency)=>`const {${names}}=${moduleName(dependency)};`).replace(/^export /gm,'');
 if(/^(import|export)\s/m.test(code))throw new Error(`Unbundled import or export in ${file}`);
 return exported.length?`const ${moduleName(file)}=(()=>{\n${code}\nreturn {${exported.join(',')}};\n})();`:`(()=>{\n${code}\n})();`;
}
const router=`(()=>{
 // Shows the page that contains the linked element, so in-page anchors work across every page of the chosen language.
 const pages=[...document.querySelectorAll('.offline-page')];
 const menu=[...document.querySelectorAll('.dock-item')].map(link=>[link,document.getElementById(link.hash.slice(1))?.closest('.offline-page')]);
 function show(scroll){
  const target=location.hash.length>1?document.getElementById(decodeURIComponent(location.hash.slice(1))):null;
  const page=target?target.closest('.offline-page'):pages[0];
  if(page){
   pages.forEach(p=>p.hidden=p!==page);
   document.body.dataset.page=page.dataset.page;document.title=page.dataset.title;
   menu.forEach(([link,linked])=>linked===page?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current'));
  }
  if(scroll)target&&target!==page?target.scrollIntoView():window.scrollTo(0,0);
 }
 addEventListener('hashchange',()=>show(true));
 show(location.hash.length>1);
})();`;
const scripts=[router,...await Promise.all(['text-en.js','text-pl.js','text-sv.js','language.js','i18n.js','prompt.js','drafts.js','humanize-brief.js','field-shapes.js','common.js','screensaver.js','field.js','guide.js','humanize.js'].map(bundle))].join('\n');
if(/<\/script/i.test(scripts+bootstrap))throw new Error('A script contains a closing script tag.');

const icon=await read('assets/icon.svg'),description=pick(html.en.guide,/<meta name="description" content="([^"]*)">/,'description');
const output=`<!doctype html>
<!-- Krakem offline copy: the whole site in one file. Source: https://github.com/Heliakon/krakem -->
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#0b1118"><title>${pick(html.en.guide,/<title>([^<]*)<\/title>/,'title')}</title><meta name="description" content="${description}"><link rel="icon" href="${dataUrl('image/svg+xml',icon)}" type="image/svg+xml"><style>${css}</style></head>
<body data-page="guide">${templates}
<script>
'use strict';
${bootstrap}
</script><script>
'use strict';
${scripts}
</script></body></html>
`;
await mkdir(new URL('release/',root),{recursive:true});
await writeFile(new URL('release/krakem.html',root),output);
console.log(`Built release/krakem.html (${Math.round(Buffer.byteLength(output)/1024)} KB).`);
