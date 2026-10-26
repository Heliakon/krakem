// Builds both prompt arms from the shared fixtures: an ordinary brief (task + source, as a visitor might type it)
// and the creator output for the same task. Run from the site root: node evaluation/2026-10-25-brief-vs-creator/make-prompts.mjs
import {readFile,writeFile} from 'node:fs/promises';
import {buildTechnicalPrompt} from '../../assets/prompt.js';
const here=new URL('./',import.meta.url);
const fixtures=JSON.parse(await readFile(new URL('../fixtures.json',here),'utf8'));
const prompts=fixtures.map(f=>({
 id:f.id,
 ordinary:`${f.brief}\n\n${f.source}`,
 creator:buildTechnicalPrompt({brief:f.brief,task:f.task,format:f.format,source:f.source,subjectA:f.subjectA,subjectB:f.subjectB,criteria:f.criteria})
}));
for(const p of prompts)if(!p.creator)throw new Error(`Creator returned no prompt for ${p.id}`);
await writeFile(new URL('prompts.json',here),JSON.stringify(prompts,null,1)+'\n');
console.log(prompts.map(p=>`${p.id}: ordinary ${p.ordinary.split(/\s+/).length} words, creator ${p.creator.split(/\s+/).length} words`).join('\n'));
