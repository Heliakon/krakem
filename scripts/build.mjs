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
const socialImage={path:'/assets/social-preview.jpg',width:1200,height:630,alt:'Krakem: Better prompts. Clearer answers. A dark card with the particle asterisk mark, a green particle spiral, and a particle floor.'};
const pages=[
 ['','Prompt creator','Describe your task and copy a complete prompt that asks the AI for consistent terms, evidence kept apart from inference, and questions instead of guesses.','guide'],
 ['humanize','Write like yourself','Create an editing brief for clear, natural English, Polish, or Portuguese writing while preserving the facts.','humanize'],
 ['claude','CLAUDE.md for Claude Code','Download a concise CLAUDE.md with coding rules for Claude Code: scoped changes, tests, and honest reporting.','claude'],
 ['claude-outputs','Claude outputs','Change how Claude Code answers for a whole session: built-in output styles, your own style file, and when CLAUDE.md fits better.','outputs'],
 ['evidence','The evidence ledger','What holds up, what needs context, and what we could not verify.','evidence']
];
// The main menu is a dock: each item shows its name and a short description. <wbr> lets "Claude.md" break before ".md" on the narrowest phones.
const nav=[['/#prompt-studio','Prompt creator','Build a prompt','guide'],['/humanize/','Humanize','Edit in your voice','humanize'],['/claude/','Claude<wbr>.md','Coding rules','claude'],['/claude-outputs/','Claude outputs','Reply styles','outputs'],['/evidence/','Evidence','What holds up','evidence']];
const navIcons={
 guide:'<rect x="3" y="4" width="18" height="16" rx="4"/><path d="m7 9 3 3-3 3m6 0h4"/>',
 humanize:'<path d="M20 4c-8-2-15 3-14 11l3 3C17 19 22 12 20 4Z M4 21l11-11M8 17v-5m4 1h5"/>',
 claude:'<path d="M4 7h7m6 0h3M4 17h3m6 0h7"/><circle cx="14" cy="7" r="3"/><circle cx="10" cy="17" r="3"/>',
 outputs:'<path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8 9h8M8 12h5"/>',
 evidence:'<path d="M9 4H6a2 2 0 0 0-2 2v14h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3M8 12l3 3 5-5"/><rect x="9" y="2" width="6" height="4" rx="1"/>'
};
await rm(new URL('dist/',root),{recursive:true,force:true});
for(const [path,title,description,key] of pages){
 const body=(await read(`content/${key}.html`)).replace('<!-- CLAUDE_MD_PREVIEW -->',()=>escapeHtml(claudeGuidelines.trimEnd()));
 const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#0b1118"><title>${title} — Krakem</title><meta name="description" content="${description}"><meta property="og:site_name" content="Krakem"><meta property="og:title" content="${title} — Krakem"><meta property="og:description" content="${description}"><meta property="og:type" content="website">${siteUrl?`<link rel="canonical" href="${siteUrl}/${path?path+'/':''}"><meta property="og:url" content="${siteUrl}/${path?path+'/':''}"><meta property="og:image" content="${siteUrl}${socialImage.path}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="${socialImage.width}"><meta property="og:image:height" content="${socialImage.height}"><meta property="og:image:alt" content="${escapeAttr(socialImage.alt)}"><meta name="twitter:card" content="summary_large_image">`:''}<link rel="icon" href="/assets/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css?v=${assetRevision}"></head>
<body data-page="${key}"><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="nav-wrap"><a class="brand" href="/" aria-label="Krakem home">${brandMark()}Krakem</a><nav class="dock" aria-label="Main navigation">${nav.map(([url,label,note,k])=>`<a class="dock-item" href="${url}"${key===k?' aria-current="page"':''}><span class="dock-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navIcons[k]}</svg></span><span class="dock-label">${label}</span><span class="dock-note">${note}</span></a>`).join('')}</nav></div></header>
<main id="main" tabindex="-1">${body}</main><footer class="site-footer"><div class="footer-top"><p>Make the answer<br><em>worth understanding.</em></p><div><a href="/#prompt-studio">Build a better prompt ↗</a><a href="/humanize/">Find your writing approach ↗</a><a href="/evidence/">Check the evidence ↗</a></div></div><div class="footer-bottom"><a href="/" class="brand">${brandMark()}Krakem</a><span>An independent field guide · October 2026</span><span>Clarity is a design decision.</span></div></footer><div id="toast" class="toast" role="status" aria-live="polite"></div><script type="module" src="/assets/common.js?v=${assetRevision}"></script><script type="module" src="/assets/screensaver.js?v=${assetRevision}"></script>${key==='guide'?`<script type="module" src="/assets/field.js?v=${assetRevision}"></script><script type="module" src="/assets/guide.js?v=${assetRevision}"></script>`:''}${key==='humanize'?`<script type="module" src="/assets/humanize.js?v=${assetRevision}"></script>`:''}</body></html>`;
 // Content is written with root-relative links; each page gets relative ones, so the site works at a domain root or under a subpath such as /krakem/.
 const toRoot='../'.repeat(path.split('/').filter(Boolean).length)||'./';
 await mkdir(new URL(`dist/${path}/`,root),{recursive:true});
 await writeFile(new URL(`dist/${path?path+'/':''}index.html`,root),html.replace(/(\s(?:href|src)=")\/(?!\/)/g,`$1${toRoot}`));
}
await cp(new URL('assets/',root),new URL('dist/assets/',root),{recursive:true,filter:source=>!source.endsWith('.DS_Store')});
// Module imports carry the same revision as the page's script tags, so a deploy never mixes old and new modules.
for(const file of (await readdir(new URL('assets/',root))).filter(name=>name.endsWith('.js'))){
 const code=await read(`assets/${file}`);
 await writeFile(new URL(`dist/assets/${file}`,root),code.replace(/(from\s*')(\.\/[\w-]+\.js)(')/g,`$1$2?v=${assetRevision}$3`));
}
console.log('Built five pages: prompt creator, Humanize, Claude.md, Claude outputs, and evidence.');
if(!siteUrl)console.warn('WARNING: siteUrl is empty in site.config.json, so pages have no canonical URL or social preview image. Set it to the deployment origin and rebuild.');
