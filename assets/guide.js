import {buildTechnicalPrompt,validatePrompt,defaultFormats} from './prompt.js';
import {draftStore,restoreValue} from './drafts.js';
import {language,text} from './i18n.js';
const t=text.creator,examples=t.examples;
document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-example]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));const ex=examples[button.dataset.example];document.getElementById('example-before').textContent=ex.before;document.getElementById('example-after').innerHTML=ex.after;document.querySelector('.after .annotation').textContent=ex.note;}));
const task=document.getElementById('task'),format=document.getElementById('format'),brief=document.getElementById('task-brief'),source=document.getElementById('source-material'),output=document.getElementById('technical-prompt'),copy=document.getElementById('copy-technical-prompt'),status=document.getElementById('prompt-state');
const subjectA=document.getElementById('compare-a'),subjectB=document.getElementById('compare-b'),criteria=document.getElementById('compare-criteria'),comparison=document.getElementById('comparison-fields'),suggestion=document.getElementById('task-suggestion'),checklist=document.getElementById('prompt-checklist'),issueList=document.getElementById('prompt-issues');
const checkedFields=[brief,subjectA,subjectB,criteria],clearDraft=document.getElementById('clear-creator-draft'),draftNote=document.getElementById('creator-draft-note');
const draft=draftStore('krakem-creator-draft'),draftFields={task,format,brief,source,subjectA,subjectB,criteria};
const defaults={task:'custom',format:'text',brief:'',source:'',subjectA:'',subjectB:'',criteria:criteria.defaultValue??''};
let formatChosen=false;
function buildPrompt(){
 const comparing=task.value==='compare';
 comparison.hidden=!comparing;
 [subjectA,subjectB,criteria].forEach(field=>field.required=comparing);
 document.getElementById('task-help').textContent=comparing?t.helpCompare:t.help;
 suggestion.hidden=!(['custom','research','paper'].includes(task.value)&&/\b(compar(?:e|ing|ison)|versus|vs\.?|porówn\w*|jämför\w*|comparar)\b/i.test(brief.value));
 const values={brief:brief.value,task:task.value,format:format.value,source:source.value,subjectA:subjectA.value,subjectB:subjectB.value,criteria:criteria.value,lang:language};
 const issues=validatePrompt(values),prompt=buildTechnicalPrompt(values);
 copy.disabled=!prompt;
 output.textContent=prompt||(comparing?t.emptyCompare:t.empty);
 output.classList.toggle('empty-prompt',!prompt);
 checklist.hidden=!comparing||!issues.length;
 issueList.replaceChildren(...issues.map(issue=>{const item=document.createElement('li'),link=document.createElement('a');link.href='#'+issue.field;link.textContent=issue.message;link.addEventListener('click',event=>{event.preventDefault();document.getElementById(issue.field).focus();});item.append(link);return item;}));
 checkedFields.forEach(field=>field.setAttribute('aria-invalid',String(Boolean(field.value.trim())&&issues.some(issue=>issue.field===field.id))));
 const message=!prompt?(comparing?t.detailsLeft(issues.length):t.describeTask):comparing?t.readyCompare:source.value.trim()?t.readySource:task.value==='summary'?t.readySummary:t.ready;
 if(status.textContent!==message)status.textContent=message;
 status.classList.toggle('ready',Boolean(prompt));
}
// Only a draft that differs from the starting form is stored; the output is rebuilt from the restored fields.
function edited(){return formatChosen||Object.entries(draftFields).some(([key,field])=>field.value!==defaults[key]);}
const keptNote=text.drafts.kept;
let saveFailed=false;
function saveDraft(){
 const dirty=edited(),saved=!dirty||draft.save({...Object.fromEntries(Object.entries(draftFields).map(([key,field])=>[key,field.value])),formatChosen});
 // A failed save would leave the previous draft behind; remove it so a reload cannot restore stale text.
 if(!dirty||!saved)draft.clear();
 if(draft.available&&saved===saveFailed){
  saveFailed=!saved;draftNote.textContent=saveFailed?t.draftFailed:keptNote;
  if(saveFailed)window.dispatchEvent(new CustomEvent('krakem-toast',{detail:text.drafts.failedToast}));
 }
 clearDraft.disabled=!dirty;
}
function update(){buildPrompt();saveDraft();}
function changeTask(){if(!formatChosen)format.value=defaultFormats[task.value]??'text';update();}
task.addEventListener('change',changeTask);
format.addEventListener('change',()=>{formatChosen=true;update();});
[brief,source,subjectA,subjectB,criteria].forEach(el=>el.addEventListener('input',update));
document.getElementById('use-comparison').addEventListener('click',()=>{task.value='compare';changeTask();subjectA.focus();});
clearDraft.addEventListener('click',()=>{
 for(const [key,field] of Object.entries(draftFields))field.value=defaults[key];
 formatChosen=false;buildPrompt();saveDraft();brief.focus();
 window.dispatchEvent(new CustomEvent('krakem-toast',{detail:text.drafts.cleared}));
});
const saved=draft.load();
if(saved){for(const [key,field] of Object.entries(draftFields))restoreValue(field,saved[key]);formatChosen=saved.formatChosen===true;}
draftNote.textContent=draft.available?keptNote:t.draftUnavailable;
buildPrompt();clearDraft.disabled=!edited();
