import {readFile,writeFile,mkdir,cp,rm,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {brandMark} from './brand-mark.mjs';
const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const claudeGuidelines=await read('assets/downloads/CLAUDE.md');
const escapeHtml=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const escapeAttr=value=>escapeHtml(value).replaceAll('"','&quot;');
// Every asset feeds the revision, so any change refreshes cached styles, scripts, and module imports together.
const assetFiles=(await readdir(new URL('assets/',root),{recursive:true,withFileTypes:true})).filter(entry=>entry.isFile()&&!entry.name.startsWith('.')).map(entry=>`${entry.parentPath??entry.path}/${entry.name}`).sort();
const revisionHash=createHash('sha256');
for(const file of assetFiles)revisionHash.update(file.slice(file.indexOf('/assets/'))).update(await readFile(file));
const assetRevision=revisionHash.digest('hex').slice(0,12);
// Social previews need absolute URLs. Set the real deployment origin in site.config.json or SITE_URL.
const siteConfig=JSON.parse(await read('site.config.json'));
const siteUrl=(process.env.SITE_URL??siteConfig.siteUrl??'').trim().replace(/\/+$/,'');
if(siteUrl&&!/^https:\/\/[^/\s]+(\/[^\s]*)?$/.test(siteUrl))throw new Error(`Site URL must be an https:// origin, received: ${siteUrl}`);
const socialImage={path:'/assets/social-preview.jpg',width:1200,height:630};
// English pages stay at the site root; Polish and Swedish pages live under /pl/ and /sv/ with the same paths.
const languages=['en','pl','sv'],languageNames={en:'English',pl:'Polski',sv:'Svenska'},locales={en:'en_US',pl:'pl_PL',sv:'sv_SE'};
const prefix=lang=>lang==='en'?'':`${lang}/`;
const site=Object.fromEntries(await Promise.all(languages.map(async lang=>[lang,JSON.parse(await read(lang==='en'?'content/site.json':`content/${lang}/site.json`))])));
const pages=[['','guide'],['humanize','humanize'],['claude','claude'],['claude-outputs','outputs'],['evidence','evidence']];
// The main menu is a dock: each item shows its name and a short description. <wbr> in a label lets "Claude.md" break before ".md" on the narrowest phones.
const nav=[['/#prompt-studio','guide'],['/humanize/','humanize'],['/claude/','claude'],['/claude-outputs/','outputs'],['/evidence/','evidence']];
const navIcons={
 guide:'<rect x="3" y="4" width="18" height="16" rx="4"/><path d="m7 9 3 3-3 3m6 0h4"/>',
 humanize:'<path d="M20 4c-8-2-15 3-14 11l3 3C17 19 22 12 20 4Z M4 21l11-11M8 17v-5m4 1h5"/>',
 claude:'<path d="M4 7h7m6 0h3M4 17h3m6 0h7"/><circle cx="14" cy="7" r="3"/><circle cx="10" cy="17" r="3"/>',
 outputs:'<path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8 9h8M8 12h5"/>',
 evidence:'<path d="M9 4H6a2 2 0 0 0-2 2v14h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3M8 12l3 3 5-5"/><rect x="9" y="2" width="6" height="4" rx="1"/>'
};
// Content links pages with root-relative paths; in Polish and Swedish pages they point to the same language. Assets are shared.
const localizeLinks=(html,lang)=>lang==='en'?html:html.replace(/(\s(?:href|src)=")\/(?!\/|assets\/)/g,`$1/${lang}/`);
const languageCode=(await read('assets/language.js')).replace(/^export /gm,'');
const claudeWords=Math.round(claudeGuidelines.split(/\s+/).filter(Boolean).length/10)*10;
// Runs before the page is drawn. Arrivals from outside the site get the saved choice or the browser's language;
// links inside the site keep the language being read, which also keeps a manual switch working when storage is unavailable.
function languageRedirect(lang,path,toRoot){
 const targets=Object.fromEntries(languages.map(l=>[l,`${toRoot}${prefix(l)}${path?path+'/':''}`]));
 return `<script>(()=>{\n${languageCode}\nconst page=${JSON.stringify(lang)},targets=${JSON.stringify(targets)},root=new URL(${JSON.stringify(toRoot)},location.href).pathname;\ntry{const from=new URL(document.referrer);if(from.origin===location.origin&&from.pathname.startsWith(root))return;}catch{}\nconst language=getInitialLanguage();\nif(language!==page)location.replace(new URL(targets[language],location.href).href+location.hash);\n})();</script>`;
}
await rm(new URL('dist/',root),{recursive:true,force:true});
for(const lang of languages)for(const [path,key] of pages){
 const text=site[lang],{title,description}=text.pages[key],pagePath=`${prefix(lang)}${path?path+'/':''}`,url=lang=>`${siteUrl}/${prefix(lang)}${path?path+'/':''}`;
 const body=(await read(lang==='en'?`content/${key}.html`:`content/${lang}/${key}.html`)).replace('<!-- CLAUDE_MD_PREVIEW -->',()=>escapeHtml(claudeGuidelines.trimEnd())).replace('<!-- CLAUDE_MD_WORDS -->',claudeWords);
 const toRoot='../'.repeat(pagePath.split('/').filter(Boolean).length)||'./';
 const switcher=`<nav class="lang-switch" aria-label="${text.languageNav}">${languages.map(l=>`<a href="/${prefix(l)}${path?path+'/':''}" hreflang="${l}" lang="${l}" data-language="${l}"${l===lang?' aria-current="true"':''}>${languageNames[l]}</a>`).join('')}</nav>`;
 const dock=localizeLinks(`<nav class="dock" aria-label="${text.mainNav}">${nav.map(([href,k])=>`<a class="dock-item" href="${href}"${key===k?' aria-current="page"':''}><span class="dock-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navIcons[k]}</svg></span><span class="dock-label">${text.nav[k].label}</span><span class="dock-note">${text.nav[k].note}</span></a>`).join('')}</nav>`,lang);
 const footer=localizeLinks(`<footer class="site-footer"><div class="footer-top"><p>${text.footer.tagline}</p><div><a href="/#prompt-studio">${text.footer.guide}</a><a href="/humanize/">${text.footer.humanize}</a><a href="/evidence/">${text.footer.evidence}</a></div></div><div class="footer-bottom"><a href="/" class="brand">${brandMark()}Krakem</a><span>${text.footer.about}</span><span>${text.footer.motto}</span></div></footer>`,lang);
 const html=`<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${languageRedirect(lang,path,toRoot)}<meta name="color-scheme" content="dark"><meta name="theme-color" content="#0b1118"><title>${title} — Krakem</title><meta name="description" content="${description}"><meta property="og:site_name" content="Krakem"><meta property="og:title" content="${title} — Krakem"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:locale" content="${locales[lang]}">${languages.filter(l=>l!==lang).map(l=>`<meta property="og:locale:alternate" content="${locales[l]}">`).join('')}${siteUrl?`<link rel="canonical" href="${url(lang)}">${languages.map(l=>`<link rel="alternate" hreflang="${l}" href="${url(l)}">`).join('')}<link rel="alternate" hreflang="x-default" href="${url('en')}"><meta property="og:url" content="${url(lang)}"><meta property="og:image" content="${siteUrl}${socialImage.path}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="${socialImage.width}"><meta property="og:image:height" content="${socialImage.height}"><meta property="og:image:alt" content="${escapeAttr(text.socialAlt)}"><meta name="twitter:card" content="summary_large_image">`:''}<link rel="icon" href="/assets/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css?v=${assetRevision}"></head>
<body data-page="${key}"><a class="skip-link" href="#main">${text.skipLink}</a><header class="site-header"><div class="nav-wrap"><div class="masthead">${localizeLinks(`<a class="brand" href="/" aria-label="${text.homeLabel}">`,lang)}${brandMark()}Krakem</a>${switcher}</div>${dock}</div></header>
<main id="main" tabindex="-1">${localizeLinks(body,lang)}</main>${footer}<div id="toast" class="toast" role="status" aria-live="polite"></div><script type="module" src="/assets/common.js?v=${assetRevision}"></script><script type="module" src="/assets/screensaver.js?v=${assetRevision}"></script>${key==='guide'?`<script type="module" src="/assets/field.js?v=${assetRevision}"></script><script type="module" src="/assets/guide.js?v=${assetRevision}"></script>`:''}${key==='humanize'?`<script type="module" src="/assets/humanize.js?v=${assetRevision}"></script>`:''}</body></html>`;
 // Content is written with root-relative links; each page gets relative ones, so the site works at a domain root or under a subpath such as /krakem/.
 await mkdir(new URL(`dist/${pagePath}`,root),{recursive:true});
 await writeFile(new URL(`dist/${pagePath}index.html`,root),html.replace(/(\s(?:href|src)=")\/(?!\/)/g,`$1${toRoot}`));
}
await cp(new URL('assets/',root),new URL('dist/assets/',root),{recursive:true,filter:source=>!source.endsWith('.DS_Store')});
// Module imports carry the same revision as the page's script tags, so a deploy never mixes old and new modules.
for(const file of (await readdir(new URL('assets/',root))).filter(name=>name.endsWith('.js'))){
 const code=await read(`assets/${file}`);
 await writeFile(new URL(`dist/assets/${file}`,root),code.replace(/(from\s*')(\.\/[\w-]+\.js)(')/g,`$1$2?v=${assetRevision}$3`));
}
console.log('Built five pages in English, Polish, and Swedish: prompt creator, Humanize, Claude.md, Claude outputs, and evidence.');
if(!siteUrl)console.warn('WARNING: siteUrl is empty in site.config.json, so pages have no canonical URL or social preview image. Set it to the deployment origin and rebuild.');
