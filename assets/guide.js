import {buildTechnicalPrompt,validatePrompt,defaultFormats} from './prompt.js';
import {draftStore,restoreValue} from './drafts.js';
const examples={
 deploy:{before:'After saving the configuration, you might want to restart the service and check that the worker’s health endpoint returns HTTP 200, restoring the previous configuration if the process fails this check.',after:'<ol><li>Save the configuration.</li><li>Restart the worker.</li><li>Check the worker’s health endpoint.</li></ol><p>Expected result: HTTP 200. If the check fails, restore the previous configuration.</p>',note:'One name. Visible steps. A defined result.'},
 review:{before:'The retry engine can potentially submit the same payment twice after a timeout, so it would be beneficial to verify whether the payment API accepts an idempotency key and, if so, have the retry processor reuse it for all attempts at that payment.',after:'<p>The retry worker can submit the same payment twice after a timeout. Verify whether the payment API accepts an idempotency key.</p><p>If it does, reuse the same key for every attempt at that payment.</p>',note:'Illustrative diagnosis. A specific question. A conditional fix.'},
 research:{before:'Please provide a comprehensive overview of the paper’s performance metric, its baseline, dataset and uncertainty, while illuminating which conditions were tested and clarifying that performance outside them has not been verified.',after:'<p>Report the paper’s metric, baseline, dataset, and uncertainty.</p><p>State which conditions were tested. Treat performance outside those conditions as unverified.</p>',note:'A reading brief that asks for evidence instead of praise.'}
};
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
 document.getElementById('task-help').textContent=comparing?'Describe the decision this comparison should support, your audience, and any constraints.':'Describe your task, the result you need, and any important constraints.';
 suggestion.hidden=!(['custom','research','paper'].includes(task.value)&&/\b(compar(?:e|ing|ison)|versus|vs\.?|porówn\w*|comparar)\b/i.test(brief.value));
 const values={brief:brief.value,task:task.value,format:format.value,source:source.value,subjectA:subjectA.value,subjectB:subjectB.value,criteria:criteria.value};
 const issues=validatePrompt(values),prompt=buildTechnicalPrompt(values);
 copy.disabled=!prompt;
 output.textContent=prompt||(comparing?'Add your comparison details. Your complete prompt will include both subjects, your goal, and the same criteria for each.':'Your prompt will appear here as you type. Add your task and choose the answer you want.');
 output.classList.toggle('empty-prompt',!prompt);
 checklist.hidden=!comparing||!issues.length;
 issueList.replaceChildren(...issues.map(issue=>{const item=document.createElement('li'),link=document.createElement('a');link.href='#'+issue.field;link.textContent=issue.message;link.addEventListener('click',event=>{event.preventDefault();document.getElementById(issue.field).focus();});item.append(link);return item;}));
 checkedFields.forEach(field=>field.setAttribute('aria-invalid',String(Boolean(field.value.trim())&&issues.some(issue=>issue.field===field.id))));
 const message=!prompt?(comparing?`${issues.length} ${issues.length===1?'detail':'details'} to complete before copying.`:'Describe your task to create a complete prompt.'):comparing?'Ready to paste. Both subjects, your goal, and criteria are included.':source.value.trim()?'Ready to paste. Your task and source material are included.':'Ready to paste. Your task and answer format are included.';
 if(status.textContent!==message)status.textContent=message;
 status.classList.toggle('ready',Boolean(prompt));
}
// Only a draft that differs from the starting form is stored; the output is rebuilt from the restored fields.
function edited(){return formatChosen||Object.entries(draftFields).some(([key,field])=>field.value!==defaults[key]);}
function saveDraft(){
 const dirty=edited();
 if(dirty)draft.save({...Object.fromEntries(Object.entries(draftFields).map(([key,field])=>[key,field.value])),formatChosen});else draft.clear();
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
 formatChosen=false;draft.clear();buildPrompt();clearDraft.disabled=true;brief.focus();
 window.dispatchEvent(new CustomEvent('krakem-toast',{detail:'Draft cleared.'}));
});
const saved=draft.load();
if(saved){for(const [key,field] of Object.entries(draftFields))restoreValue(field,saved[key]);formatChosen=saved.formatChosen===true;}
draftNote.textContent=draft.available?'Built in your browser and never sent anywhere. Your draft stays in this tab until you clear it or close the tab.':'Built in your browser and never sent anywhere. This browser is not keeping drafts, so copy your prompt before you leave the page.';
buildPrompt();clearDraft.disabled=!edited();
