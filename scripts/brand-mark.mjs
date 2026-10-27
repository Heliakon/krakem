// The Krakem mark: an asterisk of particles, eight arms of three around a bright core.
// build.mjs inlines it in the header and footer. Run `node scripts/brand-mark.mjs` to regenerate
// assets/icon.svg and the mark in scripts/social-preview.html from the same geometry.
import {readFile,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

const round=n=>Number(n.toFixed(2));
let seed=11;const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647-.5;};
// Each particle carries a scatter offset and a stagger delay for the one-shot animation.
export const markParticles=[{x:20,y:20,r:2.7,dx:0,dy:0,delay:0,core:true}];
for(let arm=0;arm<8;arm++){
 const angle=arm*Math.PI/4-Math.PI/2;
 [[6.6,2.15],[11.6,1.8],[16.4,1.45]].forEach(([distance,r],step)=>markParticles.push({x:round(20+distance*Math.cos(angle)),y:round(20+distance*Math.sin(angle)),r,dx:round(random()*16),dy:round(random()*16),delay:round(arm*.03+step*.05)}));
}
const circles=fill=>markParticles.map(p=>`<circle${p.core?' class="brand-core"':''} cx="${p.x}" cy="${p.y}" r="${p.r}"${fill?` fill="${p.core?'#d7f0b1':'#82c341'}"`:` style="--dx:${p.dx}px;--dy:${p.dy}px;--d:${p.delay}s"`}/>`).join('');

export const brandMark=()=>`<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g class="brand-spin">${circles(false)}</g></svg>`;
export const staticMark=size=>`<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true">${circles(true)}</svg>`;

// At 16 px the full mark blurs, so the favicon keeps the core and the two inner particles of each arm, enlarged.
export function brandIcon(){
 let dots=`<circle cx="32" cy="32" r="5.2" fill="#d7f0b1"/>`;
 for(let arm=0;arm<8;arm++){const angle=arm*Math.PI/4-Math.PI/2;[[12.5,3.8],[21.5,3.1]].forEach(([distance,r])=>{dots+=`<circle cx="${round(32+distance*Math.cos(angle))}" cy="${round(32+distance*Math.sin(angle))}" r="${r}" fill="#82c341"/>`;});}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0b1118"/>${dots}</svg>\n`;
}

if(import.meta.url===pathToFileURL(process.argv[1]).href){
 const root=new URL('../',import.meta.url);
 await writeFile(new URL('assets/icon.svg',root),brandIcon());
 const previewPath=new URL('scripts/social-preview.html',root),preview=await readFile(previewPath,'utf8');
 const marked=preview.replace(/(<!-- brand-mark -->)[\s\S]*?(<!-- \/brand-mark -->)/,`$1${staticMark(48)}$2`);
 if(marked===preview&&!preview.includes(staticMark(48)))throw new Error('scripts/social-preview.html has no <!-- brand-mark --> markers.');
 await writeFile(previewPath,marked);
 console.log('Wrote assets/icon.svg and the mark in scripts/social-preview.html.');
}
