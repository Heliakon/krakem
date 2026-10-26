import {buildEditingBrief,validateEditingBrief} from './humanize-brief.js';
import {draftStore,restoreValue} from './drafts.js';
const examples={
 web:{before:'Our comprehensive dashboard empowers teams to seamlessly monitor failed jobs and effortlessly retry them from a single, unified location.',after:'<h3>See which jobs failed. Retry them here.</h3><p>The dashboard keeps failed jobs and retry controls in one place.</p>',reason:'Website copy: name the task, explain the useful action, and remove unsupported praise.',lang:'en'},
 slides:{before:'The migration delivered an impressive 18% reduction in median build time, from 10 minutes to 8.2 minutes, across 20 builds on the same runner, highlighting a significant step forward in developer productivity.',after:'<h3>Median build time fell by 18%.</h3><p>10 minutes → 8.2 minutes</p><p><strong>Speaker notes:</strong> The comparison covered 20 builds on the same runner. It does not measure overall developer productivity.</p>',reason:'Slides: move the measured result into the title. Keep the sample, conditions, and scope in speaker notes. All figures here are fictional example data.',lang:'en'},
 polish:{before:'Nasz zaawansowany panel umożliwia zespołom bezproblemowe monitorowanie nieudanych zadań oraz ich płynne ponawianie z jednego, scentralizowanego miejsca.',after:'<h3>Sprawdź, które zadania się nie powiodły. Ponów je w panelu.</h3><p>Lista nieudanych zadań i przyciski ponawiania są w jednym miejscu.</p>',reason:'Polski: nazwij konkretną czynność. Usuń ogólniki i kalki, zachowując znaczenie. Przykład redakcji: zachowane znaczenie, mniej ogólników.',lang:'pl'}
};
document.querySelectorAll('[data-voice]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-voice]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));const ex=examples[b.dataset.voice];for(const id of['voice-before','voice-after','voice-reason'])document.getElementById(id).lang=ex.lang;document.getElementById('voice-before').textContent=ex.before;document.getElementById('voice-after').innerHTML=ex.after;document.getElementById('voice-reason').textContent=ex.reason;}));
const language=document.getElementById('writing-language'),surface=document.getElementById('writing-surface'),audience=document.getElementById('writing-audience'),original=document.getElementById('writing-original'),sample=document.getElementById('writing-sample');
const output=document.getElementById('writing-prompt'),copy=document.getElementById('copy-writing-prompt'),status=document.getElementById('writing-state'),checklist=document.getElementById('writing-checklist'),issueList=document.getElementById('writing-issues');
const clearDraft=document.getElementById('clear-humanize-draft'),draftNote=document.getElementById('humanize-draft-note');
const draft=draftStore('krakem-humanize-draft'),draftFields={language,surface,audience,original,sample};
const defaults={language:'en',surface:'website',audience:'',original:'',sample:''};
function build(){
 const values={lang:language.value,surface:surface.value,audience:audience.value,original:original.value,sample:sample.value};
 const issues=validateEditingBrief(values),prompt=buildEditingBrief(values),started=[audience,original,sample].some(field=>field.value.trim());
 copy.disabled=!prompt;
 output.textContent=prompt||'Your complete brief will appear here when you add your readers and the original text.';
 output.lang=prompt?values.lang:'en';
 output.classList.toggle('empty-prompt',!prompt);
 checklist.hidden=!started||!issues.length;
 issueList.replaceChildren(...issues.map(issue=>{const item=document.createElement('li'),link=document.createElement('a');link.href='#'+issue.field;link.textContent=issue.message;link.addEventListener('click',event=>{event.preventDefault();document.getElementById(issue.field).focus();});item.append(link);return item;}));
 const message=prompt?(sample.value.trim()?'Ready to paste. Your readers, voice sample, and original text are included.':'Ready to paste. Your readers and original text are included.'):started?`${issues.length} ${issues.length===1?'detail':'details'} to complete before copying.`:'Add your readers and the original text to create a complete brief.';
 if(status.textContent!==message)status.textContent=message;
 status.classList.toggle('ready',Boolean(prompt));
}
function edited(){return Object.entries(draftFields).some(([key,field])=>field.value!==defaults[key]);}
const keptNote='Built in your browser and never sent anywhere. Your draft stays in this tab until you clear it or close the tab.';
let saveFailed=false;
function saveDraft(){
 const dirty=edited(),saved=!dirty||draft.save(Object.fromEntries(Object.entries(draftFields).map(([key,field])=>[key,field.value])));
 // A failed save would leave the previous draft behind; remove it so a reload cannot restore stale text.
 if(!dirty||!saved)draft.clear();
 if(draft.available&&saved===saveFailed){
  saveFailed=!saved;draftNote.textContent=saveFailed?'This draft could not be saved. Copy your brief before you leave the page.':keptNote;
  if(saveFailed)window.dispatchEvent(new CustomEvent('krakem-toast',{detail:'Draft could not be saved.'}));
 }
 clearDraft.disabled=!dirty;
}
function update(){build();saveDraft();}
Object.values(draftFields).forEach(field=>field.addEventListener('input',update));
clearDraft.addEventListener('click',()=>{
 for(const [key,field] of Object.entries(draftFields))field.value=defaults[key];
 build();saveDraft();audience.focus();
 window.dispatchEvent(new CustomEvent('krakem-toast',{detail:'Draft cleared.'}));
});
const saved=draft.load();
if(saved)for(const [key,field] of Object.entries(draftFields))restoreValue(field,saved[key]);
draftNote.textContent=draft.available?keptNote:'Built in your browser and never sent anywhere. This browser is not keeping drafts, so copy your brief before you leave the page.';
build();clearDraft.disabled=!edited();
