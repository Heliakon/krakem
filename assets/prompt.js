import {en} from './text-en.js';
import {pl} from './text-pl.js';
import {sv} from './text-sv.js';
// Prompts are written in the page's language; unknown languages fall back to English.
const promptText={en:en.prompt,pl:pl.prompt,sv:sv.prompt};
const textFor=lang=>promptText[lang]??promptText.en;
export const defaultFormats={custom:'text',compare:'table',website:'text',review:'text',debug:'steps',code:'code',architecture:'diagram',research:'text',paper:'text',summary:'text',procedure:'steps',writing:'text',motion:'animation'};

function subjectKey(value){
 const text=value.trim();
 try{
  const url=new URL(/^https?:\/\//i.test(text)?text:`https://${text}`);
  if(url.hostname.includes('.')&&!/\s/.test(text))return `${url.host.toLowerCase().replace(/^www\./,'')}${url.pathname.replace(/\/$/,'')}${url.search}${url.hash}`;
 }catch{}
 return text.toLocaleLowerCase().replace(/\s+/g,' ');
}

export function validatePrompt({brief='',task='custom',subjectA='',subjectB='',criteria='',lang='en'}={}){
 const issues=[],message=textFor(lang).issues;
 if(!brief.trim())issues.push({field:'task-brief',message:task==='compare'?message.briefCompare:message.brief});
 if(task==='compare'){
  if(!subjectA.trim())issues.push({field:'compare-a',message:message.subjectA});
  if(!subjectB.trim())issues.push({field:'compare-b',message:message.subjectB});
  if(subjectA.trim()&&subjectB.trim()&&subjectKey(subjectA)===subjectKey(subjectB))issues.push({field:'compare-b',message:message.sameSubjects});
  if(!criteria.trim())issues.push({field:'compare-criteria',message:message.criteria});
 }
 return issues;
}

export function buildTechnicalPrompt({brief='',task='custom',format='text',source='',subjectA='',subjectB='',criteria='',ownership='',lang='en'}={}){
 if(validatePrompt({brief,task,subjectA,subjectB,criteria}).length)return '';
 const text=textFor(lang);
 const sections=[`${text.myTask}\n${brief.trim()}`,text.task[task]??text.task.custom];
 // Models act on stated code ownership: they restructure code called their own and only add to code that is not.
 if(task==='code'&&Object.hasOwn(text.ownership,ownership))sections.push(text.ownership[ownership]);
 if(task==='compare')sections.push(text.comparison(subjectA.trim(),subjectB.trim(),criteria.trim()));
 sections.push(text.readable);
 if(task==='procedure'||format==='steps')sections.push(text.procedure);
 const hasUrl=[brief,source].some(value=>/https?:\/\/\S+/i.test(value));
 if(['compare','website','research','paper'].includes(task)||hasUrl)sections.push(text.sources);
 sections.push(text.missing);
 sections.push(`${text.answerFormat}\n${task==='compare'&&format==='table'?text.compareTable:task==='motion'&&format==='animation'?text.motionAnimation:text.answer[format]??text.answer.text}`);
 // Motion design and the visual formats get explicit encouragement; without it, models tend toward safe, generic designs.
 if(task==='motion'||['interactive','animation'].includes(format))sections.push(text.design);
 if(source.trim())sections.push(`${text.sourceMaterial}\n${source}`);
 return sections.join('\n\n');
}
